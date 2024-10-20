"use client";
import { useRef, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

const OptionField = ({ id }: { id: number }) => {
  const [fieldState, setFieldState] = useState({});
  const requiredRef = useRef<HTMLInputElement>(null);

  return (
    <div className="w-full flex flex-col bg-neutral-600 rounded-3xl overflow-hidden p-3 work gap-3 text-white">
      <input
        type="text"
        className="w-full py-2 bg-neutral-700 rounded-full px-5"
        placeholder="Enter the title of the field"
      />
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-2">
          {
            <div className="flex gap-3" key={crypto.randomUUID()}>
              <div className="flex">
                <p className="bg-neutral-800 grid place-items-center w-[4ch] h-full rounded-l-xl">
                  {
                    id
                    // index + 1
                  }
                </p>
                <input
                  type="text"
                  className="w-full py-1 bg-neutral-700 rounded-r-xl px-5"
                  placeholder={"Option"}
                />
              </div>
              <div className="flex">
                <button
                  className="bg-neutral-700 w-9 h-full rounded-l-xl grid place-items-center"
                  onClick={() => {
                    // handleDeleteOption(index);
                  }}
                >
                  <FaTrash />
                </button>
                <button
                  className="bg-neutral-800 w-9 h-full rounded-r-xl grid place-items-center"
                  onClick={() => {
                    // handleAddOption(opt.index);
                  }}
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          }
        </div>
        <div className="basis-1/4 self-end py-2 px-4 bg-neutral-700 rounded-xl flex flex-col gap-1">
          <div>
            <label className="font-medium px-2">
              Enter the number of options:
            </label>
            <input
              type="range"
              min={2}
              max={6}
              className="w-full py-2 bg-neutral-700 rounded-full px-5 accent-neutral-700 outline-none"
            // ref={numOption}
            />
          </div>
          <div className="flex gap-3 items-center">
            <input type="checkbox" className="hidden" ref={requiredRef} />
            <button
              className="hover:cursor-pointer rounded-xl px-3 py-1 border border-neutral-600 box-border"
              onClick={(e) => {
                if (requiredRef.current)
                  if (requiredRef.current?.checked) {
                    requiredRef.current.checked = false;
                    (e.target as HTMLButtonElement).className =
                      "hover:cursor-pointer rounded-xl px-3 py-1 border border-neutral-600";
                  } else {
                    requiredRef.current.checked = true;
                    (e.target as HTMLButtonElement).className =
                      "hover:cursor-pointer rounded-xl px-3 py-1 bg-neutral-600 border";
                  }
              }}
            >
              Field Required
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OptionField;
