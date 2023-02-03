const Note = require('../models/notes');
const User = require('../models/user');
const Problem = require('../models/problems');
const { model } = require('mongoose');


module.exports.getNote = function(req,res){
    let pid = req.params.id;

    console.log(pid);
    Note.findOne({user : req.user.id , problem : pid},function(err,note){
        if(err){console.log('error');return res.redirect('back');}
        res.cookie('note',note,{maxAge : 1000*60*60*24});
        // console.log(note);
        return res.redirect('back');
    });
};
module.exports.updateNote = function(req,res){
    console.log('in update');
    let pid = req.body.pid;
    console.log(pid);
    Problem.findById(pid , function(err,problem){
        if(err){console.log(err); res.redirect('back');}
        else{
            if(!problem) return res.redirect('back');
            Note.updateOne(
                {user : req.user.id , problem : pid},
                {content : req.body.content},
                {upsert : true},
                function (err, success){
                    if(err){console.log(err); return res.redirect('back');}
                    else{
                        console.log('updated  notes',success);
                        return res.redirect('back');
                     }
        
                }
            )
           
        }
    });
    
};