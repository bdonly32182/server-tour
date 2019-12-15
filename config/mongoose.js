let mongoose = require('mongoose')
let url = 'mongodb://localhost/best-tourProject'

module.exports =()=>{
    mongoose.set('debug',true)
    let db = mongoose.connect(url)
    require('../app/models/member.model')
    return db
}