let mongoose = require('mongoose')
let Schema = mongoose.Schema

let OrderSchema = new Schema({
    userId:String,
    tourId:String,
    amountMember:String,
    partnerId:String,
    OrderDate:{
        type: Date,
        default:Date.now
    },
    pathPicPay:String
            
})

mongoose.model('Order',OrderSchema)