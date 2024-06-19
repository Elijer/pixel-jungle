import { createServer } from 'http';
import { Server } from 'socket.io';

const httpServer = createServer();

console.log("server started");

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("Websocket connected", socket.id);

  socket.on("message", (msg) => {
    console.log("Message received:", msg);
    io.emit("hi", msg + " -> signed by server");
  });
});

httpServer.listen(3000, () => {
  console.log("Listening on port 3000");
});