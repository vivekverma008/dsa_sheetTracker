//passport config for local-strategy
const passport = require('passport');
const { runInNewContext } = require('vm');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy(
    {
        usernameField : 'email'
    },
    function(email,password,done){
        User.findOne({email : email},function(err,user){
            if(err){
                console.log('error in finding user');
                return done(err);
            }
           
            if(!user || (password != user.password)){
                 console.log('Invalid Credentials');
                 return done(null,false);
            }
            return done(null,user);

        });
    }
));

passport.serializeUser(function(user,done){
    done(null,user.id);
});
passport.deserializeUser(function(id,done){
    User.findById(id,(err,user)=>{
        if(err){
            console.log('err finding user');
            return done(err);
        }
        return done(null,user);

    })
});
passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        next();
    }
    else{
       console.log('no access');
       return res.redirect('/user/signin');
    }
}
passport.setUserAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports= passport;

