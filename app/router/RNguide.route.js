const auth = require('../../middleware/Auth')
module.exports=(app)=>{
    let guide = require('../controller/RNguide.controller')
    app.post('/guide/login',guide.guide_login)
    app.get('/api/work/guide/:id',guide.guide_tour)
    app.get('/api/load/guide',auth,guide.guide_load)
    app.param('id',guide.guide_byId)
}