import HoveringCheckbox from "@/components/HoveringCheckbox";
import SpecialButton from "@/components/SpecialButton";
import Link from "next/link";

const Landing = () => {
  return (
    <div
      className="ma"
      style={{
        background:
          " linear-gradient(#ffffff10 10%, transparent 10%) 0 0/ 15px 15px , linear-gradient(90deg, #ffffff10 10%, transparent 10%) 0 0/ 15px 15px,radial-gradient(circle at 50% 150%,white, gray)",
      }}
    >
      <div className="flex flex-col h-screen">
        <nav className="p-10 flex justify-between">
          <h1 className="text-4xl font-semibold tracking-tight text-white">
            formiK
          </h1>
          <Link
            className="bg-neutral-700 px-5 py-2 rounded-full font-semibold border-2 border-white/50"
            href="/auth"
          >
            Login or Register
          </Link>
        </nav>
        <div className="grow flex flex-col items-center justify-center relative">
          <HoveringCheckbox positions="top-10 right-48">
            <input
              type="checkbox"
              className="accent-[gray] outline-none h-5 w-5 rounded-[50%]"
            />
            <label className="flow">Check future</label>
          </HoveringCheckbox>
          <HoveringCheckbox positions="bottom-60 left-48 flow">
            <div className="flex flex-col">
              <label>Enter name: </label>
              <input
                type="text"
                // value="hello hi how are ?"
                className="border-4 border-white bg-transparent rounded-xl text-center outline-none"
              />
              <label>Enter gender:</label>
              <div className="flex gap-3 items-center">
                <input
                  type="radio"
                  className="accent-[gray] outline-none h-5 w-5 rounded-[50%]"
                />
                <label className="pb-1">Male Woman</label>
              </div>
              <div className="flex gap-3 items-center">
                <input
                  type="radio"
                  className="accent-[gray] outline-none h-5 w-5 rounded-[50%]"
                />
                <label className="pb-1">Female man</label>
              </div>
            </div>
          </HoveringCheckbox>
          <div className="flex flex-col gap-5 mb-48">
            <h1 className="font-semibold text-5xl text-center text-white mix-blend-difference ">
              Ask the right questions and reach <br />
              concensus with formiK
            </h1>
            <SpecialButton
              options={[
                "Checkboxes",
                "Radio Buttons",
                "Dropdowns",
                "Images",
                "Links",
                "Text",
              ]}
              className="text-2xl font-semibold mix-blend-difference opacity-75"
            >
              Build a form with
            </SpecialButton>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Landing;