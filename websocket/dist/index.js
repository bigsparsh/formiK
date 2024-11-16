"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const Question_1 = require("./Question");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
io.on("connection", (socket) => {
    socket.emit("credentials", socket.id);
    // Creates a new question
    socket.on("create new question", (options, question_id, question) => {
        Question_1.Question.instances.push(new Question_1.Question(question_id, options, question, socket.id));
    });
    // Adds the respose of the user
    socket.on("user response", (option_index, question_id) => {
        (0, Question_1.addResponseForQuestion)(question_id, option_index, socket.id);
    });
    // For server debugging
    socket.on("send broadcast", () => {
        socket.emit("questions", Question_1.Question.instances);
    });
    // For sending a question based on ID
    socket.on("get question", (question_id) => {
        socket.emit("get question", Question_1.Question.instances.find((q) => question_id === q.question_id) || null);
    });
});
server.listen(3003, () => {
    console.log("Server is listening on port 3003");
});
