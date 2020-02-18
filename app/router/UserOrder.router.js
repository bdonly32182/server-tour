const auth = require('../../middleware/Auth')
module.exports=(app)=>{
    let order = require('../controller/UserOrder.controller')
    app.get('/api/listorder',auth,order.listOrder)
    app.post('/api/buyorder',auth,order.createOrder)
    app.post('/api/approveorder/:id',order.approveOrder)
    app.param('id',order.orderByid)
}
// approve order's user