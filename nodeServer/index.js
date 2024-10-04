 // Node server which wil handle socket.io connections
 const io = require('socket.io')(8000)

 const users = {};       // initialise the users which want to talk with chat
  // when any person add in the chat
 io.on('connection', socket=>{     // io.on() => it handle more user who want to chat
    socket.on('new-user-joined', name=>{     // socket.io() => it handle a particular user who want to chat
       console.log("New user", name);
        users[socket.id] = name;    // when any join in a chat then store with socket.id
        socket.broadcast.emit('user-joined',name);  // socket.broadcast.emit() => it share the informantion when any extra person add in chat with name.
    });
    // when any write the message in chat box.
    socket.on('send', message =>{
        socket.broadcast.emit('receiver', {message: message, name: users[socket.id]})   // after sending message all members are receiverd by socket.broadcast.emit()

        socket.on('disconnect', message =>{
            socket.broadcast.emit('left',users[socket.id])   // after removing any person from clinet side then other person are message to go one person .
         delete users[socket.id];
      
       });
 }) 
})