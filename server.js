const express = require('express')
const app = express()

let PORT = process.env.PORT || 3001
app.listen(PORT,()=>{
    console.log('Server Runing in PORT',PORT)
})