let Tour = require('mongoose').model("Tour")
let Guide = require('mongoose').model("Guide")
exports.CreateTour = ((req,res,next)=>{
    // console.log(req.body);
    console.log();
    
    const {form,users,formData} = req.body
    console.log(formData);
    
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
             let Count=   tour.map(t => {
                //  console.log(t.member);
                 
                 return t.member
                })
                .map(mem=>{
                 return   mem.map(e=>{
                     return amount = parseInt(e.amountMember)
                 }).reduce((ret,current)=>{
                    return ret + current
                    },0)
                })
              
                console.log(Count);
                
                res.json({tour,Count})
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
