let express = require('express')
let bodyParser = require('body-parser')
let cors = require('cors')
var cookie = require('cookie-session')
let jsonwebtoken = require('jsonwebtoken')
let fileUpload = require('express-fileupload')
module.exports=()=>{
    let app = express()
    app.use(cors())
    app.use(fileUpload())
    app.use(bodyParser.urlencoded({
        extended:true
    }))
    app.use(cookie({
        name: 'session',
        keys:['bestdangonl','bestdangoltjsfd']
    }))
    app.use(bodyParser.json())
    app.use(express.static("public"))
    require('../app/router/member.router')(app)
    require('../app/router/approvePartner.router')(app)
    require('../app/router/tour.route')(app)
    require('../app/router/guide.route')(app)
    require('../app/router/UserOrder.router')(app)
    return app
}