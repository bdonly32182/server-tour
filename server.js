const mongoose = require('./config/mongoose')
const express = require('./config/express')
let db = mongoose()
const app = express()
const http = require('http').Server(app)
const socketIO =require('socket.io')(http)
let Location = require('mongoose').model('Location')

socketIO.on('connection',(socket)=>{
    socket.on('currentLocation',(location)=>{
        const {userId,tourId,latitude,longitude} = location
        Location.updateOne({userId:userId,tourId:tourId},location,{upsert:true},function(err){
            if (err) {
                console.log('error',err);
             
            }
            
        })
            Location.find({tourId:tourId})
                    .then(location=>{
                      socket.broadcast.emit('location',location)  
                    })
    })
})
let PORT = process.env.PORT || 3001
http.listen(PORT,()=>{
    console.log('Server Runing in PORT',PORT)
})