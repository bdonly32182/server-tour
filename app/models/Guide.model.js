let mongoose = require('mongoose')
let Schema = mongoose.Schema

let GuideSchema = new Schema({
    license:{type:String,unique:true},
    Firstname:String,
    Lastname:String,
    Email:{type:String,unique:true,index:true},
    Password:String,
    Address:String,
    Tel:String,
    Status:Boolean,
    Partner:{
        type:String
    },
    Role:String

})

mongoose.model("Guide",GuideSchema)