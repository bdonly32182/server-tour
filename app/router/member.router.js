let auth = require('../../middleware/Auth')
module.exports =(app)=>{
    let member = require('../controller/member.controller')
    app.post('/register',member.register)
    app.route('/login')
        .post(member.login)
        
    app.post('/forgotpass',member.forgot)
    app.get('/api/auth/user',auth,member.loadUser)
}