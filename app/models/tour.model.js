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
    Create_date: {
        type: Date,
        default: Date.now
    },
    Guid:{
        type:[String]
    },
    Partner:{
        type:String
    },
    member:{
        type:[String]
    }

})

mongoose.model("Tour",tourSchema)