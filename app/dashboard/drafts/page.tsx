import { getDrafts } from "@/actions/Redis";
import { FormElement } from "@/app/form/create/page";
import Link from "next/link";

const Draft = async () => {
  const drafts: {
    form_properties: {
      title: string;
      cover_image: string;
    };
    formFields: FormElement[];
  }[] = await getDrafts();
  return (
    <div className="bg-neutral-700 flex flex-col p-2 md:p-3 rounded-3xl grow md:mr-3 gap-1 md:gap-2 overflow-auto h-[85vh]">
      {drafts.map((form) => {
        return (
          <div
            className="bg-neutral-600 rounded-3xl text-neutral-50 px-2 md:px-4 py-2 flex md:flex-row flex-col justify-between md:items-center border border-neutral-500 gap-2"
            key={crypto.randomUUID()}
            style={{
              background: `linear-gradient(90deg, gray, gray, transparent), url(${form.form_properties.cover_image || (form.formFields.length != 0 && form.formFields.find((field) => field.image)?.image)}) ${form.form_properties.cover_image?.split("/")[2] !== "picsum.photos" ? "center/cover" : "center/cover fixed"}`,
            }}
          >
            <div className="flex flex-col gap-0 md:gap-2">
              <h1 className="text-base md:text-xl font-semibold px-2 md:px-0 md:font-medium">
                {form.form_properties.title}
              </h1>
              <div className="flex gap-1 md:gap-2 work flex-wrap">
                <div className="flex gap-2 bg-neutral-700 px-2  rounded-full text-xs md:text-sm">
                  Images:{" "}
                  {form.formFields.filter((field) => field.image).length}
                </div>
                <div className="flex gap-2 bg-neutral-700 px-2  rounded-full text-xs md:text-sm">
                  Options:{" "}
                  {
                    form.formFields.filter(
                      (field) => field.options && field.options.length > 0,
                    ).length
                  }
                </div>
                <div className="flex gap-2 bg-neutral-700 px-2  rounded-full text-xs md:text-sm">
                  Text: {form.formFields.filter((field) => field.title).length}
                </div>
              </div>
            </div>
            <div className="flex flex-row md:flex-col gap-1 flex-wrap">
              <Link
                className="bg-neutral-700 px-3 py-1 flex justify-center text-xs md:text-sm items-center rounded-full gap-2 w-fit"
                href="/form/create"
              >
                Continue Creation
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Draft;
