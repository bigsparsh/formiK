import LiveFormOptions from "@/components/LiveFormOptions";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";
import { SetterOrUpdater } from "recoil";
import { Socket } from "socket.io-client";

export type LiveOption = {
  index: number;
  value: string;
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

  constructor(
    setFormJSX: SetterOrUpdater<JSX.Element>,
    socket: Socket,
    user_id: string,
    router: AppRouterInstance,
    setFormActive: Dispatch<SetStateAction<boolean>>,
  ) {
    this.options.push({ index: 0, value: "" }, { index: 1, value: "" });
    this.setter = setFormJSX;
    this.socket = socket;
    this.user_id = user_id;
    this.router = router;
    this.question = "";
    this.setFormActive = setFormActive;
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
    // this.router.push("dashboard/liveform/" + this.question_id);
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
