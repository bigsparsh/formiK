"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer(app);
const socket_io_1 = require("socket.io");
const Question_1 = require("./Question");
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
io.on("connection", (socket) => {
    socket.emit("credentials", socket.id);
    socket.on("create new question", (option_range, question_id) => {
        Question_1.Question.instances.push(new Question_1.Question(question_id, option_range, socket.id));
    });
    socket.on("user response", (option_index, question_id) => {
        (0, Question_1.addResponseForQuestion)(question_id, option_index, socket.id);
    });
    socket.on("send broadcast", () => {
        socket.emit("questions", Question_1.Question.instances);
    });
});
server.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
