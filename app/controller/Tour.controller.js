let Tour = require('mongoose').model("Tour")
let Guide = require('mongoose').model("Guide")
let fs = require('fs')
exports.CreateTour = (async(req,res,next)=>{
  
    let tour = new Tour(req.body)
    tour.Partner = req.user.id
    console.log(req.user);
    
    //set Status guide
    if(Array.isArray(req.body.guide)){
        req.body.guide.map(id=>{
            Guide.findById({_id:id})
            .then(guide=>{
                guide.Status = true
                guide.save()
            })
        })
    }else{
        Guide.findById({_id:req.body.guide})
            .then(guide=>{
                guide.Status = true
                guide.save()
            })
    }
    //push round
    if(Array.isArray(req.body.round)||Array.isArray(req.body.guide)){
       for (let index = 0; index < req.body.round.length; index++) {
      await  tour.Round.push({duration:req.body.round[index],guide:req.body.guide[index]})        
       }
    }else{
      await  tour.Round.push({duration:req.body.round,guide:req.body.guide})
    }

   try{
  await  fs.mkdirSync(`public/image/${req.body.tourName}`)
    console.log('create folder success');       
     //push path fiile 
     //check file
     if(req.files){
            const file = req.files.file
        if(Array.isArray(file)){
            file.map(async(file) =>{

            await  file.mv(`public/image/${req.body.tourName}/${file.name}`,function(err,result){
                if(err) throw err
            
            })
            tour.PathPictur.push(`/image/${req.body.tourName}/${file.name}`)
            })
        }else{
        
        await file.mv(`public/image/${req.body.tourName}/${file.name}`,function(err,result){
                if(err) throw err
                
            })
            tour.PathPictur.push(`/image/${req.body.tourName}/${file.name}`)
        } 
     }else{
         console.log('have not file');
         
     }
    
   }catch(e){
    console.log('create folder errror');
    //folder exist
   }
 

    tour.save(function(err){
        if(err){
            console.log('error save');
            
            return next()
        }else{
            res.json({Save:"success"})
        }
    })
    
})

exports.ListTour = ((req,res,next)=>{
   
    
        Tour.find({Partner:req.user.id},function(err,tour){
            console.log(tour);
            
            if(err){
                return next(err)
            }else{
             let Count=   tour.map(t => {
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
    res.json(req.tour)
})
exports.DelTour = (async(req,res)=>{
    console.log('req delete',req);
    
   await req.tour.remove()
   Tour.find({Partner:req.user.id},function(err,tour){
    console.log(tour);
    
    if(err){
        return next(err)
    }else{
     let Count=   tour.map(t => {
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
exports.UpdateTour = (async(req,res,next)=>{
    
    const {firstname} = req.body  
    Tour.findOneAndUpdate({_id:req.tour._id},req.body,async function(err,Newtour){
        if(err){
            return next(err)
        }else{
           
            //push file
            if(req.files){// exist file
             const file = req.files.file
            if(Array.isArray(file)){
                file.map(async(file) =>{
                    
                await   file.mv(`public/image/${req.body.tourName}/${file.name}`,function(err,result){
                    if(err) throw err
                   
                })
                Newtour.PathPictur.push(`/image/${req.body.tourName}/${file.name}`)
                
                })
            }else{
               
             await  file.mv(`public/image/${req.body.tourName}/${file.name}`,function(err,result){
                    if(err) throw err
                    
                })
                Newtour.PathPictur.push(`/image/${req.body.tourName}/${file.name}`)
                
            }   
            }else{
                console.log('ไม่มีไฟล์');
                
            }
            
            //push round
            //check ว่าส่ง round มาเพิ่มมั้ย
            console.log('round',req.body.round.length);
            
            if(Newtour.Round.length != req.body.round.length && Newtour.Round.length !=req.body.guide.length){
                console.log('edit round and guide',Newtour.Round.length);
                
               await  Newtour.Round.splice(0,Newtour.Round.length)//set Remove array
                 
                if(Array.isArray(req.body.round)||Array.isArray(req.body.guide)){
               
                        for (let index = 0; index < req.body.round.length; index++) {
                            await    Newtour.Round.push({duration:req.body.round[index],guide:req.body.guide[index]})        
                            
                            }

                  
                }else{
                    
                        await  Newtour.Round.push({duration:req.body.round,guide:req.body.guide})
                      
                }
               
            }else{
                console.log('ไม่เพิ่ม round or guide');
                
            }
            //check hilight
            if(Newtour.highlight.length != req.body.highlights.length){
                await  Newtour.highlight.splice(0,Newtour.highlight.length)
                if(Array.isArray(req.body.highlights)){
        
                    for (let index = 0; index < req.body.highlights.length; index++) {       
                         Newtour.highlight.push(req.body.highlights[index]) 
                        }
            }else{
                
                    await  Newtour.highlight.push(req.body.highlights)
                        
            }
            }else{
                console.log('not add or remove highlight');
                
            }
            Newtour.save()
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
