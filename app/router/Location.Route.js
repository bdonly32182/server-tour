module.exports=(app)=>{
    let Location = require('../controller/Location.controller')
    app.post('/api/location',Location.store)
    app.get('/api/current/location/:tourId',Location.getLocation)
    app.delete('/api/delete/location/:userId',Location.deLocationTracking)
    app.param('userId',Location.paramLocation)
}