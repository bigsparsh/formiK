export type UserResponse = {
  user_id: string;
  option_index: number;
};
export class Question {
  responses: UserResponse[] = [];
  user_id: string | null;
  question_id: string | null;
  option_range: number | null;
  static instances: Question[] = [];

  constructor(question_id: string, option_range: number, user_id: string) {
    this.user_id = user_id;
    this.question_id = question_id;
    this.option_range = option_range;
  }
}

export const addResponseForQuestion = (
  question_id: string,
  option_index: number,
  user_id: string,
) => {
  Question.instances.forEach((q) => {
    if (q.question_id === question_id)
      if ((q.option_range as number) > option_index)
        q.responses.push({
          option_index,
          user_id,
        });
  });
};
