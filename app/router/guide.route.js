
module.exports =(app)=>{
    let guide = require('../controller/Guide.controller')
    app.route('/api/guide')
        .get(guide.listGuide)
        .post(guide.createGuide)
    app.route('/api/guide/:id')
        .get(guide.Readguide)
        .put(guide.UpdateGuide)
        .delete(guide.DelGuide)

    app.param('id',guide.guideById)
}