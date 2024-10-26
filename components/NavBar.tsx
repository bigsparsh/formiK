"use client";
import Link from "next/link";
import UserSettings from "./UserSettings";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const NavBar = () => {
  const session = useSession();
  const [loading, setLoading] = useState(true);
  const [userx, setUser] = useState<{
    name: string;
    email: string;
    image: string;
  } | null>(null);
  useEffect(() => {
    if (session.status === "loading") {
      setLoading(true);
    } else {
      setLoading(false);
    }
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
    <nav className="p-10 flex justify-between w-full">
      <h1 className="text-4xl font-semibold tracking-tight text-white">
        formiK
      </h1>
      {!userx ? (
        <Link
          className={
            "bg-neutral-700 px-5 py-2 rounded-full font-semibold border-2 border-white/50 text-white " +
            (loading ? "animate-pulse pointer-events-none" : "")
          }
          href="/auth"
        >
          Login or Register
        </Link>
      ) : (
        <UserSettings user={userx} />
      )}
    </nav>
  );
};

export default NavBar;
