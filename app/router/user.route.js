const auth = require('../../middleware/Auth')
module.exports=(app)=>{
    let user = require('../controller/user.controller')
    app.post('/user/login',user.user_login)
    app.post('/user/register',user.user_register)
    app.post('/user/forget',user.user_forgot)
    app.get('/user/loaduser',auth,user.load_user)
}