"use server";
import { currentUser } from "@/lib/auths";
import { getLastWord } from "@/lib/utils";


async function Dashboardpage() {
  const user = await currentUser();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex flex-col justify-start items-start">
        <h3 className="text-sm font-clash font-semibold md:text-2xl">Good Morning, {getLastWord(user?.name)}</h3>
        <p>Here is your job listings statistic report</p>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You jobs yet
          </h3>
        </div>
      </div>
    </main>
  )
}

export default Dashboardpage