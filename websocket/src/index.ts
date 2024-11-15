import express from "express";
import http from "http";
import { Server } from "socket.io";
import { addResponseForQuestion, Question } from "./Question";
const app = express();
const server = http.createServer(app);

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
    (
      options: {
        value: string;
        index: number;
      }[],
      question_id: string,
      question: string,
    ) => {
      Question.instances.push(
        new Question(question_id, options, question, socket.id),
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

server.listen(3003, () => {
  console.log("Server is listening on port 3003");
});
