const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 3000;
const publicDirectory = path.join(__dirname, "../public");

app.use(express.static(publicDirectory));

io.on("connection", socket => {
  socket.emit("message", "Welcome!");
  socket.broadcast.emit("message", "A new user has joined!");

  socket.on("text", message => {
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    io.emit("message", "A user disconnected!");
  });

  socket.on("sendLocation", obj => {
    io.emit("message", `https://google.com/maps?q=${obj.latitude},${obj.longitude}`);
  });
});

server.listen(PORT, () => console.log("Server connected port " + PORT));
