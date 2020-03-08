let mongoose = require('mongoose')
let Schema = mongoose.Schema

let OrderSchema = new Schema({
    userId:String,
    nameUser:String,
    tourId:String,
    round:String,
    guideId:String,
    amountMember:String,
    amountRoom:String,
    OrderDate:{
        type: Date,
        default:Date.now
    },
    pathPicPay:String,
    totalprice:Number,
    isApprove:Boolean
    
})

mongoose.model('Order',OrderSchema)