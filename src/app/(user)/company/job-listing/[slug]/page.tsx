import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { JobDetails } from "../JobDetails"
import { ApplicantDataTable } from "../ApplicantTable"
import prisma from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
    image: app.user.image || "",
    status: app.status,
    appliedAt: app.createdAt,
  }));

  return (
    <section className="container py-10">
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
    </section>
  )
}