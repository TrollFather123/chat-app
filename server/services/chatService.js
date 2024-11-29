const Chat = require("../models/chatModel");

class ChatService {
  static async createMessage(data) {
    try {

        console.log(data)
      const message = await Chat.create(data);

      return message;
    } catch (error) {
      throw new Error("Error saving message: " + error.message);
    }
  }


  static async getMessage(roomId) {
    try {
      const messages = await Chat.find({roomId}).sort({timestamp: 1})

      return messages;
    } catch (error) {
      throw new Error("Error fetching messages: " + error.message);
    }
  }
}


module.exports = ChatService