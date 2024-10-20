const TextComponent = ({ id }: { id: number }) => {
  return (
    <div className="w-full flex flex-col bg-neutral-600 rounded-3xl overflow-hidden p-3 work gap-3 text-white">
      <input
        type="text"
        className="w-full py-2 bg-neutral-700 rounded-full px-5"
        placeholder={"Enter the title of the field " + id}
      />
    </div>
  );
};
export default TextComponent;
