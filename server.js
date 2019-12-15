const mongoose = require('./config/mongoose')
const express = require('./config/express')
let db = mongoose()
const app = express()

let PORT = process.env.PORT || 3001
app.listen(PORT,()=>{
    console.log('Server Runing in PORT',PORT)
})