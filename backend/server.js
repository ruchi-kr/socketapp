const express = require("express");
const app = express();
const http = require("http");
const {Server} = require("socket.io");
const server = http.createServer(app);
const cors = require("cors");   
app.use(cors());

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

//listening to event
io.on("connection", (socket) => {
    console.log(`user connected:${socket.id}`);

    socket.on("send_message", (data) => {
        // console.log(data);
        socket.broadcast.emit("receive_message", data);     //to broadcast everywhere
    });
});

server.listen(3001, () => {
    console.log("server is listening on :3001");
})