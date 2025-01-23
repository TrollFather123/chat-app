const { io } = require("./app");
const ChatService = require("./services/chatService");

io.on("connection", (socket) => {
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`${socket.id} joined the room ${roomId}`);
  });

  socket.on("markAsRead", async (msgId,roomId) => {
    const readMessages = await ChatService.findMessageById(msgId);
    // console.log(readMessages,"readMessages")
    io.to(roomId).emit("readMessages", readMessages);
  });

  socket.on("recivedMessages", async (data) => {
    try {
      const { roomId } = data;

      await ChatService.createMessage(data);

      const savedMessages = await ChatService.getMessage(roomId);

      io.to(roomId).emit("sendMessages", savedMessages);
    } catch (err) {
      console.error("Error handling received messages:", err);
    }
  });

 
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});
