import { createServer } from 'http';
import { Server } from 'socket.io';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// HELL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);

let port = process.env.PORT || 3000;

// app.use(express.static(path.join(__dirname, '/client/dist').replace('/server', ''))); // Adjust the path to your client build directory
// Serve static files from the client/dist directory
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

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

app.get('/app', (req, res) => {
  res.send('GET request to the homepage')
  res.sendFile(path.resolve(__dirname, '..', 'client', 'dist', 'index.html'));
});

httpServer.listen(port, () => {
  console.log(`Listening on port ${port}`);
});