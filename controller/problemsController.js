
const topics = require('../data/topics');
const Problems = require('../models/problems');
const luvBabbar = require('../data/luvBabbar');
console.log('typeof(luvBabbar)');


module.exports.show = function(req,res){

    res.render('problems',{
        topics : topics     
    });
}