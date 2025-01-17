"use client";
import { FormElement } from "@/app/form/create/page";
import { FormInputManager } from "@/classes/FormInputManager";
import { formInputStateAtom } from "@/recoil/atoms";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useRecoilValue } from "recoil";

const RatingInputField = ({
  rating_labels,
  rating_headings,
  id,
  group_id,
  group_name,
}: {
  rating_labels: {
    index: number;
    label: string;
  }[];
  rating_headings: FormElement[];
  id: number;
  group_id: string;
  group_name: string;
}) => {
  const [manager, setManager] = useState<FormInputManager>();
  const [headings, setHeadings] = useState<FormElement[] | never[]>([]);
  const formElements = useRecoilValue(formInputStateAtom);

  useEffect(() => {
    if (!manager) setManager(FormInputManager.getInstance());
    setHeadings(() => formElements.filter((r) => r.group_id === group_id));
  }, [formElements, group_id, manager, rating_headings]);

  return (
    <div className="bg-neutral-600 p-2 md:p-3 rounded-3xl work text-white flex flex-col gap-2 md:gap-3">
      <textarea
        className="w-full py-1 bg-neutral-700 rounded-3xl px-5 text-sm md:text-base outline-none focus:ring-4 ring-neutral-700 duration-200"
        defaultValue={group_name}
        onChange={(e) => {
          manager?.setRatingGroupName(group_id, e.target.value);
        }}
      ></textarea>
      {rating_labels && (
        <div
          className="flex flex-col bg-neutral-700 rounded-3xl  overflow-x-auto"
          style={{
            gridTemplateColumns: `repeat(${rating_labels.length + 2}, minmax(0, 1fr))`,
          }}
        >
          {headings.map((heading, index) => {
            return index === 0 ? (
              <>
                <div className="flex group relative">
                  <div className="w-full h-full p-2 rounded-ee-3xl min-w-[150px] max-w-[200px]"></div>
                  {rating_labels.map((ele) => {
                    return (
                      <div
                        key={ele.index}
                        className="font-semibold w-full h-full border-r border-b border-neutral-500 text-center p-2 rounded-ee-3xl min-w-[150px] max-w-[200px]"
                      >
                        <input
                          type="text"
                          className="text-sm md:text-base w-full py-1 bg-neutral-600 rounded-r-full px-5 outline-none focus:ring-4 ring-neutral-700 duration-200"
                          defaultValue={ele.label}
                          onChange={(e) => {
                            manager?.setRatingLabel(
                              group_id,
                              ele.index,
                              e.target.value,
                            );
                          }}
                        />
                      </div>
                    );
                  })}
                  <button className="sticky group-hover:grid p-2 min-w-[50px] hidden right-0 top-0 place-items-center">
                    <FaPlus
                      className={` text-3xl rounded-xl p-2 bg-neutral-800`}
                      onClick={() => {
                        manager?.addRatingLabel(group_id, id);
                      }}
                    />
                  </button>
                </div>
                <div className="flex">
                  <div className="font-semibold w-full h-full border-r border-b border-neutral-500 text-center p-2 rounded-ee-3xl min-w-[150px] max-w-[200px]">
                    <input
                      type="text"
                      className="text-sm md:text-base w-full py-1 bg-neutral-600 rounded-r-full px-5 outline-none focus:ring-4 ring-neutral-700 duration-200"
                      defaultValue={heading.title}
                      onChange={(e) => {
                        manager?.setTextToField(heading.index, e.target.value);
                      }}
                    />
                  </div>
                  {rating_labels.map((ele) => {
                    return (
                      <div
                        key={ele.index}
                        className="w-full h-full p-2 md:p-3 text-center border-r border-b border-neutral-500 rounded-ee-3xl min-w-[150px] max-w-[200px]"
                      >
                        <input type="radio" disabled />
                      </div>
                    );
                  })}
                  <div></div>
                </div>
              </>
            ) : (
              <div className="flex">
                <div className="peer font-semibold w-full h-full border-r border-b border-neutral-500 text-center p-2 rounded-ee-3xl min-w-[150px] max-w-[200px]">
                  <input
                    type="text"
                    className="text-sm md:text-base w-full py-1 bg-neutral-600 rounded-r-full px-5 outline-none focus:ring-4 ring-neutral-700 duration-200"
                    defaultValue={heading.title}
                    onChange={(e) => {
                      manager?.setTextToField(heading.index, e.target.value);
                    }}
                  />
                </div>
                {rating_labels.map((ele) => {
                  return (
                    <div
                      key={ele.index}
                      className="w-full h-full p-2 md:p-3 text-center border-r border-b border-neutral-500 rounded-ee-3xl min-w-[150px] max-w-[200px]"
                    >
                      <input type="radio" disabled />
                    </div>
                  );
                })}
              </div>
            );
          })}
          <div className="sticky grid p-2 min-w-[50px] left-0 bottom-0 place-items-center">
            <FaPlus
              className="text-3xl rounded-xl p-2 bg-neutral-600 cursor-pointer"
              onClick={() => {
                manager?.addRatingHeading(group_id);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default RatingInputField;
