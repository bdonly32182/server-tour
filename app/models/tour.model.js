let mongoose = require('mongoose')
let Schema = mongoose.Schema

let tourSchema = new Schema({
    tourName:String,
    place:String,
    description:String,
    duration:String,
    highlight:String,
    Hotel:String,
    PathPictur:String,
    Guid:{
        type:Schema.Types.ObjectId,
        ref:"Guide"
    },
    Partner:{
        type:Schema.Types.ObjectId,
        ref:"Partner"
    }

})

mongoose.model("Tour",tourSchema)