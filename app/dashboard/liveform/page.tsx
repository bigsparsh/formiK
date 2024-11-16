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
    setSocket(io(process.env.WEBSOCKET_URL || "ws://localhost:3003"));
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
    <div className="bg-neutral-700 h-full grow overflow-scroll rounded-tl-3xl p-5 flex flex-col items-center">
      <h1
        className="font-semibold text-2xl text-neutral-50 self-start"
        onClick={() => {
          console.log(manager?.options);
        }}
      >
        Create your live Poll
      </h1>
      <div className="grow grid place-items-center h-full w-full">
        {formActive ? (
          <>
            <div className="bg-neutral-600 rounded-3xl border border-neutral-500 w-full max-w-md self-center justify-self-center p-3 flex flex-col gap-2">
              {JSON.stringify(analytics, null, 2)}
              <h1 className="text-2xl font-semibold">{manager?.question}</h1>
              {manager?.options.map((opt) => {
                return (
                  <div
                    key={crypto.randomUUID()}
                    className="flex bg-neutral-700 w-full gap-3 0 rounded-xl items-center h-full overflow-hidden cursor-pointer text-white"
                  >
                    <div className="w-16 h-7 bg-neutral-800/90 rounded-r-xl">
                      {JSON.stringify(analytics, null, 2)}
                    </div>
                    <label>{opt.value}</label>
                  </div>
                );
              })}
            </div>
            <button
              className="bg-neutral-600 rounded-3xl px-5 py-1 text-white font-medium text-sm flex gap-3 items-center hover:scale-105 duration-200 active:scale-100 outline-none"
              onClick={(e) => {
                navigator.clipboard.writeText(
                  (e.target as HTMLDivElement).innerText,
                );
              }}
            >
              {"http://localhost:3000/dashboard/liveform/" +
                manager?.question_id}
              <FaCopy className="text-base" />
            </button>
          </>
        ) : (
          <motion.div
            className="bg-neutral-600 rounded-3xl border border-neutral-500 w-full max-w-md self-center justify-self-center p-3 flex flex-col gap-2"
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
              className="bg-neutral-800 text-neutral-100 rounded-3xl py-1 text-lg font-semibold outline-none focus:ring-2 ring-offset-neutral-600 duration-200 ring-offset-2 ring-neutral-800"
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
