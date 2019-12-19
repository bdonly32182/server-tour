let Partner = require('mongoose').model("Partner")
let ListPartner = require('mongoose').model('ListPartner')
let bcrypt = require('bcryptjs')
let nodeMailer = require('nodemailer')
let genarator = require('generate-password')

exports.register=((req,res,next)=>{
    const register ={}
    // res.json(req.body)
    if(req.body.password === req.body.confirmpass){
       
        let password = req.body.password
   
    const saltRound = 10;
    bcrypt.genSalt(saltRound,function(err,salt){
        if(err){
            console.log('error ',err);
            
        }else{
            bcrypt.hash(password,salt,function(err,hash){
                if(err){
                    console.log('hash error',err);
                    
                }else{
                    if(req.body.lisence){
                        // regist spectific partner
                        
                        register.lisence = req.body.lisence,
                        register.companyname = req.body.companyname,
                        register.firstname = req.body.firstname,
                        register.lastname = req.body.lastname,
                        register.email = req.body.email,
                        register.password = hash,
                        register.address = req.body.address,
                        register.contact = req.body.contact
    
                        let listpartner = new ListPartner(register)
                            listpartner.save(function(err){
                                if(err){
                                    
                                    res.json({isRegist:"Please check your email or email"})
                                    return next(err)
                                }
                                else{
                                    res.json({isSuccess:"success"})
                                }
                            })


                    }
                    
                }
            })
        }
    })

    }
    else{
        res.json({notMatch:"password is Match"})
        
    }
    
})

exports.login =((req,res,next)=>{
 
    let reqEmail = req.body.email;
    let reqPass = req.body.password
    Partner.findOne({email:reqEmail},function(err,user){
    
        if(err){
          
            return next(err)
        }else{
            if(user){
                let hashString = user
           
                    bcrypt.compare(reqPass,hashString.password,function(err,isMatch){
                        if(err){
                            console.log('error before hase',err);
                            return next(err)
                            
                        }else if(!isMatch){
                            console.log('password is not incorrect');
                            res.json({isPass:"Please again Password invalid"})
                            
                        }else{
                            console.log('password is correct');
                            res.json({isSuccess:true,user})
                            
                        }
                    })
            }else{
                res.json({isMail:"email is not incorrect"})
            }
            
        }
    })
})

exports.forgot =((req,res,next)=>{
    var emails = req.body.email
    const saltRound = 10;
    let passwords = genarator.generate({
        length:8,
        numbers:true
    })
    
    console.log('passwords',passwords);

    Partner.findOne({email:emails},'password',function(err,user){
        
        
        if(err){
            
            return next(err)
            
        }else{
           if(user){
               console.log('mail correct ');
               //update (param1,param2) param1 is collection us need update , param2 is data us need update
              
            
                   bcrypt.genSalt(saltRound,function(err,salt){
                       if(err){
                           console.log('update pass and salt faild',err);
                           
                       }else{
                           bcrypt.hash(passwords,salt,function(err,hash){
                               if(err){
                                   console.log('hash faild update' ,err);
                                   
                               }else{
                                   
                                Partner.findOneAndUpdate({email:emails},{password:hash},function(err,Partner){
                                    
                                    if(err){
                                        return next(err)
                                    }else{
                                        res.send('send password to Email success')
                                    }
                                })
                               }
                           })
                       }
                   })
                   
               
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
                    to: emails,
                    subject: 'Sending Email using Node.js',
                    html: `  <h3>Reset Your Password</h3>
                    <p>We received a request to reset your password. If you did not make this request, simply ignore this email.</p>
                    
                    <p>Note:YOUR PASSWORD is <b> ${passwords} </b></p>
                    <p>
                        Thank you,<br />
                        The System
                    </p>`
                };
                transpoter.sendMail(mailOptions,(err,info)=>{
                    if(err){
                        res.json({email:err.message})
                        return next(err)
                        
                    }else{
                        console.log('email send ',info.response);
                        res.json({email:true})
                    }
                })
            
           }else{
               //ไม่มีเมลนี้อยู่ในดาต้าเบส
               res.json({email:false})
           }
            
        }
        
    }
    )
})