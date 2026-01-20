// const { io } = require("socket.io-client");

// const socket = io("http://localhost:4000");

// const CHAT_ID = "696f40f82bd4e53614b64617";
// const USER1 = "696f40f82bd4e53614b64616";
// const USER2 = "696e0220f5efd7219cc89aef";

// socket.on("connect", () => {
//   console.log("User1 connected");

//   socket.emit("joinUser", USER1);
// //   socket.emit("joinChat", USER2);

//   setTimeout(() => {
//     socket.emit("sendMessage", {
//     //   chatId: CHAT_ID,
//       senderId: USER1,
//       receiverId: USER2,
//       text: "Hello from User1 👋",
//     });
//   }, 2000);
// });

// socket.on("newMessage", (msg) => {
//   console.log("User1 received:", msg.text);
// });
const { io } = require("socket.io-client");
const socket = io("http://localhost:4000");

const USER1 = "696f40f82bd4e53614b64616"; // real user1 _id
const USER2 = "696e0220f5efd7219cc89aef"; // real user2 _id

socket.on("connect", () => {
  console.log("User1 connected");

  socket.emit("joinUser", USER1);

  // test: message send after 2 sec
  setTimeout(() => {
  socket.emit("sendMessage", {
    senderId: "696f40f82bd4e53614b64616",   // User1
    receiverId: "696e0220f5efd7219cc89aef", // User2
    text: "Hello from User1 👋"
  });
}, 2000);

});

socket.on("newMessage", (msg) => {
  console.log("User1 received:", msg.text);
});
