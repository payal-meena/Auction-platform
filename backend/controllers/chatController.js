const Chat = require("../models/Chat.js")
const Message = require("../models/Message.js")

const getHistory = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user; 

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

   
    if (!chat.participants.includes(userId)) {
      return res.status(403).json({ message: "Not authorized to view this chat" });
    }

    const messages = await Message.find({ chat: chatId })
      .populate("sender", "name email")
      .sort({ createdAt: 1 }); 

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const getStatus = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user;

    const chat = await Chat.findById(chatId)
      .populate("participants", "name email");

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    
    const isParticipant = chat.participants.some(
      (p) => p._id.toString() === userId
    );

    if (!isParticipant) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};



module.exports = {
  getHistory,
  getStatus,
};
