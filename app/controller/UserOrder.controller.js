let Order = require('mongoose').model('Order')
let Tour = require('mongoose').model('Tour')
let User =require('mongoose').model('User')
let Partner = require('mongoose').model('Partner')
let fs = require('fs')
let qrcode = require('qrcode')
let generatePayload = require('promptpay-qr')
exports.listOrder =async(req,res)=>{
    //แก้ปัญหา res.send in map func โดยการใช้ promise
    let myFirstPromise = new Promise((resolve, reject) => {
        let arr = []
        Tour.find({Partner:req.user.id})
        .then(tour =>{
            tour.map(tour=>{
                  Order.find({tourId:tour._id,isApprove:false})
                        .then(async( order)=>{ 
                            order.map(async (order)=>{
                                await  arr.push(order)
                            }) 
                            if(arr.length >0){
                                resolve(arr) // resolve is .then && reject is catch 
                            }else{
                                console.log('no data');
                                
                            }
                                    
                     })   
                     
            })  
        })
      }) 
      
      myFirstPromise.then((result) => {     
          console.log(result);
               
       res.json(result)
      });    
}

exports.createOrder =async(req,res)=>{
    // console.log(req.files.files);
    
       const {tourId,userId,name,amontMember,amountRoom,totalprice,isApprove,round,allround} = req.body
       console.log(allround);
       
       const formatData={}
       formatData.tourId = tourId
       formatData.userId= userId
       formatData.nameUser= name
       formatData.guideId = allround
       formatData.amountMember=amontMember
       formatData.amountRoom= amountRoom
       formatData.totalprice = totalprice
       formatData.isApprove=isApprove
       formatData.round = round
    try{
       await fs.mkdirSync(`public/bill/${name}`)
       if(req.files.photo){
            const file = req.files.photo
             await  file.mv(`public/bill/${name}/${file.name}`,function(err){
                if(err) throw err
                formatData.pathPicPay=`/bill/${name}/${file.name}`

                let order = new Order(formatData)
                order.save()
                res.json({mgs:"buy_success"})
            })
       }else{
           console.log('fail');
       }
        
    }catch(e){
        console.log('exist folder');
        const file = req.files.photo
        await  file.mv(`public/bill/${name}/${file.name}`,function(err){
            if(err) throw err
            formatData.pathPicPay=`/bill/${name}/${file.name}`

            let order = new Order(formatData)
            order.save()
            res.json({msg:'buy_success'})
        })
        
    }
    
}
exports.Generate=((req,res)=>{
    const {tour,user,totalprice} = req.body
    
    Partner.findById({_id:tour.Partner})
            .then(partner=>{
                let numberPhone = partner.contact
                let amount = totalprice.totalPrice
                const payload = generatePayload(numberPhone,{amount})
                const options = { type: 'svg', color: { dark: '#003b6a', light: '#f7f8f7' } }

                // qrcode.toFile(`public/qrcode/${user.user.fullname}.png`,payload,function(err){
                //         if(err) throw err
                //         console.log('genarate complete');
                //         res.json({qrcode:`/qrcode/${user.user.fullname}.png`})
                //     }) 
                qrcode.toString(payload,options,(err,svg)=>{
                    if(err) throw err
                    fs.writeFileSync(`public/qrcode/${user.user.fullname}.svg`,svg)
                    res.json({qrcode:`/qrcode/${user.user.fullname}.svg`})
                })
            }).catch(e=>{
                    console.log('find partner faild');
                    
            })
})
exports.approveOrder = async(req,res)=>{
    const {_id,userId,tourId,amountMember,OrderDate} = req.body
    console.log(req.body);
    const PromiseFunc = new Promise((resolve,reject)=>{
        let arr =[]
       Order.findById({_id:_id})
        .then(async(order)=>{
            console.log(order);
            
            Tour.findById({_id:tourId})
                .then(async(tour)=>{
                     
                    order.isApprove = true
                    await order.save()
                    tour.member.push(order)
                   console.log(order.isApprove);
                   await tour.save()
                    Tour.find({Partner:req.user.id})
                        .then((tour)=>{
                            tour.map(tour=>{
                                Order.find({tourId:tour._id,isApprove:false})
                                    .then(order=>{
                                        order.map(async (order)=>{
                                           await arr.push(order)
                                        })
                                        if(arr.length >0){
                                            resolve(arr) 
                                        }else{
                                            console.log('no data');
                                            resolve([])
                                        }
                                    })
                            })
                        })
                })
                
        }) 
    })
    PromiseFunc.then(result=>{
        console.log('result',result);
        res.json(result)
        
    })
    
}
exports.order=(async(req,res)=>{
    console.log(req.order);
    let order ={}
    order.pathPicPay = req.order.pathPicPay
    order.round = req.order.round
   await Tour.findById({_id:req.order.tourId})
        .then(tour=>{
            console.log(tour);
            order.tourName= tour.tourName
        }).catch(e=>{
            console.log('find catch');
            
        })
    await User.findById({_id:req.order.userId})
                .then(user=>{
                    order.userFulname= user.fullname
                    order.userAddress = user.address
                    order.contact = user.contact
                }).catch(e=>{
                    console.log('ouser fail');
                    
                })
    res.json(order)
})
exports.RNOrderlist =((req,res)=>{
    console.log(req.user.id);
    
    const PromiseFunc = new Promise(async(resolve,reject)=>{
        let arr =[]
        
        let orderss={}
     await   Tour.find({'member':{$elemMatch:{userId:req.user.id}}})
                .then(async toursTrue=>{
                    //ทัวร์ที่ได้เข้าร่วม
                    console.log('tourTrue',toursTrue);
                    resolve(toursTrue)
                // await   arr.push({isTrue:toursTrue})
                })
    //  await   Order.find({userId:req.user.id,isApprove:false})
    //             .then(async orders=>{
    //          await orders.map(async order=>{
    //                    await Tour.find({_id:order.tourId})
    //                         .then(async toursFalse=>{
                              
    //                           await  (arr.push({isFalse:toursFalse}))
                             
    //                         })
                          
    //                         // มีทัวร์ที่ยังไม่อนุญาติเข้าไป
    //                    resolve(arr)      
    //                 })
                   
                    
                    
    //             })
                //อนุญาติมหมดทุกทัวร์
        //  resolve(arr) 
          
     })
    PromiseFunc.then(orders=>{
        console.log(orders);
        res.json(orders)
    })
})
exports.orderByid = ((req,res,next,id)=>{
    Order.findById({_id:id},function(err,order){
        if(err){
            return next(err)
        }else{
            req.order = order
            next()
        }
    })
})
