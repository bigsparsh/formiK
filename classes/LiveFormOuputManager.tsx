import { Dispatch, SetStateAction } from "react";
import { SetterOrUpdater } from "recoil";
import { Socket } from "socket.io-client";

export type Question = {
  question: string;
  question_id: string;
  options: {
    index: number;
    value: string;
  }[];
};

export class LiveFormOutputManager {
  question_id: string;
  socket: Socket;
  user_id: string;
  question: Question | null = null;
  setError: SetterOrUpdater<string | null>;
  setQuestion: Dispatch<SetStateAction<Question | null>>;

  constructor(
    question_id: string,
    socket: Socket,
    user_id: string,
    setError: SetterOrUpdater<string | null>,
    setQuestion: Dispatch<SetStateAction<Question | null>>,
  ) {
    this.question_id = question_id;
    this.socket = socket;
    this.setQuestion = setQuestion;
    this.user_id = user_id;
    this.setError = setError;
    this.getQuestion();
  }

  getQuestion() {
    this.socket.emit("get question", this.question_id);
    this.socket.on("get question", (question: Question | null) => {
      if (!question) {
        this.setError("No question of id " + this.question_id + " found");
      }
      this.setQuestion(question);
      this.question = question;
    });
  }
}
