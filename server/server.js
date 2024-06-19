import { createServer } from 'http';
import { Server } from 'socket.io';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// ES modules compatible way to get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);

let port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '/client/dist')).replace('/server', '')); // Adjust the path to your client build directory

console.log("server started");

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on("connection", (socket) => {
  console.log("Websocket connected", socket.id);

  socket.on("message", (msg) => {
    console.log("Message received:", msg);
    io.emit("hi", msg + " -> signed by server");
  });
});

// Serve the client HTML file for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html')); // Adjust the path to your index.html
});

httpServer.listen(port, () => {
  console.log(`Listening on port ${port}`);
});