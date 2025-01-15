import { Field, RatingLabel } from "@prisma/client";

const RatingOutputField = ({
  _group_id,
  group_name,
  ratingHeadings,
  ratingLabels,
}: {
  group_id: string;
  group_name: string;
  ratingHeadings: Field[];
  ratingLabels: RatingLabel[];
}) => {
  return (
    <div className="flex flex-col rounded-3xl overflow-clip border border-neutral-700 bg-neutral-700">
      <h1
        className={`px-3 md:px-7 xl:px-10 py-2 font-medium md:font-semibold text-xl md:text-2xl`}
      >
        {group_name}
      </h1>
      <div
        className="work grid place-items-center p-5"
        style={{
          gridTemplateColumns: `repeat(${ratingLabels.length + 1}, minmax(0, 1fr))`,
        }}
      >
        <div></div>
        {ratingLabels.map((label) => {
          return (
            <div
              key={label.index}
              className="font-semibold w-full h-full bg-neutral-600 text-center p-2 rounded-3xl"
            >
              {label.label}
            </div>
          );
        })}
        {ratingHeadings.map((heading) => {
          return (
            <>
              <div className="font-semibold w-full h-full bg-neutral-600 text-center p-2 rounded-3xl">
                {heading.title}
              </div>
              {ratingLabels.map((label) => {
                return (
                  <div key={label.ratingLabel_id}>
                    <input
                      type="radio"
                      name={heading.field_id}
                      className="accent-neutral-300"
                    />
                  </div>
                );
              })}
            </>
          );
        })}
      </div>
    </div>
  );
};
export default RatingOutputField;
