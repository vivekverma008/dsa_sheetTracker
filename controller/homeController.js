
const topics = require('../data/topics');

module.exports.home = function(req,res){
    // console.log(topics);
    res.render('index',{topics});
}