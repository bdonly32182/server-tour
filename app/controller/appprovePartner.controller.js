let ListPartner = require('mongoose').model('ListPartner')
let User = require('mongoose').model('User')
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
    let {companyname} = req.body
 let result= await ListPartner.findOne({companyname:companyname},function(err,result){
        
        if(err){
            res.json(err)
            return next(err)
        }else{ 
            res.json({comfirm:"success"})
            
        }
    
    })
 console.log(result);
 
    let user = new User(result)
    user.id = result.id
    user.isNew =true
    user.save(function(err){
        if(err){
           return next(err)
        }else{
            console.log("save successe");
            
        }
    })
    result.remove()
    
})
exports.delPartner =((req,res,next)=>{
    let {companyname} = req.params
    
    ListPartner.remove({companyname:companyname},function(err,delUser){
        if(err){
            return next(err)
        }else{
            res.json(delUser)
        }
        
    })
    
})