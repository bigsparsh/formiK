const LiveFormPage = ({
  params: { formId },
}: {
  params: {
    formId: string;
  };
}) => {
  return <div>{formId}</div>;
};
export default LiveFormPage;
