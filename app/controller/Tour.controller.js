let Tour = require('mongoose').model("Tour")
let Guide = require('mongoose').model("Guide")
exports.CreateTour = ((req,res,next)=>{
    console.log(req.body);
    const {form,users} = req.body
    let tour = new Tour(form)
        tour.Partner = users.user._id
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
            console.log(tour);
            
            if(err){
                return next(err)
            }else{
                res.json(tour)
            }
        })
})
exports.tourFetch =((req,res,next)=>{
    res.json(req.tour
        )
})
exports.DelTour = (async(req,res)=>{
   await req.tour.remove()
   Tour.find({},function(err,tour){
    console.log(tour);
    
    if(err){
        return next(err)
    }else{
        res.json(tour)
    }
})
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
