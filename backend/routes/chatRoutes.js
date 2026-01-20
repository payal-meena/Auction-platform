const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware.js");

const {
  getHistory,
  getStatus,
} = require("../controllers/chatController");


router.get("/:chatId/messages", protect, getHistory);

router.get("/:chatId", protect, getStatus);

module.exports = router;
