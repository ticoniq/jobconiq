import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { JobDetails } from "../JobDetails"
import { ApplicantDataTable } from "../ApplicantTable"
import prisma from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: { slug: string };
}

export default async function Page({ params: { slug } }: PageProps) {
  const job = await prisma.job.findUnique({
    where: { slug },
    include: {
      user: {
        select: {
          name: true,
        }
      },
      jobapplications: {
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
      }
    },
  });

  if (!job) {
    return <div>Job not found</div>;
  }

  const applicants = job.jobapplications.map(app => ({
    id: app.user.id,
    name: app.user.name || "",
    resume: app.resumeAttachment || "",
    jobTitle: app.job.title || "",
    image: app.user.image || "",
    status: app.status,
    appliedAt: app.createdAt,
  }));

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-10">
      <div className="flex flex-col justify-start items-start space-y-2">
        <Link
          href={"/company/job-listing/"}
          className="flex items-center gap-2"
        >
          <ArrowLeft />
          <p className="text-sm font-clash font-semibold md:text-2xl">{job.title}</p>
        </Link>
        <p>Here is your jobs listing status</p>
      </div>
      <Tabs defaultValue="applicants">
        <TabsList className="grid w-4/5 grid-cols-3 md:w-2/5">
          <TabsTrigger value="applicants" className="shadow-none bg-transparent">Applicants</TabsTrigger>
          <TabsTrigger value="job-details" className="shadow-none bg-transparent">Job Details</TabsTrigger>
          <TabsTrigger value="analytics" className="shadow-none bg-transparent">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="applicants">
          <ApplicantDataTable applicants={applicants} />
        </TabsContent>
        <TabsContent value="job-details">
          <JobDetails params={{ slug }} />
        </TabsContent>
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>
                View analytics for this job posting.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {/* Add your analytics content here */}
              <p>Analytics content coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}