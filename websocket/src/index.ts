import express from "express";
const app = express();
import http from "http";
const server = http.createServer(app);
import { Server } from "socket.io";
import { addResponseForQuestion, Question } from "./Question";
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.emit("credentials", socket.id);
  socket.on(
    "create new question",
    (option_range: number, question_id: string) => {
      Question.instances.push(
        new Question(question_id, option_range, socket.id),
      );
    },
  );
  socket.on("user response", (option_index: number, question_id: string) => {
    addResponseForQuestion(question_id, option_index, socket.id);
  });
  socket.on("send broadcast", () => {
    socket.emit("questions", Question.instances);
  });
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
