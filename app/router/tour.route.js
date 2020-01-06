
module.exports=(app)=>{
    let tour = require('../controller/Tour.controller')
    app.route('/api/tour')
        .get(tour.ListTour)
        .post(tour.CreateTour)
    app.route("/api/tour/:id")
        .get(tour.tourFetch)
        .put(tour.UpdateTour)
        .delete(tour.DelTour)
    app.route('/api/tour/:user')
        .get(tour.ListTour)
    app.param('id',tour.tourByid)
}