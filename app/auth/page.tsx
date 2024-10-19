"use client";
import Toast from "@/components/Toast";
import { AnimatePresence } from "framer-motion";
import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaGoogle } from "react-icons/fa";

const Auth = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const params = useSearchParams();
  const [toastVisibility, setToastVisibility] = useState<boolean>(false);
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/dashboard");
    }
  }, [session, router]);

  useEffect(() => {
    if (params.get("msg")) {
      setToastVisibility(true);
      setTimeout(() => {
        setToastVisibility(false);
      }, 4000);
    }
  }, [params]);

  return (
    <div
      className="ma overflow-hidden relative"
      style={{
        background:
          " linear-gradient(#ffffff10 10%, transparent 10%) 0 0/ 15px 15px , linear-gradient(90deg, #ffffff10 10%, transparent 10%) 0 0/ 15px 15px,radial-gradient(circle at 50% 150%,white, gray)",
      }}
    >
      <AnimatePresence>
        {toastVisibility ? (
          <Toast message={params.get("msg") as string} />
        ) : null}
      </AnimatePresence>
      <section className="flex flex-col h-screen">
        <nav className="p-10">
          <h1 className="text-4xl font-semibold tracking-tight text-white">
            formiK
          </h1>
        </nav>
        <div
          className={
            "grow grid place-items-center " +
            (loading ? "pointer-events-none animate-pulse" : "")
          }
        >
          <div className="flex flex-col justify-center relative border border-[gray] bg-[gray]/30 rounded-xl w-full max-w-lg overflow-clip work mb-20">
            <h1 className="font-bold text-3xl text-[gray] bg-white/50 tracking-tight ma px-5 py-3 text-center">
              Enter your credentials
              <span className="text-sm block  tracking-normal font-medium px-1">
                Create a new account or log into existing account
              </span>
            </h1>
            <div className="p-5 flex flex-col text-white text-lg grow">
              <label className=" px-2 font-semibold py-1">
                Email Address:{" "}
              </label>
              <input
                type="email"
                className="border-2 border-white bg-transparent rounded-t-3xl rounded-br-3xl px-3 py-1 outline-none"
                ref={emailRef}
              />
              <button
                className="px-3 py-1 bg-white text-[gray] w-fit self-start rounded-b-2xl font-semibold"
                onClick={() => {
                  if (
                    emailRef.current?.value &&
                    emailRef.current?.value.length > 0
                  ) {
                    signIn("email", {
                      email: emailRef.current.value,
                    });
                    setLoading(true);
                  }
                }}
              >
                Continue
              </button>
            </div>
            <div className="px-5 flex gap-3 justify-center items-center text-white">
              <hr className="w-full" />
              <p>OR</p>
              <hr className="w-full" />
            </div>
            <button
              className=" px-5 py-2 bg-white rounded-3xl m-5 text-lg flex items-center gap-3 text-[gray] w-fit self-center"
              onClick={() => {
                signIn("google");
                setLoading(true);
              }}
            >
              <FaGoogle />
              <p>Continue with Google</p>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Auth;
