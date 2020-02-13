module.exports=(app)=>{
    let order = require('../controller/UserOrder.controller')
    app.get('/api/listorder',order.listOrder)
    app.post('/api/buyorder',order.createOrder)
    app.post('/api/approveorder/:id',order.approveOrder)
    app.post('/api/test',order.test)
    app.param('id',order.orderByid)
}
// approve order's user