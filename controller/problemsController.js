
const topics = require('../data/topics');
const Problems = require('../models/problems');
// Problems.create({
//     url : "https://www.geeksforgeeks.org/write-a-program-to-reverse-an-array-or-string/",
//     name : "reverse-the-Array",
//     topics: "array",
//     difficulty : "easy",
//     sheet : 'luvBabbar'
// });


module.exports.show = function(req,res){
    // console.log(topics);
    res.render('problems',{
        topics : topics ,
        
    });
}