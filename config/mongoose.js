let mongoose = require('mongoose')
let url = 'mongodb://localhost/best-tourProject'
let config = require('config')
const Atlas = config.get('mongoAtlas')
module.exports =()=>{
    
    mongoose.set('debug',true)
    let db = mongoose.connect(Atlas,{useNewUrlParser:true,useCreateIndex:true})
    require('../app/models/member.model')
    require('../app/models/approvePartner.model')
    require('../app/models/tour.model')
    require('../app/models/User.model')
    require('../app/models/Guide.model')
    require('../app/models/BookGuide.model')
    require('../app/models/UserOrder.model')
    require('../app/models/Location.model')
    return db
}