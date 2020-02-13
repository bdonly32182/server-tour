const Guide = require('mongoose').model('Guide')
const Tour = require('mongoose').model('Tour')
exports.listGuide =((req,res,next)=>{
    Guide.find({},function(err,guide){
        if(err){
            res.json({err:err})
        }else{
            res.json({guide:guide})
        }
    })
})
exports.createGuide =((req,res,next)=>{
    const{form,users} = req.body

    const guide = new Guide(form)
        guide.Partner = users.user._id
        guide.save(function(er){
            if(er){     
                res.status(404)
            }else{

                res.json({isSave:"Create Guide Success"})
            }
        })
})
exports.Assignment =((req,res,next)=>{
    const {guidId,assignTour} = req.body

    Tour.findOne({tourName:assignTour})
    .then(async result=>{
        if(result.Guid){
            Guide.find({})
            .then(guide=>{
                res.json({msg:'Tour is Exist Guide',guide:guide})
            })
        }else{
           result.Guid = guidId
      await  result.save()
        Guide.findOne({_id:guidId})
            .then(async result =>{
                console.log(result);
                result.Status = true
               await result.save()
                Guide.find({})
                    .then(guide=>{
                        res.json({guide:guide})
                    })
            }) 
        }
        
    })
    
})
exports.Readguide =((req,res,next)=>{
    res.json(req.guide)
})
exports.UpdateGuide =((req,res,next)=>{
    Guide.findOneAndUpdate({_id:req.guide._id},req.body,function(err,guide){
        if(err){
            res.status(404)
        }else{
            res.json(guide)
        }
    })
})
exports.DelGuide =(async(req,res,next)=>{
    await req.guide.remove()
    Guide.find({},function(err,guide){
        if(err){
            res.status(404)
        }else{
            res.json({guide:guide})
        }
    })

})
exports.guideById =((req,res,next,id)=>{
    Guide.findById({_id:id},function(err,guide){
        if(err){
            return next(err)
        }else{
            req.guide = guide
            next()
        }
    })
})