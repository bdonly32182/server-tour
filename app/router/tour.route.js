const auth = require('../../middleware/Auth')
module.exports=(app)=>{
    let tour = require('../controller/Tour.controller')
    app.route('/api/tour')
        .get(auth,tour.ListTour)
        .post(auth,tour.CreateTour)
    app.route("/api/tour/:id")
        .get(tour.tourFetch)
        .put(tour.UpdateTour)
        .delete(auth,tour.DelTour)
    app.route('/api/tour/:user')
        .get(tour.ListTour)
    app.param('id',tour.tourByid)
}