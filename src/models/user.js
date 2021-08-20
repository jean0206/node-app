const mongoose = require('mongoose')

const UserSchem = mongoose.Schema({
    huaweiId:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    email: {
        type:String,
    },
    photoPerfil: {
        type:String,
    },
    products: {
        type:Array,
    },
    country: {
        type:String,
        required:true,
    },
    city: {
        type:String,
        required:true,
    },
    state: {
        type:String,
        required:true,
    }

    
})

module.exports = mongoose.model('user',UserSchem)