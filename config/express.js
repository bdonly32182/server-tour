let express = require('express')
let bodyParser = require('body-parser')
let cors = require('cors')
var cookie = require('cookie-session')
module.exports=()=>{
    let app = express()
    app.use(cors())
    app.use(bodyParser.urlencoded({
        extended:true
    }))
    app.use(cookie({
        name: 'session',
        keys:['bestdangonl','bestdangoltjsfd']
    }))
    app.use(bodyParser.json())

    require('../app/router/member.router')(app)
    return app
}