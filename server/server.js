const { io } = require("./app");
const ChatService = require("./services/chatService");

io.on("connection", (socket) => {

  // Join Room
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`${socket.id} joined the room ${roomId}`);
  });

  // Handle received messages
  socket.on("recivedMessages", async (data) => {
    try {
      console.log(data, "incoming");
      const { roomId } = data;

      // Save message to the database
      await ChatService.createMessage(data);

      // Fetch updated messages for the room
      const savedMessages = await ChatService.getMessage(roomId);

      // Emit updated messages to all clients in the room
      io.to(roomId).emit("sendMessages", savedMessages);
    } catch (err) {
      console.error("Error handling received messages:", err);
    }
  });

  // Handle client disconnect
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});
