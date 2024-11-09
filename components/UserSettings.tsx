"use client";
import { motion, useAnimationControls } from "framer-motion";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
const UserSettings = ({
  user,
}: {
  user: {
    name: string;
    image: string;
    email: string;
  };
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const controls = useAnimationControls();
  const router = useRouter();

  const handleClick = () => {
    if (menuOpen) {
      controls.start("hidden");
      setMenuOpen(false);
    } else {
      controls.start("visible");
      setMenuOpen(true);
    }
  };

  return (
    <motion.div
      className="bg-neutral-700 text-xs md:text-sm lg:text-base pl-1 md:pl-2 pr-3 md:pr-4 xl:pr-5 py-1 md:py-2 rounded-3xl font-semibold border-2 border-white/50 flex flex-col relative text-white cursor-pointer"
      onClick={handleClick}
      layout
    >
      <div className="flex items-center gap-2 md:gap-3">
        <Image
          className="h-5 w-5 md:h-7 md:w-7 rounded-full bg-cover bg-center"
          width={30}
          height={10}
          src={user.image ? user.image : "https://picsum.photos/100"}
          alt="profile"
        />
        <p>{user.name}</p>
      </div>
      <motion.div
        className="flex flex-col absolute top-12 left-0  w-full z-60 gap-1"
        initial="hidden"
        variants={{
          hidden: {
            display: "none",
            opacity: 0,
          },
          visible: {
            y: 0,
            display: "flex",
            opacity: 1,
            zIndex: 50,
            transition: {
              delayChildren: 0,
              staggerChildren: 0.25,
            },
          },
        }}
        animate={controls}
      >
        {[
          {
            title: "Dashboard",
            icon: <FaHome className="" />,
            onClick: () => {
              router.push("/dashboard");
            },
          },
          {
            title: "Logout",
            icon: <FaSignOutAlt className="" />,
            onClick: () => {
              signOut();
            },
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="bg-neutral-600 px-4 py-1 w-full rounded-3xl cursor-pointer"
            variants={{
              hidden: {
                y: "0",
                display: "none",
                opacity: 0,
              },
              visible: {
                y: 0,
                display: "flex",
                opacity: 1,
              },
            }}
          >
            <button className="flex gap-3 items-center" onClick={item.onClick}>
              {item.icon}
              {item.title}
            </button>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};
export default UserSettings;
