import { currentUser } from "@/lib/auths"
import prisma from "@/lib/prisma";
import { getLastWord } from "@/lib/utils";
import { cache } from "react";
import { ApplicationTable } from "./ApplicationTable";

const getCachedJobApplications = cache(async (userId: string) => {
  return await prisma.jobApplication.findMany({
    where: {
      userId: userId
    },
    include: {
      job: {
        include: {
          user: true
        }
      }
    }
  })
})

async function Page() {
  const user = await currentUser();

  if (!user?.id) {
    return (
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-10">
        <div>Please log in to view your job applications.</div>
      </main>
    )
  }

  const jobApplications = await getCachedJobApplications(user.id)

  const applicants = jobApplications.map(app => ({
    id: app.id,
    name: app.job.user.name || "",
    jobTitle: app.job.title || "",
    image: app.job.user.image || "",
    slugg: app.id,
    status: app.status,
    appliedAt: app.createdAt,
  }));

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-10">
      <div className="flex flex-col justify-start items-start space-y-2">
        <p className="text-lg font-clash font-semibold md:text-2xl">Keep it up, {getLastWord(user?.name)}</p>
      </div>
      <ApplicationTable applicants={applicants} />
    </main>
  )
}

export default Page