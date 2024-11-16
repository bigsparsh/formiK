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

  // Creates a new question
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

  // Adds the respose of the user
  socket.on("user response", (option_index: number, question_id: string) => {
    addResponseForQuestion(question_id, option_index, socket.id);
  });

  // For server debugging
  socket.on("send broadcast", () => {
    socket.emit("questions", Question.instances);
  });

  // For sending a question based on ID
  socket.on("get question", (question_id: string) => {
    socket.emit(
      "get question",
      Question.instances.find((q) => question_id === q.question_id) || null,
    );
  });

  // For sending analytics
  socket.on("send analytics", (question_id: string) => {
    const analytics: {
      option: string;
      percentage: number;
    }[] = [];
    Question.instances.map((q) => {
      if (q.question_id === question_id) {
        q.options.map((opt) => {
          const percentage =
            q.responses.filter((r) => r.option_index === opt.index).length /
            q.responses.length;
          analytics.push({
            option: opt.value,
            percentage,
          });
        });
      }
    });
    socket.emit("analytics", analytics);
  });
});

server.listen(3003, () => {
  console.log("Server is listening on port 3003");
});
