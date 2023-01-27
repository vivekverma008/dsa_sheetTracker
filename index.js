//server file
const express = require('express');
const app =express();
const port = 8000;
const db = require('./config/mongoose');

app.set('view engine', 'ejs');
app.set('views' , './views');
app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){
        console.log('error listengin at port',port);
        return ;
    }
    console.log('server is up and running at port' , port);
})