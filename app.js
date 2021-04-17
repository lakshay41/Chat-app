const express=require('express');
const app=express();
const socketio=require('socket.io');
const http=require('http');
const server =http.Server(app);
const path=require('path');
const io=socketio(server);
const PORT=4000||process.env.PORT;
const mapping={};

app.use('/',express.static(path.join(__dirname,'static')));

io.on('connection',(socket)=>{
    console.log(`${socket.id}-Connected`);
    socket.on('login',(data)=>{
        mapping[socket.id]=data.name;
    })
    socket.on('send-msg',(data)=>{
        io.emit('received-msg',{
            id:socket.id,
            name:mapping[socket.id],
            msg:data.msg
        })
       
    })
})


server.listen(PORT,()=>{
    console.log("Server running at 4000");
})