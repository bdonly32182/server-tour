let mongoose = require('mongoose')
let Schema = mongoose.Schema

let UserScema = new Schema({
    email:{type:String,unique:true},
    password:String,
    fullname:String,
    address:String,
    contact:String,
    profile:String,
    role:String
})

mongoose.model("User",UserScema)