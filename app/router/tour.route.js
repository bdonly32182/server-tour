
module.exports=(app)=>{
    let tour = require('../controller/Tour.controller')
    app.route('/api/tour')
        .get(tour.ListTour)
        .post(tour.CreateTour)
    app.route("/api/tour/:id")
        .put(tour.UpdateTour)
        .delete(tour.DelTour)
   
    app.param('id',tour.tourByid)
}