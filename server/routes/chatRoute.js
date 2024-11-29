const express = require("express");
const chatController = require("../controller/chatController")

const router = express.Router();

router.post("/chat/:roomId", chatController.getRoomChat);

module.exports = router;