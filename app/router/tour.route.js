const auth = require('../../middleware/Auth')
module.exports=(app)=>{
    let tour = require('../controller/Tour.controller')
    app.route('/api/tour')
        .get(auth,tour.ListTour)
        .post(auth,tour.CreateTour)
    app.route("/api/tour/:id")
        .get(tour.tourFetch)
        .put(tour.UpdateTour)
        .delete(tour.DelTour)
    app.route('/api/tour/:user')
        .get(tour.ListTour)
    app.get('/api/Ntour',tour.Alltoure)
    app.get('/api/partners',tour.ListPartner)//list partner
    app.get('/list/tour/partner/:_id',tour.tour_partner)
    // app.post('/api/location',tour.location)
    app.param('id',tour.tourByid)
}