import { getForms } from "@/actions/Form";
import Link from "next/link";
import { FaEye } from "react-icons/fa";

const MyForms = async () => {
  const forms = await getForms();
  return (
    <div className="bg-neutral-700 flex flex-col p-3 rounded-3xl grow mr-3 gap-2 overflow-auto h-[85vh]">
      {forms.map((form) => {
        return (
          <div
            className="bg-neutral-600 rounded-xl text-neutral-50 px-4 py-2 flex justify-between items-center border border-neutral-500"
            key={crypto.randomUUID()}
            style={{
              background: `linear-gradient(90deg, gray, gray, transparent), url(${form.cover_image || form.fields.find((field) => field.image)?.image}) ${form.cover_image?.split("/")[2] !== "picsum.photos" ? "center/cover" : "center/cover fixed"}`,
            }}
          >
            <div className="flex flex-col gap-2">
              <h1 className="text-xl font-medium">{form.title}</h1>
              <div className="flex gap-2 work">
                <div className="flex gap-2 bg-neutral-700 px-2  rounded-full text-sm">
                  Images: {form.fields.filter((field) => field.image).length}
                </div>
                <div className="flex gap-2 bg-neutral-700 px-2  rounded-full text-sm">
                  Options:{" "}
                  {
                    form.fields.filter((field) => field.options.length > 0)
                      .length
                  }
                </div>
                <div className="flex gap-2 bg-neutral-700 px-2  rounded-full text-sm">
                  Text: {form.fields.filter((field) => field.title).length}
                </div>
              </div>
            </div>
            <div className="">
              <Link
                href={"/form/" + form.form_id}
                className="bg-neutral-700 px-3 py-1 flex justify-center items-center rounded-full gap-2"
              >
                Preview Form <FaEye className="text-xl" />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default MyForms;
