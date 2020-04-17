const User = require('mongoose').model('User')
let bcrypt = require('bcryptjs')
let nodeMailer = require('nodemailer')
let genarator = require('generate-password')
const jwt = require('jsonwebtoken')
let config = require('config')
let fs = require('fs')

exports.user_register =((req,res)=>{
    const{fullname,email,password,confirmpass,contact} = req.body
    console.log(req.files);
    console.log(req.body);
    if (req.body) {
        if(password == confirmpass){
        const saltRound = 10;
        bcrypt.genSalt(saltRound,function(err,salt){
            if(err){
                console.log('bcrypt EROR');
                
            }else{
                bcrypt.hash(password,salt,async function(err,hash){
                    console.log(email);
                    
                    if(err)console.log('hash eror');
                    let user = new User()
                        user.password = hash
                        user.email = email
                        user.fullname = fullname
                        user.contact = contact
                        user.role = "user"
                        try{
                            await fs.mkdirSync(`public/image/${fullname}`)
                            if (req.files) {
                                let file = req.files.photo
                                file.mv(`public/image/${fullname}/${file.name}`,(err)=>{
                                    if(err) throw err
                                })
                                user.profile = `/image/${fullname}/${file.name}`
                            }
                        }catch(e){
                            console.log('exist folder');
                            
                        }
                        
                        user.save()
                            .then(res.json({mgs:"Register success"}))
                            .catch(e => console.error(e))
                    })
                }
            })
        }else{
            res.json({msg:"Check Password and Confirmpassword "})
        }
    }else{
        console.log('ไม่มีบอดี้เข้ามาเลย');
        
    }
    
})
exports.user_login =((req,res)=>{
    console.log(req.body);
    const {username,password} = req.body
    User.findOne({email:username})
        .then(user=>{
            if(user){
                bcrypt.compare(password,user.password,(err,isMatch)=>{
                    if(err) throw err
                    if(!isMatch){
                        res.json({msg:"password not correct"})
                    }else{
                        jwt.sign({id:user._id},config.get('jwtSecret'),{expiresIn:7000},(err,token)=>{
                            if(err) console.log('jwt error');
                            res.json({
                            token,
                            user,
                            isLogin:true
                            }
                            )
                            
                        })
                    }
                })
            }else{
                res.json({msg:"Check your Email ",isLogin:false})
            }
        })
    
})
exports.user_forgot=((req,res)=>{
    var emails = req.body.email
    const saltRound = 10;
    let passwords = genarator.generate({
        length:8,
        numbers:true
    })
    

    User.findOne({email:emails},'password',function(err,user){
        
        
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
exports.load_user=((req,res)=>{
    console.log(req.user.id);
    
    User.findById(req.user.id)
    .then(user=>{
        console.log(user);
        
        res.json({user})
    })
})