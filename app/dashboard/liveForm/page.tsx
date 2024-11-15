"use client";

import { LiveFormManager } from "@/classes/LiveFormManager";
import { liveFormAtom } from "@/recoil/atoms";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const LiveForm = () => {
  const [manager, setManager] = useState<LiveFormManager>();
  const [formJSX, setFormJSX] = useRecoilState<JSX.Element>(liveFormAtom);

  useEffect(() => {
    if (setFormJSX) setManager(new LiveFormManager(setFormJSX));
  }, [setFormJSX]);

  return (
    <div className="bg-neutral-700 h-full grow overflow-scroll rounded-tl-3xl p-5 flex flex-col items-center">
      <h1
        className="font-semibold text-2xl text-neutral-50 self-start"
        onClick={() => {
          console.log(manager?.options);
        }}
      >
        Create your live Poll
      </h1>
      <div className="bg-neutral-600 rounded-3xl border border-neutral-500 w-full max-w-md self-center justify-self-center p-3 flex flex-col gap-2">
        <input
          type="text"
          className="w-full py-1 bg-neutral-700 rounded-full px-5 outline-none focus:ring-4 ring-neutral-700 duration-200 text-white"
          placeholder="Enter the title of the question"
        />
        <div className="flex flex-col gap-1">
          <h1>Options</h1>
          {formJSX}
        </div>
      </div>
    </div>
  );
};
export default LiveForm;
