"use client";
import UserSettings from "@/components/UserSettings";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState<{
    name: string;
    email: string;
    image: string;
  } | null>(null);
  const session = useSession();

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
          "linear-gradient(#ffffff10 10%, transparent 10%) 0 0/ 15px 15px , linear-gradient(90deg, #ffffff10 10%, transparent 10%) 0 0/ 15px 15px, radial-gradient(120% 150% at 50% 50%,transparent, #ffffff50), linear-gradient(60deg, gray 10% 40%, transparent 50% 60%, gray 70% 100%) ,radial-gradient(50% 150% at 50% 0%, #ffffff99, gray)",
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
          <div className="basis-1/5 bg-neutral-600 p-5 rounded-r-3xl mb-20">
            <h1 className="text-6xl font-semibold text-white">Dashboard</h1>
            <p className="text-white text-lg">
              Welcome back, {user ? user.name : "Guest"}
            </p>
            <div className="flex gap-4 mt-4">
              <Link href="/form/new">
                <button>Create Form</button>
              </Link>
              <Link href="/form">
                <button>My Forms</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
