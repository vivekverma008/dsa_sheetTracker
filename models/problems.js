//problems models
const mongoose = require('mongoose');

const problemsSchema = mongoose.Schema({
    topic : {
        type : 'string'
    },
    url : {
        type : 'string',
        required : true
    },
    sheet : {
        type : 'string'
    },
    name : {
        type : 'string',
        required : true
    },
    difficulty : {
        type : 'string'
    }
});

const Problems = mongoose.model('Problems',problemsSchema);

module.exports = Problems;