
module.exports=(app)=>{
    let approve = require('../controller/appprovePartner.controller')
    app.route('/approve')
        .get(approve.ShowlistPartner)
        .post(approve.ConfirmPartner)

    app.delete('/approve/:companyname',approve.delPartner)
}