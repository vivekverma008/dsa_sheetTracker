const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notesschema = new Schema({
    user :{
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    problem : {
        type : Schema.Types.ObjectId,
        ref : 'Problems',
        required : true
    },
    content : {
        type : 'string'
    }
},{
    timestamps : true
})


const Notes = mongoose.model('Notes' ,notesschema );

module.exports  = Notes;

