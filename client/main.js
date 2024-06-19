import { io } from "socket.io-client";
import { v4 as uuidv4 } from 'uuid';

const playerId = () => localStorage.getItem('playerId') || localStorage.setItem('playerId', uuidv4())

// let port = process.env.PORT ? process.env.PORT : '3000'
// let baseURL = process.env.PROD ? 'https://saskanupe-b0a033b8892a.herokuapp.com/' : "localhost"
// let socketAddress = `ws://${baseURL}:${port}`
// if (process.env.BASE_URL && process.env.PORT){
//   socketAddress = `ws://${process.env.BASE_URL}:${port}`
//   console.log(`Attempting to connect to ${socketAddress}`)
// }

const socketAddress = "ws://localhost:3000"
if (window.location.hostname !== "localhost"){
  socketAddress = "https://saskanupe-b0a033b8892a.herokuapp.com/"
}

const  socket = io(socketAddress)

const app = document.getElementById("app")

socket.on("connect", () => {
  console.log("Connected")
  socket.emit("player joined", playerId())

  const button = document.getElementById("send")
  button.addEventListener("click", () => {
    console.log("button pressed")
    socket.emit("message", `Hello from the client ${uuidv4()}`)
  })
});

socket.on("hi", (msg) => {
  const newDiv = document.createElement("div");
  newDiv.innerHTML = `<p>${msg}</p>`;
  app.appendChild(newDiv);
})