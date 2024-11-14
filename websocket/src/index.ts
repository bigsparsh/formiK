import express from "express";
const app = express();
import http from "http";
const server = http.createServer(app);
import { Server } from "socket.io";
import { Question } from "./LivePoll";
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.emit("credentials", socket.id);
  socket.on(
    "create newn question",
    (option_range: number, question_id: string) => {
      Question.instances.push(
        new Question(question_id, option_range, socket.id),
      );
    },
  );
  socket.on("user response", (option_index: number, question_id: string) => {
    Question.responses.push({
      user_id: socket.id,
      question_id,
      option_index,
    });
  });
  socket.on("send broadcast", () => {
    socket.emit("questions", Question.getQuestions());
    socket.emit("responses", Question.responses);
  });
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
