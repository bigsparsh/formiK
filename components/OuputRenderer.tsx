import { FullFormType } from "@/app/form/[formId]/page";

const OutputRenderer = ({
  formJSX,
  formFields,
}: {
  formJSX: JSX.Element[];
  formFields: FullFormType;
}) => {
  console.log(formFields);
  return (
    <>
      <div className="flex flex-col gap-2 work">{formJSX}</div>
    </>
  );
};
export default OutputRenderer;
