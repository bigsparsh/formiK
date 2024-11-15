"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addResponseForQuestion = exports.Question = void 0;
class Question {
    constructor(question_id, options, question, user_id) {
        this.responses = [];
        this.user_id = user_id;
        this.question_id = question_id;
        this.options = options;
        this.question = question;
        this.option_range = options.length - 1;
    }
}
exports.Question = Question;
Question.instances = [];
const addResponseForQuestion = (question_id, option_index, user_id) => {
    Question.instances.forEach((q) => {
        if (q.question_id === question_id)
            if (q.option_range > option_index)
                q.responses.push({
                    option_index,
                    user_id,
                });
    });
};
exports.addResponseForQuestion = addResponseForQuestion;
