import { FullFormType } from "@/app/form/[formId]/page";

const OutputRenderer = ({
  formJSX,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  formFields,
}: {
  formJSX: JSX.Element[];
  formFields: FullFormType;
}) => {
  return (
    <>
      <div className="flex flex-col gap-2 work">{formJSX}</div>
    </>
  );
};
export default OutputRenderer;
