// const { io } = require("socket.io-client");

// const socket = io("http://localhost:4000");

// const CHAT_ID = "696f40f82bd4e53614b64616";
// const USER2 = "696e0220f5efd7219cc89aef";

// socket.on("connect", () => {
//   console.log("User2 connected");

//   socket.emit("joinUser", USER2);
// //   socket.emit("joinChat", CHAT_ID);
// });

// socket.on("newMessage", (msg) => {
//   console.log("User2 received:", msg.text);
// });
const { io } = require("socket.io-client");
const socket = io("http://localhost:4000");

const USER1 = "696f40f82bd4e53614b64616"; // user1
const USER2 = "696e0220f5efd7219cc89aef"; // user2

socket.on("connect", () => {
  console.log("User2 connected");

  socket.emit("joinUser", USER2);
});

socket.on("newMessage", (msg) => {
  console.log("User2 received:", msg.text);
});

