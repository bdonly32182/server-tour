const GUIDE = require('mongoose').model('Guide')
const Tour = require('mongoose').model('Tour')
const jwt = require('jsonwebtoken')
const config =require('config')
exports.guide_login=((req,res)=>{
    console.log(req.body);
    const {username,password} = req.body

    GUIDE.findOne({Email:username,Password:password})
        .then(guide=>{
            
            jwt.sign({id:guide._id},config.get('jwtSecret'),{expiresIn:6000},(err,token)=>{
                if(err) throw err
                res.json({
                    token,
                    guide,
                    msg:'guide Login success'
                })
            })
        }).catch(e=>{
            console.log('login catch');
            res.json({msg:'check email or password'})
        })
    
})
exports.guide_tour=((req,res)=>{
    console.log(req.guide.id);
    
    
        Tour.find({'Round':{$elemMatch:{guide:req.guide.id}}}).then(async tours=>{
            console.log(tours);
            
            res.json(tours)
    
        }).catch(e=>{
            console.log('catch guide is tour');
            res.json({msg:'not Exist is tour'})
        })     
    
   
})
exports.guide_load=((req,res)=>{
    GUIDE.findById(req.user.id)
        .then(guide=>{
            res.json({guide})
        }).catch(e=>{
            console.log('load guide catch');
            
        })
})

exports.guide_byId=((req,res,next,id)=>{
    GUIDE.findById({_id:id}).then(guide=>{
         req.guide = guide
         next()
    })
})