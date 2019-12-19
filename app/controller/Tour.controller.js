let Tour = require('mongoose').model("Tour")

exports.CreateTour = ((req,res,next)=>{
    let tour = new Tour(req.body)
    tour.save(function(err){
        if(err){
            return next()
        }else{
            res.json({Save:"success"})
        }
    })
})

exports.ListTour = ((req,res,next)=>{
        Tour.find({},function(err,tour){
            if(err){
                return next(err)
            }else{
                res.json(tour)
            }
        })
})
exports.DelTour = ((req,res)=>{
    req.tour.remove()
})
exports.UpdateTour = ((req,res,next)=>{
    console.log(req.tour);
    
    Tour.findOneAndUpdate({_id:req.tour._id},req.body,function(err,Newtour){
        if(err){
            return next(err)
        }else{
            res.json(Newtour)
        }
    })
})

exports.tourByid = ((req,res,next,id)=>{
    Tour.findById({_id:id},function(err,tour){
        if(err){
            return next(err)
        }else{
            req.tour = tour
            next()
        }
    })
})