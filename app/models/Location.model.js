const mongoose = require('mongoose')
const Schema = mongoose.Schema

let LocationSchema = new Schema({
    userId:String,
    tourId:String,
    nameUser:String,
    latitude:Number,
    longitude:Number,
    picture:String
})

mongoose.model('Location',LocationSchema)