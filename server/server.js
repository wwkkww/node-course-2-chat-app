const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const {generateMessage} = require("./utils/message");
const publicPath = path.join(__dirname, "../public");
// console.log(__dirname + "/../public");
console.log(publicPath);
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));


io.on("connection", (socket) => {
  console.log("New user connected");

  //"socket.emit" emit event to single connection
  // socket.emit("newMessage", {
  //   from: "wkw",
  //   text: "Can we meet at 6pm later?",
  //   createdAt: 123
  // });

  socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat app"));

  socket.broadcast.emit("newMessage", generateMessage("Admin", "New user joined"));

  socket.on("createMessage", (message) => {
    console.log("createMessage", message);

    //emit event to every connected user connection
    io.emit("newMessage", generateMessage(message.from, message.text));

    
    // socket.broadcast.emit("newMessage", {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  // socket.on("createEmail", (newEmail) => {
  //   console.log("createEmail", newEmail);
  // });

  socket.on("disconnect", () => {
    console.log("User disconnected")
  });
});

server.listen(port, () => {
  console.log(`Server up on port: ${port}`);
});
