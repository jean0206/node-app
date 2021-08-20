const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

const NotificationSchema = mongoose.Schema({
    _id: {
        type: String,
        default: function () {
            return new ObjectId().toString()
        }
    },
    ownerId:{
        type:String,
        required:true,
    },
    text:{
        type:String,
        required:true,
    },
    date: {
        type:String,
        required:true,
    }
    
})

module.exports = mongoose.model('notification',NotificationSchema)