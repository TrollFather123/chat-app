const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
  },
  senderId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  read:{
    type:Boolean,
    default:false
  }
},{
    timestamps:true
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;

