import { LiveFormManager } from "@/classes/LiveFormManager";
import { FaPlus, FaTrash } from "react-icons/fa";

const LiveFormOptions = ({
  manager,
  opt,
}: {
  manager: LiveFormManager;
  opt: {
    value: string;
    index: number;
  };
}) => {
  const handleAddOption = (index: number) => {
    manager.options = [
      ...manager.options.filter((opt) => opt.index <= index),
      {
        index: index + 1,
        value: "",
      },
      ...manager.options
        .filter((opt) => index < opt.index)
        .map((opt) => ({ index: opt.index + 1, value: opt.value })),
    ];
    manager.generateFrontend();
  };

  const handleRemoveOption = (index: number) => {
    if (manager.options.length == 2) return;
    manager.options = [
      ...manager.options.filter((opt) => opt.index < index),
      ...manager.options
        .filter((opt) => opt.index > index)
        .map((opt) => ({ value: opt.value, index: opt.index - 1 })),
    ];
    manager.generateFrontend();
  };

  const handleTextChange = (index: number, text: string) => {
    manager.options = manager.options.map((opt) => {
      if (opt.index === index) {
        return {
          index,
          value: text,
        };
      }
      return opt;
    });
  };
  return (
    <div key={crypto.randomUUID()} className="flex group gap-2">
      <input
        className="w-1/2 py-1 bg-neutral-700 rounded-full px-5 outline-none focus:ring-4 ring-neutral-700 duration-200 text-white"
        name={opt.index.toString()}
        type="text"
        placeholder={"Option " + opt.index}
        onChange={(e) => {
          handleTextChange(opt.index, e.target.value);
        }}
        defaultValue={opt.value}
      />
      <div className="group-hover:flex hidden text-white gap-2">
        <button onClick={() => handleAddOption(opt.index)}>
          <FaPlus />
        </button>
        <button onClick={() => handleRemoveOption(opt.index)}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
};
export default LiveFormOptions;
