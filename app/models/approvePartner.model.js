let mongoose = require('mongoose')
let Schema = mongoose.Schema

let approveSchema = new Schema({
    lisence : {type:String,unique:true},
    companyname:String,
    firstname:String,
    lastname:String,
    email:{type:String,unique:true,indexe:true},
    password:String,
    address:String,
    contact:String,
    role:String, 
    picprofile:String

})

mongoose.model("ListPartner",approveSchema)