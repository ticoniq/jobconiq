"use server";
import prisma from "@/lib/prisma";
import { JobDataTable } from "./JobTable"
import { currentUser } from "@/lib/auths";

async function JobListingPage() {
  const user = await currentUser();
  
  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          name: true,
        }
      }
    },
  });
  
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-10">
      <div className="flex flex-col justify-start items-start space-y-2">
        <h3 className="text-sm font-clash font-semibold md:text-2xl">Job Listing</h3>
        <p>Here is your jobs listing status</p>
      </div>
      <JobDataTable allJobs={jobs} />
    </main>
  )
}

export default JobListingPage;