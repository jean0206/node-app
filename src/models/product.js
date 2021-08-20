const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    ownerId:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    goal:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    photos:{
        type:Array,
        required:true,
    },
    country:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    actual:{
        type:String,
        required:true,
    }

    
})

module.exports = mongoose.model('product',ProductSchema)