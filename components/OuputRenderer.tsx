import { FullFormType } from "@/app/form/[formId]/page";

const OutputRenderer = ({
  formJSX,
  formFields,
}: {
  formJSX: JSX.Element[];
  formFields: FullFormType;
}) => {
  return (
    <>
      <h1 className="p-5 bg-neutral-700 ma text-neutral-50 font-bold text-3xl">
        {formFields?.title}
      </h1>
      <div className="flex flex-col gap-2 work">{formJSX}</div>
    </>
  );
};
export default OutputRenderer;
