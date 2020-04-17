let Tour = require('mongoose').model("Tour")
let Guide = require('mongoose').model("Guide")
let Partner = require('mongoose').model("Partner")
let User = require('mongoose').model("User")
let fs = require('fs')
//react
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
        if(req.body.guide !='--Select--'){
            Guide.findById({_id:req.body.guide})
            .then(guide=>{
                guide.Status = true
                guide.save()
            })
        }else{
            console.log('dont have guide to round');
            
        }
        
    }
    //push round
    if(Array.isArray(req.body.round)||Array.isArray(req.body.guide)|| Array.isArray(req.body.totalroom)){
       for (let index = 0; index < req.body.round.length; index++) {
      await  tour.Round.push({duration:req.body.round[index],guide:req.body.guide[index],totalroom:req.body.totalroom[index],priceRoom:req.body.priceRound[index],priceTour:req.body.priceTour[index]})        
       }
    }else{
      await  tour.Round.push({duration:req.body.round,guide:req.body.guide,totalroom:req.body.totalroom,priceRoom:req.body.priceRound,priceTour:req.body.priceTour})
    }

   try{
  await  fs.mkdirSync(`public/image/${req.body.tourName}`)
    console.log('create folder success');       
     //push path fiile 
     //check file
     if(req.files.file){
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
     if(req.files.pdf){
        const pdf = req.files.pdf
        if(Array.isArray(pdf)){
            pdf.map(async(pdf) =>{

            await  pdf.mv(`public/image/${req.body.tourName}/${pdf.name}`,function(err,result){
                if(err) throw err
            
            })
            tour.PDF.push(`/image/${req.body.tourName}/${pdf.name}`)
            })
        }else{
        
        await pdf.mv(`public/image/${req.body.tourName}/${pdf.name}`,function(err,result){
                if(err) throw err

            })
            tour.PDF.push(`/image/${req.body.tourName}/${pdf.name}`)
        } 
     }else{
         console.log('not file pdf');
         
     }
    
   }catch(e){
    console.log('create folder errror');
    //folder exist
   }
 

    tour.save(function(err){
        if(err){
            console.log('save err',err);
            
            
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
                     //amountMember
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
    
    req.tour.remove()
    res.json({msg:'delete tour success'})
//    Tour.find({Partner:req.user.id},function(err,tour){
//     console.log(tour);
    
//     if(err){
//         return next(err)
//     }else{
//      let Count=   tour.map(t => {
//          return t.member
//         })
//         .map(mem=>{
//          return   mem.map(e=>{
//              return amount = parseInt(e.amountMember)
//          }).reduce((ret,current)=>{
//             return ret + current
//             },0)
//         })
      
//         console.log(Count);
        
//         res.json({tour,Count})
//     }
// })
})
exports.UpdateTour = (async(req,res,next)=>{
    console.log('hilig',req.body.highlights);
    console.log('hotel',req.body.Hotels);
    
    
    const {firstname} = req.body  
    Tour.findOneAndUpdate({_id:req.tour._id},req.body,async function(err,Newtour){
        if(err){
            return next(err)
        }else{
           
            //push file
            console.log('file',req.files);
            if (req.files) {
                if(req.files.file){// exist file
                    const file = req.files.file
                    if(Array.isArray(file)&&file){
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
                if(req.files.pdf){
                    const pdf = req.files.pdf
                    console.log(pdf);
                    
                    if(Array.isArray(pdf)&&pdf){
                        pdf.map(async(pdf) =>{

                        await  pdf.mv(`public/image/${req.body.tourName}/${pdf.name}`,function(err,result){
                            if(err) throw err
                        
                        })
                        Newtour.PDF.push(`/image/${req.body.tourName}/${pdf.name}`)
                        })
                    }else{
                    
                    await pdf.mv(`public/image/${req.body.tourName}/${pdf.name}`,function(err,result){
                            if(err) throw err

                        })
                        Newtour.PDF.push(`/image/${req.body.tourName}/${pdf.name}`)
                    } 
                }else{
                    console.log('not file pdf');
                    
                } 
            }else{
                console.log('not files');
                
            }
            
            
            //push round
            //check ว่าส่ง round มาเพิ่มมั้ย
            console.log('round',req.body.round.length);
            
            if(Newtour.Round.length != req.body.round.length && Newtour.Round.length !=req.body.guide.length){
                console.log('edit round and guide',Newtour.Round.length);
                
               await  Newtour.Round.splice(0,Newtour.Round.length)//set Remove array
                 
                if(Array.isArray(req.body.round)||Array.isArray(req.body.guide)||Array.isArray(req.body.totalroom)){
                    req.body.guide.map(id=>{
                        Guide.findById({_id:id})
                        .then(guide=>{
                            guide.Status = true
                            guide.save()
                        })
                    })
                        for (let index = 0; index < req.body.round.length; index++) {
                            await    Newtour.Round.push({duration:req.body.round[index],guide:req.body.guide[index],totalroom:req.body.totalroom[index],priceRoom:req.body.priceRound[index],priceTour:req.body.priceTour[index]})        
                            
                            }

                  
                }else{
                    if(req.body.guide !='--Select--'){
                        Guide.findById({_id:req.body.guide})
                        .then(guide=>{
                            guide.Status = true
                            guide.save()
                        })
                    }else{
                        console.log('dont have guide to round');
                    }
                        await  Newtour.Round.push({duration:req.body.round,guide:req.body.guide,totalroom:req.body.totalroom,priceRoom:req.body.priceRound,priceTour:req.body.priceTour})
                      
                }
               
            }else{
                console.log('ไม่เพิ่ม round or guide');
                
            }
            //check hotel
            if (Newtour.Hotel.length != req.body.Hotels.length) {
               await Newtour.Hotel.splice(0,Newtour.Hotel.length)
               if (Array.isArray(req.body.Hotels)) {
                    for (let index = 0; index < req.body.Hotels.length; index++) {       
                        Newtour.Hotel.push(req.body.Hotels[index]) 
                    }
               }else{
                await  Newtour.Hotel.push(req.body.Hotels)

               }
            }else{
                console.log('not add or remove Hotel');
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
            // res.json(Newtour)
            res.json({editSuc:'Edit Success'})
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
//react-native
exports.Alltoure=((req,res)=>{
    Tour.find({},(err,tour)=>{
        if(err) throw err

        res.json(tour)
    })
})
exports.ListPartner =((req,res)=>{
   
    Partner.find({role:"partner"},function(err,result){
        if(err) throw err
       let partner= result.sort((a,b)=>{
            return b.point-a.point  
        })
        res.json(partner)
    })
    
})
exports.tour_partner=((req,res)=>{
    Tour.find({Partner:req.params})
        .then(tour=>{
            res.json(tour)
        }).catch(e=>{
            console.log('tour eror');
            
        })
})

