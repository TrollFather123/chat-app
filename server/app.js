const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
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

  function matrixAdd(matrix) {
    let sum = 0;
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) { 
        sum += matrix[i][j];
      }
    }
    return sum;
  }
  
  console.log(matrixAdd([[5, 1, 6], [8, 2, 4], [3, 7, 9]]));

  function matrixMultiplication(matrix) {
    let sum = 1;
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) { 
        sum *= matrix[i][j];
      }
    }
    return sum;
  }
  
  console.log(matrixMultiplication([[5, 1, 6], [8, 2, 4], [3, 7, 9]]));

module.exports = { app, io };
