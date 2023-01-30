const User = require('../models/user');

module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('back');
    }
    else{
        return res.render('sign-in');
    }
}
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('back');
    }
    return res.render('sign-up');
}
module.exports.user = function(req,res){
    res.render('user');
}
module.exports.createUser = (req,res)=>{
    let email = req.body.email;
    User.findOne({email : email},function(err,user){
        if(err){
            console.log('error creating user');
            return res.redirect('back');
        }
        if(user){
            console.log('user already exists');
            return res.redirect('back');
        }
        User.create(req.body,function(err){
            if(err){
                return console.log('error creating user');
            }
            return res.redirect('/user/signin');
        });
    });
}
module.exports.createSession = (req,res)=>{
    res.redirect('/user');
}
module.exports.destroySession = (req,res)=>{
    if(!req.isAuthenticated())return res.redirect('signin');
    req.logout(function(err){
        if(err){
            res.redirect('back');
           return console.log('error logging out');
        }
        res.clearCookie('user_key');
        return res.redirect('/user');
        
    });
}