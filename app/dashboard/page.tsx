"use client";
import UserSettings from "@/components/UserSettings";
import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState<{
    name: string;
    email: string;
    image: string;
  } | null>(null);
  const session = useSession();
  // const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      setUser({
        name: (session.data.user?.name
          ? session.data.user.name
          : session.data.user?.email?.split("@")[0]) as string,
        email: session.data.user?.email as string,
        image: session.data.user?.image as string,
      });
    } else {
      setUser(null);
    }
  }, [session]);

  return (
    <div
      className="ma h-screen"
      style={{
        background:
          "linear-gradient(#ffffff10 10%, transparent 10%) 0 0/ 15px 15px , linear-gradient(90deg, #ffffff10 10%, transparent 10%) 0 0/ 15px 15px, radial-gradient(120% 150% at 50% 50%,transparent, #ffffff50), linear-gradient(60deg, gray 10% 40%, transparent 50% 60%, gray 70% 100%) ,radial-gradient(25% 100% at 50% 10%, lightgray, gray)",
      }}
    >
      <div className="flex flex-col h-screen">
        <nav className="p-10 flex justify-between">
          <h1 className="text-4xl font-semibold tracking-tight text-white">
            formiK
          </h1>
          {user && <UserSettings user={user} />}
        </nav>
        <div className="grow flex relative">
          <div className="basis-1/6 bg-neutral-600 p-2 rounded-r-3xl mb-20">
            <div className="flex flex-col gap-2  work text-lg font-semibold">
              <button className="border border-neutral-600 px-4 py-1 rounded-full bg-neutral-500/50">
                Create Form
              </button>
              <button className="border border-neutral-600 px-4 py-1 rounded-full bg-neutral-500/50">
                My Forms
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
