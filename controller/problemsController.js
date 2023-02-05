const topics = require('../data/topics');
const Problems = require('../models/problems');
const luvBabbar = require('../data/luvBabbar');
const User = require('../models/user');
var topicName = "";
module.exports.show = function(req,res){
    // >> only first time to get data in database :)
    // Problems.create(luvBabbar,function(err){
    //     if(err){
    //         console.log('error creating sheet');
    //     }
    // })
    // console.log(req.query);
    Problems.find(req.query,function(err,all_problems){
        if(err){
            return console.error('error in fetching_all problems from db');
        }
        if(req.isAuthenticated()){
            User.findById(req.user.id).
            populate('problems').
            populate('bookMarks').
            exec(function(err,user){
                if(err){
                    console.log('error populating');
                    return res.redirect('back');
                }
                topicName = req.query.topic;
                if(!req.query.topic)topicName = "All Questions"
                
                return res.render('problems',{
                    topicName : topicName ,
                    topics : topics ,
                    all_problems : all_problems,
                    user : user
                });
            });
           
        }
        else{
            return res.render('problems',{
                topics : topics ,
                all_problems : all_problems
            });
        }
        
    

    })

}
module.exports.update_problem = async function(req,res){
    console.log('in updata problem');
    console.log(req.query);

    try{    
        let problem = await  Problems.findById(req.body.id);
        let toadd = 0;
        if(req.body.done == 'on'){
            let ack = await User.findByIdAndUpdate(
                                req.user.id,
                                {$push : {problems : problem}});
            // console.log(ack);
            toadd += 1;

        }else{
           
                let ack = await User.findByIdAndUpdate(
                                    req.user.id,
                                    {$pull : {problems : problem.id}});
            
                // console.log(ack);
                toadd -= 1;
        }
        if(req.xhr){
            console.log(topicName);
            return res.status(200).json({
                data :{
                   user : req.user,
                   add : toadd ,
                //    all_problems : res.locals.all_problems.length
                },
                message : 'updated problems'
            });
        }
       
       

    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

    
//problems/bookmark/?id=absc&type=Bookmark&toggle=1;
module.exports.toggleBookmark = function(req,res){
    let pid = req.query.id;
    Problems.findById(pid,(err,problem)=>{
        if(err){
            console.log('error toggling bookmark');
            return res.redirect('back');
        }
        if(req.isAuthenticated()){
            if(req.query.toggle == '1'){
                User.findByIdAndUpdate(req.user.id,
                    {$push : {bookMarks : problem.id}},
                    function(err,user){
                        if(err){
                            console.log('error toggling bookmark');
                            return res.redirect('back');
                        }
                        else{
                            console.log('updated toggled book mark')
                            res.redirect('back');
                        }
                    }
                    
                );
            }else{
                User.findByIdAndUpdate(req.user.id,
                    {$pull : {bookMarks : problem.id}},
                    function(err,user){
                        if(err){
                            console.log('error toggling bookmark');
                            return res.redirect('back');
                        }
                        else{
                            console.log('updated toggled book mark')
                            res.redirect('back');
                        }
                        
                    }
                    
                );
            }
           
                
        }
    });
}
