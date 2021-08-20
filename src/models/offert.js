const mongoose = require('mongoose')

const OffertSchema = mongoose.Schema({
    productId:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    photos:{
        type:Array,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    ownerId: {
        type:String,
        required:true,
    }, 
    ownerName: {
        type:String,
        required:true,
    }
})

module.exports = mongoose.model('offer',OffertSchema)