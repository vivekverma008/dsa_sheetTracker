const topics = require('../data/topics');
const Problems = require('../models/problems');
const luvBabbar = require('../data/luvBabbar');


module.exports.show = function(req,res){
    // >> only first time to get data in database :)
    // Problems.create(luvBabbar,function(err){
    //     if(err){
    //         console.log('error creating sheet');
    //     }
    // })
    console.log(req.query);
    Problems.find(req.query,function(err,all_problems){
        if(err){
            return console.error('error in fetching_all problems from db');
        }
        res.render('problems',{
            topics : topics ,
            all_problems : all_problems
        });
    

    })

}