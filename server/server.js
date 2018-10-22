const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const {generateMessage, generateLocationMessage} = require("./utils/message");
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

  socket.on("createMessage", (message, callback) => {
    console.log("createMessage", message);
    //server emit event to every connected client user
    io.emit("newMessage", generateMessage(message.from, message.text));
    callback();
    // socket.broadcast.emit("newMessage", {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on("createLocationMessage", (coords) => {
    io.emit("newLocationMessage", generateLocationMessage("Admin", coords.latitude, coords.longitude));
  });

  socket.on("disconnect", () => {
    console.log("User disconnected")
  });
});

server.listen(port, () => {
  console.log(`Server up on port: ${port}`);
});
