const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

const ChatSchema = mongoose.Schema({
    _id: {
        type: String,
        default: function () {
            return new ObjectId().toString()
        }
    },
    userOne:{
        type:String,
        required:true,
    },
    userTwo:{
        type:String,
        required:true,
    },
    message: {
        type:Array,
        required:true,
    },
    nameChat: {
        type:String,
        required:true,
    }
})

module.exports = mongoose.model('chat',ChatSchema)