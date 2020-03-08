let Partner = require('mongoose').model("Partner")
let ListPartner = require('mongoose').model('ListPartner')
let bcrypt = require('bcryptjs')
let nodeMailer = require('nodemailer')
let genarator = require('generate-password')
const jwt = require('jsonwebtoken')
let config = require('config')
exports.register=((req,res,next)=>{
    const register ={}
    // res.json(req.body)
    console.log(req.body);

    if(req.body.password === req.body.confirmpass){
       
        let password = req.body.password
   
    const saltRound = 10;
    bcrypt.genSalt(saltRound,function(err,salt){
        if(err){
            console.log('error ',err);
            
        }else{
            bcrypt.hash(password,salt,async function(err,hash){
                if(err){
                    console.log('hash error',err);
                    
                }else{
                    if(req.body.lisence){
                        // regist spectific partner
                        if(req.files){                            
                           const file = req.files.file 
                           console.log(file);
                           
                         await  file.mv('public/image/'+file.name, function(err){
                               if(err) throw err
                           })
                           register.picprofile = `/image/${file.name}`
                        }
                        
                        register.lisence = req.body.lisence,
                        register.companyname = req.body.companyname,
                        register.firstname = req.body.firstname,
                        register.lastname = req.body.lastname,
                        register.email = req.body.email,
                        register.password = hash,
                        register.address = req.body.address,
                        register.contact = req.body.contact
                        register.role = "partner"
                        
                        let listpartner = new ListPartner(register)
                            listpartner.save(function(err){
                                if(err){
                                    
                                    res.json({isRegist:"Please check your email or email"})
                                    return next(err)
                                }
                                else{
                                    
                                    res.json({RegistSuccess:"success"})
                                }
                            })


                    } else{
                        register.email = req.body.email
                        register.password = hash
                        register.role = "admin"
                        let partner = new Partner(register)
                        partner.save(function(err){
                            if(err){
                                res.status(404)
                            }else{
                                res.send('admin register sucess')
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

exports.login =(async(req,res,next)=>{
    console.log('lossss',req.body);
    
    let reqEmail = req.body.email;
    let reqPass = req.body.password

    Partner.findOne({email:reqEmail},function(err,user){
        
        if(err){
            
            return next(err)
        }else{
            console.log('asdasd',user);
            
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
                                jwt.sign({id:user.id,role:user.role,firstname:user.firstname},
                                    config.get('jwtSecret'),
                                    {expiresIn:'1days'},
                                    (err,token)=>{
                                        if(err) throw err
                                        res.json({
                                            token,
                                            isSuccess:true,
                                            user})
                                    })
                                
                                
                            }
                        })
                }
                else{
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
                        // res.json({email:err.message})
                        return next(err)
                        
                    }else{
                        console.log('email send ',info.response);
                        // res.json({email:true})
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

exports.loadUser = ((req,res,next)=>{
   
    Partner.findById(req.user.id)
    .then(user=> res.json(user))
})

exports.arr=((req,res)=>{

    let data =[{id:'10',content:'best'},{id:'11',content:'man'}]
    let obj ={}
    data.map((data,i)=>{
        obj[`${data.id}`] = {id:data.id,content:data.content}
    })
    console.log(obj);
    
    res.json(data)
    
   
    
    
})

exports.testmail =((req,res)=>{
    // https://www.google.com/settings/security/lesssecureapps  ขออนุญาติ ลดความปลอดภัยของเมล เพื่อให้สามารถส่งได้
    var transpoter = nodeMailer.createTransport({
        service: 'Gmail',  
        auth: {
            user: 'tourject@gmail.com',
            pass: 'besttour'
        },
        // tls: {
        //     rejectUnauthorized: false
        // }
    });
    var mailOptions = {
        from: 'tourject@gmail.com',
        to: req.body.email,
        subject: 'Sending Email using Node.js',
        html: `  <h3>Reset Your Password</h3>
        <p>We received a request to reset your password. If you did not make this request, simply ignore this email.</p>
        
        <p>Note:YOUR PASSWORD is <b> Test Send Email</b></p>
        <p>
            Thank you,<br />
            The System
        </p>`
    };
    transpoter.sendMail(mailOptions,(err,info)=>{
        if(err){
            res.json({email:err.message})
             throw err
            
        }else{
            console.log('email send ',info.response);
            res.json({email:true})
        }
    })
})