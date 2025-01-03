"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendAnalyticsToCreator = exports.addResponseForQuestion = exports.Question = void 0;
class Question {
    constructor(question_id, options, question, user_id, user) {
        this.responses = [];
        this.user_id = user_id;
        this.question_id = question_id;
        this.options = options;
        this.question = question;
        this.option_range = options.length;
        this.user = user;
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
const sendAnalyticsToCreator = (question_id) => {
    var _a;
    const analytics = [];
    Question.instances.map((q) => {
        if (q.question_id === question_id) {
            q.options.map((opt) => {
                const percentage = q.responses.filter((r) => r.option_index === opt.index).length /
                    q.responses.length;
                analytics.push({
                    option: opt.index,
                    percentage,
                });
            });
        }
    });
    (_a = Question.instances
        .find((q) => q.question_id === question_id)) === null || _a === void 0 ? void 0 : _a.user.emit("analytics", analytics);
};
exports.sendAnalyticsToCreator = sendAnalyticsToCreator;
