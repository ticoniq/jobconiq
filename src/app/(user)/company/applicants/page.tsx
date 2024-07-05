import { currentUser } from "@/lib/auths";
import prisma from "@/lib/prisma";
import React from 'react'
import { ApplicantDataTable } from "../job-listing/ApplicantTable";

type Props = {}

async function applicantsPage({ }: Props) {
  const user = await currentUser();
  const userId = user?.id;
  console.log(userId);
  
  const jobApplications = await prisma.jobApplication.findMany({
    where: {
      job: {
        userId: userId
      }
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        }
      },
      job: {
        select: {
          title: true,
        }
      }
    }
  });

  const applicants = jobApplications.map(app => ({
    id: app.user.id,
    name: app.user.name || "",
    resume: app.resumeAttachment || "",
    jobTitle: app.job.title || "",
    image: app.user.image || "",
    status: app.status,
    appliedAt: app.createdAt,
  }));

  const applicantCount = jobApplications.length;
  
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-10">
      <div className="flex flex-col justify-start items-start space-y-2">
        <h3 className="text-sm font-clash font-semibold md:text-2xl">Total Applicants : {applicantCount}</h3>
      </div>
      <ApplicantDataTable applicants={applicants} />
    </main>
  )
}

export default applicantsPage