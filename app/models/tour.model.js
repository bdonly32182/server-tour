let mongoose = require('mongoose')
let Schema = mongoose.Schema

let tourSchema = new Schema({
    tourName:String,
    place:String,
    description:String,
    highlight:[String],
    Hotel:[String],
    PathPictur:[String],
    PDF:[String],
    Create_date: {
        type: Date,
        default: Date.now
    },
    Partner:{
        type:String
    },
    member:{
        type:[Object]
        
    },
    Round:[Object]
})

mongoose.model("Tour",tourSchema)