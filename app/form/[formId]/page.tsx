const FormPage = ({
  params: { formId },
}: {
  params: {
    formId: string;
  };
}) => {
  return <h1>I am form with id {formId}</h1>;
};
export default FormPage;
