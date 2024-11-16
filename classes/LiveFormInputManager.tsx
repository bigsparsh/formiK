import LiveFormOptions from "@/components/LiveFormOptions";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Play } from "next/font/google";
import { Dispatch, SetStateAction } from "react";
import { SetterOrUpdater } from "recoil";
import { Socket } from "socket.io-client";

export type LiveOption = {
  index: number;
  value: string;
};

export type Analytics = {
  index: number;
  percentage: number;
};
export class LiveFormInputManager {
  options: LiveOption[] = [];
  formJSX: JSX.Element[] = [];
  setter: SetterOrUpdater<JSX.Element>;
  socket: Socket;
  user_id: string;
  question: string;
  question_id: string;
  router: AppRouterInstance;
  setFormActive: Dispatch<SetStateAction<boolean>>;
  setAnalytics: Dispatch<SetStateAction<Analytics[]>>;

  constructor(
    setFormJSX: SetterOrUpdater<JSX.Element>,
    socket: Socket,
    user_id: string,
    router: AppRouterInstance,
    setFormActive: Dispatch<SetStateAction<boolean>>,
    setAnalytics: Dispatch<SetStateAction<Analytics[]>>,
  ) {
    this.options.push({ index: 0, value: "" }, { index: 1, value: "" });
    this.setter = setFormJSX;
    this.socket = socket;
    this.user_id = user_id;
    this.router = router;
    this.question = "";
    this.setFormActive = setFormActive;
    this.setAnalytics = setAnalytics;
    this.question_id = crypto.randomUUID();
    this.generateFrontend();
  }

  startPoll() {
    this.socket.emit(
      "create new question",
      this.options,
      this.question_id,
      this.question,
    );
    this.setFormActive(true);

    this.socket.on("analytics", (alts: Analytics[]) => {
      this.setAnalytics(alts);
    });
    setInterval(() => {
      this.socket.emit("send analytics", this.question_id);
    }, 100);
  }

  updateQuestion(text: string) {
    this.question = text;
  }

  generateFrontend() {
    this.formJSX = [];
    this.options.map((opt) => {
      this.formJSX.push(
        <LiveFormOptions
          key={crypto.randomUUID()}
          manager={this}
          opt={opt}
        ></LiveFormOptions>,
      );
    });
    this.setter(<>{this.formJSX}</>);
  }
}
