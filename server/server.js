const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const { generateMessage, generateLocationMessage } = require("./utils/message");
const { isRealString } = require("./utils/validation");
const { Users } = require("./utils/users");
const publicPath = path.join(__dirname, "../public");
// console.log(__dirname + "/../public");
console.log(publicPath);
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();


app.use(express.static(publicPath));


io.on("connection", (socket) => {
  console.log("New user connected");
  // socket.broadcast.emit("newMessage", generateMessage("Admin", "New user joined"));

  socket.on("join", (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback("Name and room are required.")
    }
    var roomName = params.room.toLowerCase();
    var userName = params.name.trim().toLowerCase();
    var userExist = users.userNameExist(userName, roomName);
    if(userExist > -1) {
      return callback("Name taken. Please try with different name.");
    }

    socket.join(roomName);  //socket.leave("room.name")
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name.trim(), roomName);

    io.to(roomName).emit("updateUserList", users.getUserList(roomName));
    //io.emit (emit event to every single connected user)
    //socket.broadcast.emit (emit event to everyone connected to socket server except for the current user))
    //socket.emit (emit event specific to one user)
    socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat app"));
    socket.broadcast.to(roomName).emit("newMessage", generateMessage("Admin", `${params.name} has joined`));
    // console.log(users.users);

    const rooms = users.getRoomArray(users.users);
    console.log("rooms", rooms);
    callback();
    
  });

  socket.on("createMessage", (message, callback) => {
    var user = users.getUser(socket.id);
    if (user && isRealString(message.text)) {
      //server emit event to every connected client user
      io.to(user.room).emit("newMessage", generateMessage(user.name, message.text));
    }

    callback();

  });

  socket.on("createLocationMessage", (coords) => {
    var user = users.getUser(socket.id);
    if (user) {
      io.to(user.room).emit("newLocationMessage", generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }

  });

  socket.on("disconnect", () => {
    console.log("User disconnected")
    var user = users.removeUser(socket.id);
    console.log(user);
    if (user) {
      io.to(user.room).emit("updateUserList", users.getUserList(user.room));
      io.to(user.room).emit("newMessage", generateMessage("Admin", `${user.name} has left`));
    }
  });
});

server.listen(port, () => {
  console.log(`Server up on port: ${port}`);
});
