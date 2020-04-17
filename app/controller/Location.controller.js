let Location = require('mongoose').model('Location')
exports.store =((req,res)=>{
    const {userId,tourId,latitude,longitude} = req.body
    Location.updateOne({userId:userId,tourId:tourId},req.body,{upsert:true},function(err){
        if (err) {
            console.log('error',err);
          return  res.sendStatus(400)
        }
        res.sendStatus(200)
    })
})

exports.getLocation =((req,res)=>{
    const {tourId} = req.params
    Location.find({tourId:tourId})
            .then(location=>{
                res.json(location)
            })
})
exports.deLocationTracking =((req,res)=>{
    req.location.remove()
    res.sendStatus(200)
})
exports.paramLocation =((req,res,next,userId)=>{
    Location.findOne({userId:userId})
            .then(location =>{
                req.location = location
                next()
            })
})