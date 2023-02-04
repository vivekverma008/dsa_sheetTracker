const Note = require('../models/notes');
const User = require('../models/user');
const Problem = require('../models/problems');



module.exports.getNote = async function(req,res){
    let pid = req.params.id;

    console.log(pid);
    try{
        let note = await Note.findOne({user : req.user.id , problem : pid});
        let problem = await Problem.findOne({_id : pid});

        if(req.xhr){
            return res.status(200).json({
                data:{
                    problem : problem,
                    note : note
                },
                message : "note there"

            });
        }else{
            console.log('error working with xhr');
            res.redirect('back');
        }

    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
    


    // Note.findOne({user : req.user.id , problem : pid},function(err,note){
    //     if(err){console.log('error');return res.redirect('back');}
    //     res.cookie('note',note,{maxAge : 1000*60*60*24});
    //     // console.log(note);
    //     return res.redirect('back');
    // });
};
module.exports.updateNote = async function(req,res){
    console.log('in update');
    let pid = req.body.pid;
    console.log(pid);
    
    try{
        let problem = await Problem.findById(pid);
        if(req.xhr){
            if(!problem){
                return res.status(200).json({
                    message : "donot fiddle with the question id"
                });
            }
            let success = await Note.updateOne(
                {user : req.user.id ,problem : pid} ,
                {content : req.body.content},
                {upsert : true}
            );
            console.log(success);
            return res.status(200).json({
                message : 'updataed congratulations'
            });

        }
    }catch(err){
        console.log(err);
        return res.redirect('back');
    }

    
};