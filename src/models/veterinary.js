const mongoose = require('mongoose')

const VetSchema = mongoose.Schema({
    huaweiId:{
        type: String,
    },
    name:{
        type: String,
    },
    address:{
        type: String,
    },
    phone:{
        type: String,
    },
    comments:{
        type:Array,
        default:[]
    },
    raking:{
        type:Number,
        default:0
    },
    totalVotes:{
        type:Number,
        default:0
    },
    appoinments:{
        type:Array,
        default:[]
    },
    services:{
        type:Array,
        default:[]
    },
    city:{
        type:String,
    },
    country:{
        type:String,
    },
    state:{
        type:String,
    },
    photoPerfil:{
        type:String,
        default:''
    },
    ubication:{
        type:Object,
    },
    photos:{
        type:Array,
        default:[]
    },
    open:{
        type:Boolean,
        default:false
    },
    hourIn:{
        type:String,
        default:''
    },
    hourOut:{
        type:String,
        default:''
    }
})

module.exports = mongoose.model('vet',VetSchema)