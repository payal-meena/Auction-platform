const Chat = require("../models/Chat");
const Message = require("../models/Message");
const mongoose = require("mongoose");

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    // Join user room
    socket.on("joinUser", (userId) => {
      if (!mongoose.Types.ObjectId.isValid(userId)) return;
      socket.join(userId);
      console.log(`User joined user-room: ${userId}`);
    });

    // Join chat room
    socket.on("joinChat", (chatId) => {
      if (!mongoose.Types.ObjectId.isValid(chatId)) return;
      socket.join(chatId);
      console.log(`User joined chat-room: ${chatId}`);
    });

    // Send message
    socket.on("sendMessage", async (data) => {
      try {
        let { chatId, senderId, receiverId, text, request } = data;

        // Validate essential fields
        if (
          !senderId ||
          !receiverId ||
          !text ||
          !mongoose.Types.ObjectId.isValid(senderId) ||
          !mongoose.Types.ObjectId.isValid(receiverId)
        ) {
          return console.log("Invalid message data", data);
        }

        // Create new chat if chatId missing/invalid
        // if (!chatId || !mongoose.Types.ObjectId.isValid(chatId)) {
        //   const newChat = await Chat.create({
        //     request: request
        //       ? mongoose.Types.ObjectId(request)
        //       : mongoose.Types.ObjectId(), // auto-generate if missing
        //     participants: [senderId, receiverId],
        //     lastMessage: text,
        //     lastMessageAt: new Date(),
        //   });
        //   chatId = newChat._id.toString();
        // }
        if (!chatId || !mongoose.Types.ObjectId.isValid(chatId)) {
  const newChat = await Chat.create({
    request: request
      ? new mongoose.Types.ObjectId(request)  // ✅ use new
      : new mongoose.Types.ObjectId(),       // ✅ use new
    participants: [senderId, receiverId],
    lastMessage: text,
    lastMessageAt: new Date(),
  });
  chatId = newChat._id.toString();
}


        // Save message
        const message = await Message.create({
          chat: chatId,
          sender: senderId,
          text,
        });

        // Update chat
        await Chat.findByIdAndUpdate(chatId, {
          lastMessage: text,
          lastMessageAt: new Date(),
        });

        // Emit message to chat room
        io.to(chatId).emit("newMessage", message);
      } catch (error) {
        console.error("Socket message error:", error.message);
      }
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
};

module.exports = socketHandler;
