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
    <div className="bg-neutral-600 p-5 rounded-3xl work text-white space-y-3">
      <input
        type="text"
        className="w-full py-1 bg-neutral-700 rounded-full px-5 outline-none focus:ring-4 ring-neutral-700 duration-200"
        defaultValue={group_name}
        onChange={(e) => {
          manager?.setRatingGroupName(group_id, e.target.value);
        }}
      />
      {rating_labels && (
        <div
          className="grid place-items-center bg-neutral-700 rounded-3xl border border-neutral-500 "
          style={{
            gridTemplateColumns: `repeat(${rating_labels.length + 2}, minmax(0, 1fr))`,
          }}
        >
          {headings.map((heading, index) => {
            if (index === 0) {
              return (
                <>
                  <div className="w-full h-full border-r border-b border-neutral-500 rounded-ee-3xl"></div>
                  {rating_labels.map((ele) => {
                    return (
                      <div
                        key={ele.index}
                        className="font-semibold w-full h-full border-r border-b border-neutral-500 text-center p-2 rounded-ee-3xl"
                      >
                        <input
                          type="text"
                          className="w-full py-1 bg-neutral-600 rounded-r-full px-5 outline-none focus:ring-4 ring-neutral-700 duration-200"
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
                  <button className="p-2">
                    <FaPlus
                      className={` text-3xl rounded-xl p-2 bg-neutral-600`}
                      onClick={() => {
                        manager?.addRatingLabel(group_id, id);
                      }}
                    />
                  </button>
                  <div className="font-semibold w-full h-full border-r border-b border-neutral-500 text-center p-2 rounded-ee-3xl">
                    <input
                      type="text"
                      className="w-full py-1 bg-neutral-600 rounded-r-full px-5 outline-none focus:ring-4 ring-neutral-700 duration-200"
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
                        className="w-full h-full text-center border-r border-b border-neutral-500 p-2 rounded-ee-3xl"
                      >
                        <input type="radio" disabled />
                      </div>
                    );
                  })}
                  <div></div>
                </>
              );
            }
            return (
              <>
                <div
                  className={
                    "font-semibold w-full h-full border-r border-b text-center border-neutral-500 rounded-ee-3xl p-2"
                  }
                >
                  <input
                    type="text"
                    className="w-full py-1 bg-neutral-600 rounded-r-full px-5 outline-none focus:ring-4 ring-neutral-700 duration-200"
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
                      className="w-full h-full text-center border-r border-b border-neutral-500 p-2 rounded-ee-3xl"
                    >
                      <input type="radio" disabled />
                    </div>
                  );
                })}
                <div></div>
              </>
            );
          })}
          <button className="p-2">
            <FaPlus
              className="text-3xl rounded-xl p-2 bg-neutral-600 "
              onClick={() => {
                manager?.addRatingHeading(group_id);
              }}
            />
          </button>
        </div>
      )}
    </div>
  );
};
export default RatingInputField;
