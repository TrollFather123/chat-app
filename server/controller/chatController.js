const ChatService = require("../services/chatService");


const getRoomChat = async (req, res) => {
  try {

    const {roomId} = req.params
    const chats = await ChatService.getMessage(roomId)
    res.status(200).json({
      status: 200,
      message: "chat fetched successfully",
      data: chats,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err?.message,
    });
  }
};

const chatController = {
    getRoomChat,
};

module.exports = chatController;
