import { getForms } from "@/actions/Form";
import CopyButton from "@/components/CopyButton";
import Link from "next/link";
import { FaClipboardList, FaExternalLinkAlt, FaEye } from "react-icons/fa";

const MyForms = async () => {
  const forms = await getForms();
  return (
    <div className="bg-neutral-600 place-items-start grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-2 md:p-3 rounded-3xl grow md:mr-3 gap-3 md:gap-5 overflow-auto h-[85vh]">
      {forms.map((form) => {
        return (
          <div
            className="bg-neutral-800 rounded-3xl text-neutral-50 flex flex-col justify-between md:items-center border border-neutral-700 overflow-clip h-[350px] w-full"
            key={crypto.randomUUID()}
          >
            <div
              className="flex flex-col gap-0 md:gap-2 h-hull w-full rounded-3xl basis-3/5"
              style={{
                background: `linear-gradient(135deg, #1e1e1e, transparent), url(${form.cover_image || form.fields.find((field) => field.image)?.image}) ${form.cover_image?.split("/")[2] !== "picsum.photos" ? "center/cover" : "center/cover fixed"}`,
              }}
            >
              <h1 className="text-xl md:text-2xl font-bold p-3 md:p-5 md:font-medium md:mr-3 mr-10 leading-3 tracking-tight">
                {form.title}
              </h1>
            </div>
            <div className="flex gap-1 items-center justify-evenly basis-1/5 w-full rounded-3xl  border-b border-neutral-500">
              <div className="flex gap-1 md:gap-2 work flex-wrap">
                <div className="flex gap-2 bg-neutral-700 px-2  rounded-full text-xs md:text-sm">
                  Images: {form.fields.filter((field) => field.image).length}
                </div>
                <div className="flex gap-2 bg-neutral-700 px-2  rounded-full text-xs md:text-sm">
                  Options:{" "}
                  {
                    form.fields.filter((field) => field.options.length > 0)
                      .length
                  }
                </div>
                <div className="flex gap-2 bg-neutral-700 px-2  rounded-full text-xs md:text-sm">
                  Text: {form.fields.filter((field) => field.title).length}
                </div>
              </div>
            </div>
            <div className="flex gap-1 items-center justify-evenly basis-1/5 w-full rounded-3xl  border-b border-neutral-500">
              <Link
                href={"/form/" + form.form_id}
                className=" basis-1/3 grid place-items-center p-3 font-semibold relative text-center border-r border-neutral-500 leading-4 work mix-blend-lighten group *:duration-200 h-full"
              >
                Preview Form{" "}
                <FaEye className="text-4xl text-neutral-500/50 absolute -bottom-3 m-auto group-hover:rotate-12 group-hover:scale-110" />
              </Link>
              <CopyButton
                copyText={"https://formik.bigsparsh.com/form/" + form.form_id}
                className=" basis-1/3 grid place-items-center p-3 font-semibold relative text-center border-r border-neutral-500 leading-4 work mix-blend-lighten group *:duration-200 h-full"
              >
                Copy Link{" "}
                <FaClipboardList className="text-4xl text-neutral-500/50 absolute -bottom-5 m-auto  group-hover:rotate-12 group-hover:scale-110" />
              </CopyButton>

              <Link
                href={
                  "https://docs.google.com/spreadsheets/d/" +
                  form.form?.sheet_id
                }
                className=" basis-1/3 grid place-items-center p-3 font-semibold relative text-center  leading-4 work mix-blend-lighten group *:duration-200 h-full"
              >
                View Responses
                <FaExternalLinkAlt className="text-4xl text-neutral-500/50 absolute -bottom-5 m-auto group-hover:rotate-12 group-hover:scale-110" />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default MyForms;
