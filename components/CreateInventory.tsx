import { FormInputManager } from "@/classes/FormInputManager";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { RefObject } from "react";

const CreateInventory = ({
  manager,
  router,
  fileRef,
  className,
}: {
  manager: FormInputManager;
  router: AppRouterInstance;
  fileRef: RefObject<HTMLInputElement>;
  className: string;
}) => {
  return (
    <div className={"" + className}>
      <h1 className="px-4 py-2 md:text-center font-medium text-base md:text-xl bg-neutral-700">
        Add to form
      </h1>
      <div className="px-5 py-2 text-sm md:text-lg">
        <button
          className="rounded-xl px-2 py-1 hover:bg-neutral-700 w-full text-left outline-none"
          onClick={() => {
            manager?.addOptionField();
          }}
        >
          Options
        </button>
        <button
          className="rounded-xl px-2 py-1 hover:bg-neutral-700 w-full text-left outline-none"
          onClick={() => {
            manager?.addTextField();
          }}
        >
          Text
        </button>
        <button
          className="rounded-xl px-2 py-1 hover:bg-neutral-700 w-full text-left outline-none"
          onClick={() => {
            manager?.addImageField();
          }}
        >
          Image
        </button>
      </div>
      <button
        className="bg-neutral-100 text-neutral-800 py-2 text-base md:text-lg font-medium self-center w-full"
        onClick={() => {
          manager?.finalizeForm(fileRef.current?.files?.[0] as File, router);
        }}
      >
        Finalize Form
      </button>
    </div>
  );
};
export default CreateInventory;
