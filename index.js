//server file
const express = require('express');
const app =express();
const port = 8000;
const db = require('./config/mongoose');
const layout = require('express-ejs-layouts');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');

app.use(express.urlencoded({extended : false}));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views' , './views');
app.use(layout);
app.set('layout','layouts');
app.use(session({
    name : 'user_key',
    secret : 'anything',
    saveUninitialized : false,
    resave : false,
    store : MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1/dsaTracker',
        autoRemove : 'interval',
        autoRemoveInterval : 20
    }),
    cookie : {
        maxAge  : (1000 * 60 * 100)
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setUserAuthentication);


app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){
        console.log('error listengin at port',port);
        return ;
    }
    console.log('server is up and running at port' , port);
})