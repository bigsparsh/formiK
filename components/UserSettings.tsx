"use client";
import { motion, useAnimationControls } from "framer-motion";
import { signOut } from "next-auth/react";
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
  const [menuOpen, setMenuOpen] = useState(true);
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
      className="bg-neutral-700 pl-2 pr-5 py-2 rounded-3xl font-semibold border-2 border-white/50 flex flex-col relative text-white"
      onClick={handleClick}
      layout
    >
      <div className="flex items-center gap-3">
        <div
          className="h-7 aspect-square rounded-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${user.image || "//picsum.photos/200"})`,
          }}
        />
        <p>{user.name}</p>
      </div>
      <motion.div
        className="flex flex-col absolute top-12 left-0  w-full z-60 gap-1"
        // ref={menuRef}
        variants={{
          hidden: {
            display: "none",
            opacity: 0,
          },
          visible: {
            y: 0,
            display: "flex",
            opacity: 1,
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
            className="bg-neutral-600 px-4 py-1 w-full rounded-3xl z-50 cursor-pointer"
            variants={{
              hidden: {
                y: "-50px",
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
            <div className="flex gap-3 items-center" onClick={item.onClick}>
              {item.icon}
              {item.title}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};
export default UserSettings;
