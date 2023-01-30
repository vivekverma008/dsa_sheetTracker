const topics = require('../data/topics');
const Problems = require('../models/problems');
const luvBabbar = require('../data/luvBabbar');
const User = require('../models/user');

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
                return res.render('problems',{
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
module.exports.update_problem = function(req,res){
    // console.log(req.body);
    
    Problems.findById(req.body.id,{returnDocuments : 'after'},function(err,problem){
        if(err){
            console.log(err);
            console.log('error checking question');
            return res.redirect('back');
        }else{
            if(req.body.done == 'on'){
                User.findByIdAndUpdate(
                    req.user.id,
                    {$push : {problems : problem}},
                    function(err,success){
                        if(err){
                            console.log('error updatingPush in user -->problems');
                            return res.redirect('back');
                        }else{
                            console.log('updated PUsh in user');
                            console.log(success);
                            return res.redirect('back');
                        }
    
                    }
                )
            }else{
                User.findByIdAndUpdate(
                    req.user.id,
                    {$pull : {problems : problem.id}},
                    function(err,success){
                        if(err){
                            console.log('error updatingPull in user -->problems');
                            return res.redirect('back');
                        }else{
                            console.log('update pull in user');
                            console.log(success);

                            return res.redirect('back');
                        }
    
                    }
                )
            }
            
        }
        
    })
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
