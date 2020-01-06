let mongoose = require('mongoose')
let Schema = mongoose.Schema

let BookSchema  = new Schema({
    Product:String,
    StatusPro:String,
    StatusUser:String,
    tour:{
        type:Schema.Types.ObjectId,
        ref:"Tour"
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    mount:{
        type:Schema.Types.ObjectId,
        ref:"Category"
    }
})

mongoose.model("BookGuide",BookSchema)