
module.exports=(app)=>{
    let approve = require('../controller/appprovePartner.controller')
    app.route('/approve')
        .get(approve.ShowlistPartner)
        .post(approve.ConfirmPartner)

    app.route('/approve/:id')
        .get(approve.ReadPartner)
        .delete(approve.delPartner)

    app.param('id',approve.partnerByid)
}