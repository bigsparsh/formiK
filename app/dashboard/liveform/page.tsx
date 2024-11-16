"use client";

import { LiveFormInputManager } from "@/classes/LiveFormInputManager";
import { liveFormAtom } from "@/recoil/atoms";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { io, Socket } from "socket.io-client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaCopy } from "react-icons/fa";
import { Analytics } from "@/classes/LiveFormInputManager";

const LiveForm = () => {
  const [manager, setManager] = useState<LiveFormInputManager>();
  const [formJSX, setFormJSX] = useRecoilState<JSX.Element>(liveFormAtom);
  const [socket, setSocket] = useState<Socket>();
  const [wsId, setWsIs] = useState<string>();
  const [formActive, setFormActive] = useState<boolean>(false);
  const [analytics, setAnalytics] = useState<Analytics[]>([]);
  const router = useRouter();

  useEffect(() => {
    setSocket(io("https://formik-fv7r.onrender.com/"));
  }, []);
  useEffect(() => {
    if (!socket) return;
    socket.on("credentials", (cred: string) => {
      setWsIs(() => cred);
    });
  }, [socket]);
  useEffect(() => {
    if (setFormJSX && socket) {
      setManager(
        new LiveFormInputManager(
          setFormJSX,
          socket,
          wsId as string,
          router,
          setFormActive,
          setAnalytics,
        ),
      );
    }
  }, [router, setFormJSX, socket, wsId]);

  return (
    <div className="bg-neutral-700 h-full grow overflow-scroll rounded-tl-3xl p-2 md:p-5 flex flex-col items-center">
      <h1 className="font-semibold text-lg md:text-2xl text-neutral-50 self-start px-3">
        Create your live Poll
      </h1>
      <div className="grow grid place-items-center h-full w-full">
        {formActive ? (
          <>
            <div className="bg-neutral-600 rounded-3xl border border-neutral-500 w-full max-w-md self-center justify-self-center p-2 md:p-3 flex flex-col gap-1 md:gap-2 text-neutral-100 md:text-base text-sm">
              <h1 className="text-lg md:text-2xl font-semibold px-2">
                {manager?.question}
              </h1>
              {analytics &&
                manager?.options.map((opt) => {
                  const percentage = analytics[opt.index]?.percentage;

                  return (
                    <div
                      className="pb-1 rounded-3xl overflow-clip relative"
                      key={crypto.randomUUID()}
                    >
                      <div className="flex bg-neutral-700 w-full gap-2 md:gap-3 rounded-xl items-center h-full overflow-hidden cursor-pointer text-white z-50">
                        <div className="w-16 h-7 bg-neutral-800/90 rounded-r-3xl text-white font-semibold grid place-items-center">
                          {Math.round((percentage as number) * 100)} %
                        </div>
                        <label className="text-white">{opt.value}</label>
                      </div>

                      <motion.div
                        className="absolute bg-neutral-500 rounded-3xl h-1 z-0 bottom-0 duration-300"
                        style={{ width: `${(percentage as number) * 100}%` }}
                        layout
                      />
                    </div>
                  );
                })}
            </div>
            <button
              className="bg-neutral-600 rounded-3xl px-3 md:px-5 py-1 text-white font-medium text-xs md:text-sm flex gap-3 items-center hover:scale-105 duration-200 active:scale-100 outline-none"
              onClick={() => {
                navigator.clipboard.writeText(
                  "https://formik.bigsparsh.com/dashboard/liveform/" +
                  manager?.question_id,
                );
              }}
            >
              Copy link for sharing
              <FaCopy className="text-base" />
            </button>
          </>
        ) : (
          <motion.div
            className="bg-neutral-600 rounded-3xl border border-neutral-500 w-full max-w-md self-center justify-self-center p-2 md:p-3 flex flex-col gap-2 md:text-base text-sm"
            layout
          >
            <input
              type="text"
              className="w-full py-1 bg-neutral-700 rounded-full px-5 outline-none focus:ring-4 ring-neutral-700 duration-200 text-white work"
              placeholder="Enter the title of the question"
              onChange={(e) => {
                manager?.updateQuestion(e.target.value);
              }}
            />
            <div className="flex flex-col gap-1 work duration-200">
              {formJSX}
            </div>
            <button
              className="bg-neutral-800 text-neutral-100 rounded-3xl py-1 text-base md:text-lg font-semibold outline-none focus:ring-2 ring-offset-neutral-600 duration-200 ring-offset-2 ring-neutral-800"
              onClick={() => manager?.startPoll()}
            >
              Start a live poll
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
export default LiveForm;
