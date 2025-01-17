"use client";
import { FormResponseManager } from "@/classes/FormResponseManager";
import { Field, RatingLabel } from "@prisma/client";

const RatingOutputField = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  group_id,
  group_name,
  ratingHeadings,
  ratingLabels,
}: {
  group_id: string;
  group_name: string;
  ratingHeadings: Field[];
  ratingLabels: RatingLabel[];
}) => {
  const manager = FormResponseManager.getInstance();
  return (
    <div className="flex flex-col rounded-3xl overflow-clip border border-neutral-700 bg-neutral-700">
      <h1
        className={`px-5 md:px-7 xl:px-10 pt-4 font-normal md:font-semibold text-xl md:text-2xl`}
      >
        {group_name}
      </h1>
      <div
        className="work flex flex-col gap-1 md:gap-2 p-5 overflow-x-auto"
        style={{
          gridTemplateColumns: `repeat(${ratingLabels.length + 1}, minmax(0, 1fr))`,
        }}
      >
        <div className="flex md:gap-2 gap-1">
          <div className="max-w-[200px] p-2 min-w-[150px] h-full w-full"></div>
          {ratingLabels.map((label) => {
            return (
              <div
                key={label.index}
                className="font-semibold text-sm md:text-base max-w-[200px] min-w-[150px] w-full h-full bg-neutral-600 text-center p-2 rounded-xl"
              >
                {label.label}
              </div>
            );
          })}
        </div>
        {ratingHeadings.map((heading) => {
          return (
            <div className="flex md:gap-2 gap-1" key={heading.rating_group_id}>
              <h1 className="font-semibold text-sm md:text-base w-full h-full bg-neutral-600 text-center p-2 rounded-xl max-w-[200px] min-w-[150px]">
                {heading.title}
              </h1>
              {ratingLabels.map((label) => {
                return (
                  <div
                    key={label.ratingLabel_id}
                    className="w-full max-w-[200px] min-w-[150px] grid place-items-center"
                  >
                    <input
                      type="radio"
                      name={heading.field_id}
                      className="accent-neutral-300"
                      onChange={(e) => {
                        if (e.target.checked) {
                          manager.checkRadioField(heading.field_id, [
                            label.index,
                          ]);
                        }
                      }}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default RatingOutputField;
