//user models
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : 'string',
        required : true
    },
    password : {
        type : 'string',
        required : true
    },
    problems : [{
        type : Schema.Types.ObjectId,
        ref : 'Problems'
    }],
    bookMarks : [{
        type : Schema.Types.ObjectId,
        ref : 'Problems'
    }]
},
    {
        timestamps : true
    }

);

const User = mongoose.model('User',userSchema);
module.exports = User;

