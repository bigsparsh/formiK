import NavBar from "@/components/NavBar";
import Link from "next/link";
import { FaClipboardList, FaHome, FaPaperclip } from "react-icons/fa";

const Dashboard = ({ children }: { children: JSX.Element }) => {
  return (
    <div
      className="ma h-screen overflow-hidden"
      style={{
        background:
          "linear-gradient(#ffffff10 10%, transparent 10%) 0 0/ 15px 15px , linear-gradient(90deg, #ffffff10 10%, transparent 10%) 0 0/ 15px 15px, radial-gradient(120% 150% at 50% 50%,transparent, #ffffff50), linear-gradient(60deg, gray 10% 40%, transparent 50% 60%, gray 70% 100%) ,radial-gradient(25% 100% at 50% 10%, lightgray, gray)",
      }}
    >
      <div className="flex flex-col h-screen">
        <NavBar />
        <div className="grow flex relative gap-2">
          <div className="basis-1/6 bg-neutral-700 p-2 rounded-r-3xl mb-20 h-fit">
            <div className="flex flex-col gap-2 text-lg font-semibold ma *:bg-neutral-600 text-neutral-200 *:text-left">
              <Link
                className="border border-neutral-600 px-4 py-1 rounded-full relative overflow-clip group"
                href="/dashboard"
              >
                Home
                <FaHome className="opacity-25 scale-[3] absolute top-3 right-5 -rotate-12 group-hover:scale-[4] group-hover:rotate-0 duration-200" />
              </Link>
              <Link
                className="border border-neutral-600 px-4 py-1 rounded-full relative overflow-clip group"
                href="/form/create"
              >
                Create Form
                <FaClipboardList className="opacity-25 scale-[3] absolute top-3 right-5 -rotate-12 group-hover:scale-[4] group-hover:rotate-0 duration-200" />
              </Link>
              <Link
                className="border border-neutral-600 px-4 py-1 rounded-full relative overflow-clip group"
                href="/dashboard/myforms"
              >
                My Forms
                <FaPaperclip className="opacity-25 scale-[3] absolute top-3 right-5 -rotate-12 group-hover:scale-[4] group-hover:rotate-0 duration-200" />
              </Link>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
