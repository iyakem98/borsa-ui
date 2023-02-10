import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import chatRoutes from './routes/chatRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import imgRoutes from './routes/imgRoutes.js'
import path from 'path'
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io'; //replaces (import socketIo from 'socket.io')
// import socketio from "socket.io"
import { LocalStorage } from "node-localstorage";

var localStorage = new LocalStorage('./scratch');






dotenv.config()



connectDB()

const app = express()

app.use(cors());
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/images', express.static('images')); 
// app.use('/images', express.static(path.join(__dirname, 'images')));

// const httpServer = createServer(app);
// const io = new Server(httpServer, { cors: { 
//     origin: "<http://localhost:3000>"
// } });


// io.on('connection', (socket) => {
//     console.log(`Connection established`);

//     socket.on('disconnect', () => {
//       socket.disconnect()
//       console.log('Connection severed');
//     });
// });
// app.get('/', (req, res) => {
//     res.send('API is running for Borsa')
// })
const PORT = process.env.PORT || 5000
const serv = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))
const io = new Server(serv,
    { 
       pingTimeout: 6000,
       cors: { 
           origin:  '<http://localhost:3000>' 
       } 
   });
   // <http://localhost:3000>
var users = []
var users2 = []
var chatArr = []

let userID = null

io.on("connection", (socket) => {
  
  //  console.log('connected to socket.io')

   socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });
  socket.on("user_online",  (data) =>{
  
    users.push(data)
  
   localStorage.setItem("users", JSON.stringify(users))

    // console.log(users2)

    // console.log(localStorage.getItem("users"))
    // console.log(users)
    // io.emit("usersResponse", users)
    // users[user_id] = socket.id
    // console.log(users)
    // io.emit("updateStatus", users)
    // console.log(`user is online with ID ${user_id}`)
  
  })
  socket.on("chat_users",  (data) =>{
    users2 = JSON.parse(localStorage.getItem("users"))
    console.log(socket.id)
    console.log(users2.length)
  // console.log(data.chatData[0])

    // localStorage.removeItem("users")
    // console.log(users2[1].data._id)
    // console.log(data.chatData[1]._id)
    // console.log(data.chatData2)
   
    // console.log(data.chatData.users[0])
   
    // do {
    //   if(users2[i].data._id == data.chatData.users[1]._id){
    //     console.log(`there is an active user with the chat ID = ${data.chatData._id}`)
    //      // io.emit('activatedUser', {userID: users2[i].data._id, chatID: data.chatData._id } )
            
    //   }
    //   i++;
    // }
    // while(i < users2.length)
    let userID = null 
    let chatID = null
    var j = null
    // console.log(data.chatData.users[1]._id)
    // console.log(users2[0].data._id)
    // console.log(data.chatData[0].users[1]._id)
    //  for(var i = 0, j = 0 ; i < users2.length, j < data.chatData.length ; i++, j++){
    //     if(users2[i].data._id == data.chatData[j].users[1]._id){
    //         console.log(`there is an active user with the chat ID = ${data.chatData[j]._id}`)
    //       //  userID = users2[i].data._id
    //       //  chatID = data.chatData.users[1]._id

    //       }
    // //     console.log(users2[i].data.firstName)
          
        
    // for(let i = 0; i < data.chatData.length && i < data.usrData.length; i++){
    //   console.log(data.chatData[0]._id + " " + i < data.usrData.length)
    // }
    // for(let i = 0; i < users2.length; i++){
    //   console.log(users2[i])
    // }
    // console.log(data.chatData[0].users) 
     
    // console.log(data.userID)
    // console.log(data.chatData[0].users[1]._id)
    console.log(data.chatData)
     for(let i = 0 ; i < users2.length; i++){
       for(let j = 0; j < data.chatData.length; j++){
        if((users2[i].data._id == data.chatData[j].users[0]._id || users2[i].data._id == data.chatData[j].users[1]._id)  && users2[i].data._id != data.userID){
        // if(users2[i].data._id == data.chatData[j].users[1]._id ){
                  console.log(`there is an active user with the chat ID = ${data.chatData[j]._id} and userID = ${users2[i].data._id}`)
                  io.emit('activatedUser', {userID: users2[i].data._id, chatID: data.chatData[j]._id, onlineStatus: true } )
                //  userID = users2[i].data._id
                //  chatID = data.chatData.users[1]._id
      
                }
                
              
       }
    //     console.log(users2[i].data.firstName)
          
        
          
         
     }
    //  io.emit('activatedUser', {userID: userID, chatID: chatID } )

    // console.log(users2[1].data.firstName)
    // console.log(data.chatData[1]._id)
    // console.log(data.userID)
    // console.log(users)
    // console.log(users)
    // console.log(data.chatData[1]._id)
    // if(data.userID == data.chatData[0]._id){
      // if(users2.includes(data.chatData[1]._id)){
      //   console.log("user found")
      // }
      // else{
      //   console.log("usr not found")
      // }
    
    

    // console.log(chatID)
    // io.emit("usersResponse", users)
    // users[user_id] = socket.id
    // console.log(users)
    // io.emit("updateStatus", users)
    // console.log(`user is online with ID ${user_id}`)
  })

  socket.on("userLogout", (usrID) =>{
  //  let userID = null
  userID = usrID
   console.log(userID.userID)
  //  console.log(users2)
  //  console.log(users2[0].data)
  //   console.log(users2[1].data)
  // console.log(users2[0].data._id)  
  for (let i = 0; i <  users2.length; i++) {

    if (users2[i].data._id == userID.userID) {
      
        users2.splice(i, 1);
        console.log('user deleted')
        console.log(users2)
        i = 0
        // create a new socket for logged out users
        // io.emit("activatedUser", null)
    

    }
    else{
      console.log('user was not deleted')
      
    }
    
}
localStorage.setItem("users", users2)

let counter = 0;


// while(counter < users2.length){
//   if (users2[counter].data._id == userID.userID) {
      
//             users2.splice(counter, 1);
//             console.log('user deleted')
//             counter = 0;
            
        
    
//         }
//         // else{
//         //   console.log('user was not deleted')
//         //   counter = 0;
//         // }
//         counter++;
// }
// users2 = JSON.stringify(users2);
// localStorage.setItem("users", users2)

  //  users = users.filter((user) => user.socketID !== socket.id);
    // io.emit("usersResponse", users)
    // console.log(users)
    // socket.disconnect();

  })
  socket.on("disconnect", () =>{
    // let userID = null;
   
    
    console.log('user disconnected')
    
  //  users = users.filter((user) => user.socketID !== socket.id);
    // io.emit("usersResponse", users)
    // console.log(users)
    // socket.disconnect();

  })

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;
    console.log(chat._id)
    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
   socket.off("setup", () => {
       console.log("USER Disconnected")
      //  users = users.filter((user) => user.socketID !== socket.id);
      //  console.log(users)
      //  io.emit("usersResponse", users)
      //  socket.leave(userData._id)
       
   });
})
app.use('/api/users', userRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)
app.use('/api/images', imgRoutes)
// app.use('/api/orders', orderRoutes)



// const httpServer = createServer();

