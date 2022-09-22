const express = require('express');
const app =express();
const PORT =process.env.PORT ||4000;
const server = app.listen(PORT ,()=>{
console.log("server is started",PORT);


});
const io =require('socket.io')(server);
const userscount =new Set();
io.on("connection",(socket)=>{
    console.log("connection Successfully",socket.id);
   
    io.emit('users-count',userscount.size)
  socket.on('disconnect',()=>{
    console.log("disconnect",socket.id);
    userscount.delete(socket.id);
    io.emit('users-count',userscount.size)
 });
 socket.on("message",(data)=>{
    console.log("message",data);
    socket.broadcast.emit("message--receive",data);
 })

});