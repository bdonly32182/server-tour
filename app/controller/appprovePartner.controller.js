let ListPartner = require('mongoose').model('ListPartner')
let Partner = require('mongoose').model('Partner')
let nodeMailer = require('nodemailer')

exports.ShowlistPartner =((req,res,next)=>{
    ListPartner.find({},function(err,list){
        console.log(list);
        if(err){
            res.json(err)
            return next(err)
        }else{
            res.json(list)
        }

    })
})

exports.ConfirmPartner = (async(req,res,next)=>{
    let {lisence} = req.body
 let result= await ListPartner.findOne({lisence:lisence}, function(err,result){
        
        if(err){
            return next(err)
        }else{ 
            var transpoter = nodeMailer.createTransport({
                service: 'gmail',  
                auth: {
                    user: 'tourject@gmail.com',
                    pass: 'besttour'
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
            var mailOptions = {
                from: 'tourject@gmail.com',
                to: result.email,
                subject: 'ยืนยันการเข้าร่วมเป็นพาร์ทเนอร์',
                html: `  <h3>คุณได้รับการอนุมัติการเข้าร่วมจากแอดมินแล้ว</h3>
                <p>ยินดีที่ได้ร่วมงานกับทางบริษัท ${result.companyname} นะคะ</p>
                
                
                <p>
                    Thank you,<br />
                    
                </p>`
            };
          transpoter.sendMail(mailOptions,(err,info)=>{
                if(err){
                    console.log('send mail eror',err);
                    
                    
                }else{
                    console.log('email send ',info.response);
                }
            })
             let partner = new Partner(result)
                partner._id = result._id
                partner.point=0
                partner.isNew =true
                partner.save(async function(err){
                    if(err){
                    return next(err)
                    }else{
                        
                        
                       await result.remove()
                        ListPartner.find({},function(err,list){
                            console.log(list);
                            if(err){
                                res.json(err)
                                return next(err)
                            }else{
                                res.json(list)
                            }
                    
                        })
                    }
                })
            
        }
    
    })
   
    
})
exports.ReadPartner = ((req,res,next)=>{
    res.json(req.list)
})
exports.delPartner =(async(req,res,next)=>{
  await req.list.remove()
  ListPartner.find({},function(err,list){
    console.log(list);
    if(err){
        res.json(err)
        return next(err)
    }else{
        res.json(list)
    }

})
})

exports.partnerByid = ((req,res,next,id)=>{
    ListPartner.findById({_id:id},function(err,listpartner){
        if(err){
            return next(err)
        }else{
            req.list = listpartner;
            next();
        }
    })
})