"use client";

import {
  LiveFormOutputManager,
  Question,
} from "@/classes/LiveFormOuputManager";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import Toast from "@/components/Toast";
import { useRecoilState } from "recoil";
import { errorAtom } from "@/recoil/atoms";
import { FaCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

const LiveFormPage = ({
  params: { formId },
}: {
  params: {
    formId: string;
  };
}) => {
  const [manager, setManager] = useState<LiveFormOutputManager>();
  const [wsId, setWsId] = useState<string>();
  const [socket, setSocket] = useState<Socket>();
  const [toastVisibility, setToastVisibility] = useState<boolean>(false);
  const [error, setError] = useRecoilState(errorAtom);
  const [question, setQuestion] = useState<Question | null>(null);
  const [check, animate] = useAnimate();
  const [checked, setChecked] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    if (animate && question)
      animate(
        check.current,
        {
          y: checked * 250 + "%",
          scale: [1, 2, 1],
        },
        {
          duration: 0.25,
          ease: "easeInOut",
        },
      );
  }, [animate, check, checked, question]);

  useEffect(() => {
    const skt = io("https://formik-fv7r.onrender.com/");
    skt.on("credentials", (cred: string) => {
      setWsId(cred);
    });
    setSocket(skt);
  }, []);

  useEffect(() => {
    if (!socket || !wsId) return;
    const mngr = new LiveFormOutputManager(
      formId,
      socket,
      wsId,
      setError,
      setQuestion,
      router,
    );
    mngr.getQuestion();
    setManager(mngr);
  }, [formId, router, setError, socket, wsId]);

  useEffect(() => {
    if (error) {
      setToastVisibility(true);
      setTimeout(() => {
        setToastVisibility(false);
      }, 4000);
    }
  }, [error]);

  return (
    <div className="bg-neutral-700 h-full grow overflow-scroll rounded-tl-3xl p-2 md:p-5 flex flex-col items-center relative md:text-base text-sm">
      <AnimatePresence>
        {toastVisibility ? <Toast message={error as string} /> : null}
      </AnimatePresence>
      <h1 className="font-semibold text-lg md:text-2xl text-neutral-50 self-start px-2">
        Live Poll
      </h1>
      <div className="grow w-full grid place-items-center duration-200">
        {question && (
          <motion.div
            className="w-full max-w-md bg-neutral-800/50 rounded-3xl p-2 md:p-5 space-y-2 md:space-y-5 duration-200 text-neutral-100 work"
            initial={{ opacity: 0, filter: "blur(50px)", scale: 0.9 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            layout
          >
            <h1 className="text-lg md:text-2xl font-semibold px-2">
              {question.question}
            </h1>
            <div className="space-y-1 md:space-y-2 relative ">
              <motion.div
                initial={{
                  y: "0%",
                }}
                className="absolute rounded-full left-2 top-2  md:top-2"
                ref={check}
              >
                <FaCircle className="text-[0.80rem] md:text-sm" />
              </motion.div>
              {question.options.map((opt) => {
                return (
                  <div
                    key={crypto.randomUUID()}
                    className="flex bg-neutral-700 w-full gap-3 0 rounded-xl items-center h-full overflow-hidden cursor-pointer text-white"
                    onClick={() => {
                      setChecked(opt.index);
                    }}
                  >
                    <input
                      type="radio"
                      value={opt.index}
                      className="hidden"
                      radioGroup="this"
                      checked={checked === opt.index}
                      onChange={() => { }}
                    />
                    <div className="w-7 h-7 bg-neutral-800/90 "> </div>
                    <label>{opt.value}</label>
                  </div>
                );
              })}
            </div>
            <button
              className="bg-neutral-300 text-neutral-900 rounded-3xl px-3 py-1"
              onClick={() => {
                manager?.sendResponse(checked);
              }}
            >
              Submit
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
export default LiveFormPage;
