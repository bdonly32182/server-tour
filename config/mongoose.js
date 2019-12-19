let mongoose = require('mongoose')
let url = 'mongodb://localhost/best-tourProject'

module.exports =()=>{
    mongoose.set('debug',true)
    let db = mongoose.connect(url)
    require('../app/models/member.model')
    require('../app/models/approvePartner.model')
    require('../app/models/tour.model')
    require('../app/models/User.model')
    require('../app/models/Guide.model')
    require('../app/models/BookGuide.model')
    return db
}