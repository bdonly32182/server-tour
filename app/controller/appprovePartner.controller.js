let ListPartner = require('mongoose').model('ListPartner')
let Partner = require('mongoose').model('Partner')
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
            res.json(err)
            return next(err)
        }else{ 
             let partner = new Partner(result)
                partner.id = result.id
                partner.isNew =true
                partner.save(async function(err){
                    if(err){
                    return next(err)
                    }else{
                       console.log('save success');
                      await  result.remove()
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