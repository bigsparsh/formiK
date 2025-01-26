import NavBar from "@/components/NavBar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FaClipboardList, FaHome, FaListUl, FaPaperclip } from "react-icons/fa";

const Dashboard = async ({ children }: { children: JSX.Element }) => {
  const session = await getServerSession();
  if (!session) redirect("/auth");
  return (
    <div
      className="ma h-screen overflow-clip"
      style={{
        background:
          "linear-gradient(#ffffff10 10%, transparent 10%) 0 0/ 15px 15px , linear-gradient(90deg, #ffffff10 10%, transparent 10%) 0 0/ 15px 15px, radial-gradient(120% 150% at 50% 50%,transparent, #ffffff50), linear-gradient(60deg, gray 10% 40%, transparent 50% 60%, gray 70% 100%) ,radial-gradient(25% 100% at 50% 10%, lightgray, gray)",
      }}
    >
      <div className="flex flex-col">
        <NavBar />
        <div className="grow flex md:flex-row flex-col relative gap-2 p-2 md:p-0">
          <div className="md:basis-1/4 xl:basis-1/6 bg-neutral-700 p-2 rounded-3xl md:rounded-l-none md:mb-20 h-fit">
            <div className="flex flex-col gap-2 text-sm md:text-lg font-semibold ma *:bg-neutral-600 text-neutral-200 *:text-left">
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

              <Link
                className="border border-neutral-600 px-4 py-1 rounded-full relative overflow-clip group"
                href="/dashboard/liveform"
              >
                Live Forms
                <FaListUl className="opacity-25 scale-[3] absolute top-3 right-5 -rotate-12 group-hover:scale-[4] group-hover:rotate-0 duration-200" />
              </Link>

              <Link
                className="border border-neutral-600 px-4 py-1 rounded-full relative overflow-clip group"
                href="/dashboard/drafts"
              >
                My drafts
                <FaListUl className="opacity-25 scale-[3] absolute top-3 right-5 -rotate-12 group-hover:scale-[4] group-hover:rotate-0 duration-200" />
              </Link>
              <Link
                className="border border-neutral-600 px-4 py-1 rounded-full relative overflow-clip group"
                href="/dashboard/global"
              >
                Global Forms
                <FaListUl className="opacity-25 scale-[3] absolute top-3 right-5 -rotate-12 group-hover:scale-[4] group-hover:rotate-0 duration-200" />
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
