import { FormElement } from "@/app/form/create/page";

const OptionOutputField = ({
  title,
  options,
}: {
  title: string;
  options: FormElement["options"];
}) => {
  return (
    <div className="w-full">
      <h1>{title}</h1>
      {options?.map((option) => {
        return (
          <div key={crypto.randomUUID()}>
            <input type="radio" value={option.index} />
            <label>{option.value}</label>
          </div>
        );
      })}
    </div>
  );
};
export default OptionOutputField;
