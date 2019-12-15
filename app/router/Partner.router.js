module.exports =(app)=>{
    let member = require('../controller/Partner.controller')
    app.post('/register',member.register)
    app.post('/login',member.login)
}