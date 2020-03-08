const auth = require('../../middleware/Auth')
module.exports=(app)=>{
    let order = require('../controller/UserOrder.controller')
    app.get('/api/listorder',auth,order.listOrder)
    app.post('/api/confirm',order.createOrder)
    app.post('/api/qrcode',order.Generate)
    app.post('/api/approveorder',auth,order.approveOrder)
    app.get('/api/order/:id',order.order)
    app.get('/api/RNlistorer',auth,order.RNOrderlist)
    app.param('id',order.orderByid)
}
// approve order's user`