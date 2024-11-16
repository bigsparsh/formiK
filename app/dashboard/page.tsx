import { getStatistics } from "@/actions/Form";

const Page = async () => {
  const stats = await getStatistics();
  return (
    <div className="bg-neutral-700 flex flex-col p-2 md:p-3 rounded-t-3xl grow md:mr-3 gap-2">
      <div className="bg-neutral-600 flex flex-col rounded-3xl p-3 md:p-5 text-neutral-200">
        <h1 className="text-lg md:text-2xl font-semibold">Forms Created</h1>
        <div className="text-2xl md:text-4xl font-black -mt-2 md:mt-0">
          0{stats.formCount}
        </div>
      </div>

      <div className="bg-neutral-600 flex flex-col rounded-3xl p-3 md:p-5 text-neutral-200">
        <h1 className="text-lg md:text-2xl font-semibold">Responses Given</h1>
        <div className="text-2xl md:text-4xl font-black -mt-2 md:mt-0">
          0{stats.responseCount}
        </div>
      </div>
    </div>
  );
};
export default Page;
