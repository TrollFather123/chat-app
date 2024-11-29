const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const userRouter = require("./routes/userRoute.js");
const chatRouter = require("./routes/chatRoute.js");

dotenv.config({
  path: "./.env",
});

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

const PORT = process.env.PORT || 3030;
const DB = process.env.DATABASE_CONNECTION_STRING;

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", userRouter);
app.use("/api", chatRouter);

app.get("/", (req, res) => {
  res.send("API is running");
});

server.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});

mongoose
  .connect(DB)
  .then(() => {
    console.log("DB is connected");
  })
  .catch((error) => {
    console.error("DB connection error:", error);
  });

module.exports = { app, io };
