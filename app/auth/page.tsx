import { FaGoogle } from "react-icons/fa";

const Auth = () => {
  return (
    <div
      className="ma"
      style={{
        background:
          " linear-gradient(#ffffff10 10%, transparent 10%) 0 0/ 15px 15px , linear-gradient(90deg, #ffffff10 10%, transparent 10%) 0 0/ 15px 15px,radial-gradient(circle at 50% 150%,white, gray)",
      }}
    >
      <section className="flex flex-col h-screen">
        <nav className="p-10">
          <h1 className="text-4xl font-semibold tracking-tight text-white">
            formiK
          </h1>
        </nav>
        <div className="grow grid place-items-center">
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
                type="text"
                className="border-2 border-white bg-transparent rounded-t-3xl rounded-br-3xl px-3 py-1 outline-none"
              />
              <button className="px-3 py-1 bg-white text-[gray] w-fit self-start rounded-b-2xl font-semibold">
                Continue
              </button>
            </div>
            <div className="px-5 flex gap-3 justify-center items-center text-white">
              <hr className="w-full" />
              <p>OR</p>
              <hr className="w-full" />
            </div>
            <div className=" px-5 py-2 bg-white rounded-3xl m-5 text-lg flex items-center gap-3 text-[gray] w-fit self-center">
              <FaGoogle />
              <p>Continue with Google</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Auth;
