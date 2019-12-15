let User = require('mongoose').model("User")
let bcrypt = require('bcryptjs')
let nodeMailer = require('nodemailer')

exports.register=((req,res,next)=>{
    
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
                    const register ={
                        lisence : req.body.lisence,
                        companyname : req.body.companyname,
                        firstname : req.body.firstname,
                        lastname : req.body.lastname,
                        email:req.body.email,
                        password:hash,
                        address:req.body.address,
                        contact:req.body.contact,
                        role:req.body.role
                    
                    }
                    let user = new User(register)
                        user.save(function(err){
                            if(err){
                                
                                res.json({regist:"Please check your email"})
                                return next(err)
                            }
                            else{
                                res.json({regist:"success"})
                            }
                        })
                }
            })
        }
    })




})

exports.login =((req,res,next)=>{
    console.log(req.body);
    let reqEmail = req.body.email;
    let reqPass = req.body.password
    User.findOne({email:reqEmail},"password",function(err,pass){
        if(err){
            return next(err)
        }else{
            let hashString = pass
            
            bcrypt.compare(reqPass,hashString.password,function(err,isMatch){
                if(err){
                    console.log('error before hase',err);
                    return next(err)
                    
                }else if(!isMatch){
                    console.log('password is not incorrect');
                    res.json({isPass:false})
                    
                }else{
                    console.log('password is correct');
                    res.json({isPass:true})
                    
                }
            })
            
        }
    })
})

exports.forgot =((req,res)=>{
    var emails = req.body.email
    console.log(emails);
    
    User.findOne({email:emails},'password',function(err,user){
        
        
        if(err){
            console.log('errr ',err);
            
            return next(err)
            
        }else{
           console.log('user',user);
           if(user){
               console.log('mail correct ');
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
                    
                    <p>Note:YOUR PASSWORD is <b> ${user.password} </b></p>
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
               res.json({email:false})
           }
            
        }
        
    }
    )
})