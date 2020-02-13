let mongoose = require('mongoose')
let Schema = mongoose.Schema

let OrderSchema = new Schema({
    userId:String,
    tourId:String,
    amountMember:String,
    OrderDate:{
        type: Date,
        default:Date.now
    }
            
})

mongoose.model('Order',OrderSchema)