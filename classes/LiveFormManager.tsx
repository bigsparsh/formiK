import LiveFormOptions from "@/components/LiveFormOptions";
import { FaPlus, FaTrash } from "react-icons/fa";
import { SetterOrUpdater } from "recoil";

export type LiveOption = {
  index: number;
  value: string;
};
export class LiveFormManager {
  options: LiveOption[] = [];
  formJSX: JSX.Element[] = [];
  setter: SetterOrUpdater<JSX.Element>;

  constructor(setFormJSX: SetterOrUpdater<JSX.Element>) {
    this.options.push({ index: 0, value: "" }, { index: 1, value: "" });
    this.setter = setFormJSX;
    this.generateFrontend();
  }

  generateFrontend() {
    this.formJSX = [];
    this.options.map((opt) => {
      this.formJSX.push(
        <LiveFormOptions manager={this} opt={opt}></LiveFormOptions>,
        // <div key={crypto.randomUUID()} className="flex group gap-2">
        //   <input
        //     className="w-1/2 py-1 bg-neutral-700 rounded-full px-5 outline-none focus:ring-4 ring-neutral-700 duration-200 text-white"
        //     name={opt.index.toString()}
        //     type="text"
        //     placeholder={"Option " + opt.index}
        //     onChange={(e) => {
        //       this.handleTextChange(opt.index, e.target.value);
        //     }}
        //   />
        //   <div className="group-hover:flex hidden text-white gap-2">
        //     <button onClick={() => this.handleAddOption(opt.index)}>
        //       <FaPlus />
        //     </button>
        //     <button onClick={() => this.handleRemoveOption(opt.index)}>
        //       <FaTrash />
        //     </button>
        //   </div>
        // </div>,
      );
    });
    this.setter(<>{this.formJSX}</>);
  }
}
