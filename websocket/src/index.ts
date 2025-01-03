import express from "express";
import http from "http";
import { Server } from "socket.io";
import {
  addResponseForQuestion,
  Question,
  sendAnalyticsToCreator,
} from "./Question";
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let myInterval: ReturnType<typeof setInterval>;

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
        new Question(question_id, options, question, socket.id, socket),
      );
    },
  );

  // Adds the respose of the user
  socket.on("user response", (option_index: number, question_id: string) => {
    addResponseForQuestion(question_id, option_index, socket.id);
    sendAnalyticsToCreator(question_id);
  });

  // For server debugging
  socket.on("send broadcast", () => {
    socket.emit(
      "questions",
      Question.instances.map((ele) => {
        return {
          question_id: ele.question_id,
          question: ele.question,
          options: ele.options,
          responses: ele.responses,
          user_id: ele.user_id,
          option_range: ele.option_range,
        };
      }),
    );
  });

  // For sending a question based on ID
  socket.on("get question", (question_id: string) => {
    socket.emit(
      "get question",
      Question.instances
        .map((ele) => {
          return {
            question_id: ele.question_id,
            question: ele.question,
            options: ele.options,
            responses: ele.responses,
            user_id: ele.user_id,
            option_range: ele.option_range,
          };
        })
        .find((q) => question_id === q.question_id) || null,
    );
  });

  // For sending analytics
  socket.on("send analytics", (question_id: string) => {
    const analytics: {
      option: number;
      percentage: number;
    }[] = [];
    Question.instances.map((q) => {
      if (q.question_id === question_id) {
        q.options.map((opt) => {
          const percentage =
            q.responses.filter((r) => r.option_index === opt.index).length /
            q.responses.length;
          analytics.push({
            option: opt.index,
            percentage,
          });
        });
      }
    });
    socket.emit("analytics", analytics);
  });

  socket.on("fun", (question_id: string, option_range: number) => {
    myInterval = setInterval(() => {
      addResponseForQuestion(
        question_id,
        Math.round(Math.random() * option_range),
        socket.id,
      );
    }, 100);
  });
  socket.on("end fun", () => {
    clearInterval(myInterval);
  });
});

server.listen(3003, () => {
  console.log("Server is listening on port 3003");
});
