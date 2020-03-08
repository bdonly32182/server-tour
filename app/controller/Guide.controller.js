const Guide = require('mongoose').model('Guide')
const Tour = require('mongoose').model('Tour')
const fs = require('fs')
exports.guideAssign =((req,res)=>{
    Guide.find({Partner:req.user.id,Status:false})
        .then(guide=>{
            res.json({guide:guide})
        }).catch(e=>{
            console.log('catch');
            
        })
})
exports.listGuide =((req,res,next)=>{
    Guide.find({Partner:req.user.id},function(err,guide){
        if(err){
            res.json({err:err})
        }else{
            res.json({guide:guide})
        }
    })
})
exports.createGuide =(async(req,res,next)=>{
    const{form,Partner} = req.body
    console.log(req.body);
    console.log(req.files);
    
    
    let guide = new Guide(req.body)
    try{
        console.log('try');
        
      await  fs.mkdirSync(`public/image/${req.body.license}`)
      if (req.files) {
        console.log('filesave');
            let file = req.files.file
          await   file.mv(`public/image/${req.body.license}/${file.name}`,function(err,result){
                if(err) throw err
                  guide.Profile == `/image/${req.body.license}/${file.name}`
            })
          
         }else{
             console.log('exist file');
             
         }
        
    }catch(e){
        console.log('exist folder');
        
    }
        
        guide.Status = false
        guide.Role = "guide"
        guide.save(function(er){

            if(er){     
                res.status(404)
            }else{
            console.log('save');
                res.json({isSave:"Create Guide Success"})
            }
        })
})
// exports.Assignment =((req,res,next)=>{
//     const {guidId,assignTour} = req.body

//     Tour.findOne({tourName:assignTour})
//     .then(async result=>{
//         console.log(result);
//     //     result.Round.push({day:"1-2",guide:""})
//     //    await result.save()
//     //    let forAssign= result.Round.filter(round =>{
//     //        console.log(round);
           
//     //         // return round.guide == ""
//     //     })
//         // console.log(forAssign);
        
//     //     if(result.Guid){
//     //         Guide.find({})
//     //         .then(guide=>{
//     //             res.json({msg:'Tour is Exist Guide',guide:guide})
//     //         })
//     //     }else{
//     //        result.Guid = guidId
//     //   await  result.save()
//     //     Guide.findOne({_id:guidId})
//     //         .then(async result =>{
//     //             console.log(result);
//     //             result.Status = true
//     //            await result.save()
//     //             Guide.find({})
//     //                 .then(guide=>{
//     //                     res.json({guide:guide})
//     //                 })
//     //         }) 
//     //     }
        
//     })
    
// })
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