let Order = require('mongoose').model('Order')
let Tour = require('mongoose').model('Tour')
let fs = require('fs')
exports.listOrder =(req,res)=>{
    Order.find({partnerId:req.user.id},function(err,result){
        if(err){
            res.sendStatus(403)
        }else{
            res.json(
                result
            )
        }
    })
}

exports.createOrder =(req,res)=>{

    let order = new Order(req.body)
    order.save(function(err){
        if(err){
            res.sendStatus(403)
        }else{
            res.json({
                message:"save order Success"
            })
        }
    })
}
exports.approveOrder = async(req,res)=>{
    
    const {userId,amountMember,orderDate,tourId} = req.order
    let order = {
        userId:userId,
        amountMember:amountMember,
        orderDate:orderDate
    }
    console.log(req.body);
    
    
  await  Tour.findById({_id:tourId},async function (err,result){
        if(err){
            res.sendStatus(403)
        }else{
            
                 result.member.push(req.order) 
                 result.save()
                await req.order.remove()
                console.log('remove');
                Order.find({partnerId:req.body._id},function(err,order){
                    console.log('order after remobe',order);
                    if(err){
                        res.sendStatus(403)
                    }else{
                        res.json(order)
                    }
                })
        }

    })
    
}

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
