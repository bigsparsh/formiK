export type UserResponse = {
  user_id: string;
  option_index: number;
  question_id: string;
};
export class Question {
  static responses: UserResponse[] = [];
  user_id: string | null;
  question_id: string | null;
  option_range: number | null;
  static instances: Question[];

  constructor(question_id: string, option_range: number, user_id: string) {
    this.user_id = user_id;
    this.question_id = question_id;
    this.option_range = option_range;
  }

  static getQuestions() {
    return this.instances;
  }

  static addUserResponse(userResponse: UserResponse) {
    this.responses.push(userResponse);
  }
}
