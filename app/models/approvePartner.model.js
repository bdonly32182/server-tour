let mongoose = require('mongoose')
let Schema = mongoose.Schema

let approveSchema = new Schema({
    id:{type:String,index:true},
    lisence : {type:String,unique:true},
    companyname:String,
    firstname:String,
    lastname:String,
    email:{type:String,unique:true,indexe:true},
    password:String,
    address:String,
    contact:String
})

mongoose.model("ListPartner",approveSchema)