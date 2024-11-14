"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
class Question {
    constructor(question_id, option_range, user_id) {
        this.user_id = user_id;
        this.question_id = question_id;
        this.option_range = option_range;
    }
    static getQuestions() {
        return this.instances;
    }
    static addUserResponse(userResponse) {
        this.responses.push(userResponse);
    }
}
exports.Question = Question;
Question.responses = [];
