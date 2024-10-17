"use client";
import { FormElement } from "@/app/form/create/page";
import { Dispatch, SetStateAction, useState } from "react";
import { FaPlus } from "react-icons/fa";

const FieldAdder = ({
  children,
  setFormFields,
}: {
  children: React.ReactNode;
  setFormFields: Dispatch<SetStateAction<FormElement[]>>;
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className=" flex w-full">
      <div className="peer grow">{children}</div>
      <div
        className="opacity-50 peer-hover:opacity-100 bg-neutral-700 hover:opacity-100 grid place-items-center rounded-r-xl px-5 text-white relative cursor-pointer"
        onClick={() => {
          setMenuOpen((r) => !r);
        }}
      >
        <FaPlus />
        {menuOpen && (
          <div className="absolute top-full right-0 flex flex-col p-2 rounded-xl bg-neutral-600 text-white font-semibold work text-xl w-fit text-nowrap">
            <div
              className="rounded-xl hover:bg-neutral-700 px-2 py-1 cursor-pointer"
              onClick={() => {
                setFormFields((r) => [
                  ...r,
                  {
                    type: "options",
                    id: r[r.length - 1] ? r[r.length - 1].id + 1 : 0,
                    options: [],
                    label: "New Field",
                  },
                ]);
              }}
            >
              Option Based
            </div>
            <div className="rounded-xl hover:bg-neutral-700 px-2 py-1 cursor-pointer">
              Text as Headng
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default FieldAdder;
