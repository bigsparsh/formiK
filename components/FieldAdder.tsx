"use client";
import { FormElement } from "@/app/form/create/page";
import { FieldType } from "@prisma/client";
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
                    type: FieldType.OPTION,
                    index: r[r.length - 1] ? r[r.length - 1].index + 1 : 0,
                    options: [],
                    title: "New Option field",
                    required: false,
                  },
                ]);
              }}
            >
              Option Based
            </div>
            <div
              className="rounded-xl hover:bg-neutral-700 px-2 py-1 cursor-pointer"
              onClick={() => {
                setFormFields((r) => [
                  ...r,
                  {
                    type: FieldType.TEXT,
                    index: r[r.length - 1] ? r[r.length - 1].index + 1 : 0,
                    title: "New Text field",
                    required: false,
                  },
                ]);
              }}
            >
              Text as Headng
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default FieldAdder;
