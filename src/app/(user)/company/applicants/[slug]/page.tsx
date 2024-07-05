import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import prisma from "@/lib/prisma";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: { slug: string };
}

export default async function Page({ params: { slug } }: PageProps) {
  const jobApplication = await prisma.jobApplication.findFirst({
    where: {
      AND: [
        { id: slug }
      ]
    },
    include: {
      user: true,
      job: true
    }
  })

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-10">
      <div className="flex flex-col justify-start items-start space-y-2">
        <Link
          href={"/company/applicants/"}
          className="flex items-center gap-2"
        >
          <ArrowLeft />
          <p className="text-sm font-clash font-semibold md:text-2xl">Applicant Details</p>
        </Link>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card x-chunk="dashboard-01-chunk-5">
          <CardHeader>
            <CardTitle>{jobApplication?.user.name}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8">
            <div className="flex items-center gap-4">
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  Sofia Davis
                </p>
                <p className="text-sm text-muted-foreground">
                  {jobApplication?.user.email}
                </p>
              </div>
              <div className="ml-auto font-medium">+$39.00</div>
            </div>
          </CardContent>
        </Card>
        <Card
          className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
        >
          <Tabs defaultValue="applicant-profile">
            <TabsList className="grid w-4/5 grid-cols-4 md:w-4/5 p-3">
              <TabsTrigger value="applicant-profile" className="shadow-none bg-transparent">Applicant Profile</TabsTrigger>
              <TabsTrigger value="resume" className="shadow-none bg-transparent">Resume</TabsTrigger>
              <TabsTrigger value="hiring-progress" className="shadow-none bg-transparent">Hiring Progress</TabsTrigger>
              <TabsTrigger value="interview-schedule" className="shadow-none bg-transparent">Interview Schedule</TabsTrigger>
            </TabsList>
            <TabsContent value="applicant-profile">
              <Card>
                <CardHeader>
                  <CardTitle>Applicant Profile</CardTitle>
                  <CardDescription>
                    View Applicant Profile for this user.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {/* Add your analytics content here */}
                  <p>Applicant Profile content coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="resume">
              <Card>
                <CardHeader>
                  <CardTitle>Resume</CardTitle>
                  <CardDescription>
                    View Resume for this user.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {jobApplication?.resumeAttachment}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="hiring-progress">
              <Card>
                <CardHeader>
                  <CardTitle>Hiring Progress</CardTitle>
                  <CardDescription>
                    View Hiring Progress for this user.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {/* Add your analytics content here */}
                  <p>Analytics content coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="interview-schedule">
              <Card>
                <CardHeader>
                  <CardTitle>Interview Schedule</CardTitle>
                  <CardDescription>
                    View Interview Schedule for this user.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {/* Add your analytics content here */}
                  <p>Interview Schedule coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </main>
  )
}