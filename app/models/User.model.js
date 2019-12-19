let mongoose = require('mongoose')
let Schema = mongoose.Schema

let UserScema = new Schema({
    Email:{type:String,unique:true,index:true},
    Password:String,
    Firstnamr:String,
    Lastname:String,
    Address:String,
    Tel:String
})

mongoose.model("User",UserScema)