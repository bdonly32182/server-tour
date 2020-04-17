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
exports.editAssign =((req,res)=>{
    //หน้า edit
    Guide.find({Partner:req.user.id})
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
                 
            })
           guide.profile = `/image/${req.body.license}/${file.name}`
         }else{
             console.log('exist file');
             
         }
        
    }catch(e){
        console.log('exist folder');
        if (req.files) {
            console.log('filesave');
                let file = req.files.file
              await   file.mv(`public/image/${req.body.license}/${file.name}`,function(err,result){
                    if(err) throw err
                     
                })
               guide.profile = `/image/${req.body.license}/${file.name}`
             }else{
                 console.log('exist file');
                 
             }
       
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
exports.cancleAssign =((req,res)=>{
    //ลบรอบแล้ว เปลี่ยนสถานะไกด์
    console.log(req.guide);
    console.log(req.params.id);
    Guide.findById({_id:req.params.id})
        .then(guide =>{
            guide.Status = false
            guide.save()
            res.json({msg:'success'})
        }).catch(e=>{
            console.log('catch guide line 95');
            
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
            // res.json(guide)
            res.json({msg:'edit guide success',guide})
        }
    })
})
exports.DelGuide =(async(req,res,next)=>{
     req.guide.remove()
     res.json({msg:'delete success'})
    

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