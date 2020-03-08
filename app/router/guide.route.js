const auth = require('../../middleware/Auth')
module.exports =(app)=>{
    let guide = require('../controller/Guide.controller')
    app.route('/api/guide')
        .get(auth,guide.listGuide)
        .post(guide.createGuide)
    app.route('/api/guide/:id')
        .get(guide.Readguide)
        .put(guide.UpdateGuide)
        .delete(guide.DelGuide)
    // app.route('/api/guide/assign')
    //     .post(auth,guide.Assignment)
    app.get('/api/guideAssign',auth,guide.guideAssign)
    app.param('id',guide.guideById)
}