import HoveringCheckbox from "@/components/HoveringCheckbox";
import NavBar from "@/components/NavBar";
import SpecialButton from "@/components/SpecialButton";

const Landing = () => {
  return (
    <div
      className="ma overflow-clip"
      style={{
        background:
          " linear-gradient(#ffffff10 10%, transparent 10%) 0 0/ 15px 15px , linear-gradient(90deg, #ffffff10 10%, transparent 10%) 0 0/ 15px 15px,radial-gradient(circle at 50% 150%,white, gray)",
      }}
    >
      <div className="flex flex-col h-screen">
        <NavBar />
        <div className="grow flex flex-col items-center justify-center relative">
          <HoveringCheckbox
            delay={0.4}
            positions="top-36 md:top-20 xl:top-10 right-7 md:right-36 xl:right-48 flow text-neutral-100"
          >
            <input
              type="checkbox"
              className="accent-neutral-500 outline-none w-4 h-4 xl:h-5 xl:w-5 rounded-[50%]"
            />
            <label className="flow">Check future</label>
          </HoveringCheckbox>
          <HoveringCheckbox
            delay={0}
            positions="bottom-60 left-7 md:left-28 xl:left-48 flow text-neutral-100"
          >
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
                  className="accent-neutral-500 outline-none w-4 h-4 xl:h-5 xl:w-5 rounded-[50%]"
                />
                <label className="pb-1">Male Woman</label>
              </div>
              <div className="flex gap-3 items-center">
                <input
                  type="radio"
                  className="accent-neutral-500 outline-none w-4 h-4 xl:h-5 xl:w-5 rounded-[50%]"
                />
                <label className="pb-1">Female man</label>
              </div>
            </div>
          </HoveringCheckbox>
          <div className="flex flex-col gap-2 md:gap-3 xl:gap-5 mb-48 relative">
            <div className="absolute h-[120%] -translate-x-16 translate-y-[-1rem] w-[120%] top-0 blur-3xl z-20 backdrop-blur-lg rounded-full" />
            <h1 className="font-semibold text-3xl px-3 md:text-4xl xl:text-5xl text-center text-white mix-blend-difference z-30">
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
              className="text-base md:text-xl xl:text-2xl font-semibold text-neutral-500 z-30 opacity-75"
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
