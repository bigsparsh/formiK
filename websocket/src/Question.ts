export type UserResponse = {
  user_id: string;
  option_index: number;
};
export class Question {
  responses: UserResponse[] = [];
  user_id: string | null;
  question_id: string | null;
  question: string;
  options: {
    value: string;
    index: number;
  }[];
  option_range: number;
  static instances: Question[] = [];

  constructor(
    question_id: string,
    options: {
      value: string;
      index: number;
    }[],
    question: string,
    user_id: string,
  ) {
    this.user_id = user_id;
    this.question_id = question_id;
    this.options = options;
    this.question = question;
    this.option_range = options.length;
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
