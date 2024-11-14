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
const LivePoll_1 = require("./LivePoll");
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
    },
});
io.on("connection", (socket) => {
    socket.emit("credentials", socket.id);
    socket.on("create newn question", (option_range, question_id) => {
        LivePoll_1.Question.instances.push(new LivePoll_1.Question(question_id, option_range, socket.id));
    });
    socket.on("user response", (option_index, question_id) => {
        LivePoll_1.Question.responses.push({
            user_id: socket.id,
            question_id,
            option_index,
        });
    });
    socket.on("send broadcast", () => {
        socket.emit("questions", LivePoll_1.Question.getQuestions());
        socket.emit("responses", LivePoll_1.Question.responses);
    });
});
server.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
