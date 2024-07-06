import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PDFViewer from "@/components/PdfViewer";
import { ArrowLeft, Dot } from "lucide-react";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate, relativeDate } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import UserProfile from "../UserProfile";

interface PageProps {
  params: { slug: string };
}

export default async function Page({ params: { slug } }: PageProps) {
  const jobApplication = await prisma.jobApplication.findUnique({
    where: { id: slug },
    include: {
      user: true,
      job: true
    }
  });

  if (!jobApplication) {
    return <div>Job application not found</div>;
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-10">
      <div className="flex flex-col justify-start items-start space-y-2">
        <Link href="/company/applicants/" className="flex items-center gap-2">
          <ArrowLeft />
          <p className="text-sm font-clash font-semibold md:text-2xl">Applicant Details</p>
        </Link>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-1 xl:grid-cols-3">
        <UserProfile jobApplication={jobApplication} />
        <Card className="xl:col-span-2 rounded-none bg-transparent border border-card-foreground shadow-none">
          <Tabs defaultValue="applicant-profile">
            <TabsList className="grid w-full grid-cols-4 md:w-4/5 p-3">
              <TabsTrigger value="applicant-profile" className="shadow-none bg-transparent">Applicant Profile</TabsTrigger>
              <TabsTrigger value="resume" className="shadow-none bg-transparent">Resume</TabsTrigger>
              <TabsTrigger value="hiring-progress" className="shadow-none bg-transparent">Hiring Progress</TabsTrigger>
              <TabsTrigger value="interview-schedule" className="shadow-none bg-transparent">Interview Schedule</TabsTrigger>
            </TabsList>
            <TabsContent value="applicant-profile">
              <Card className="rounded-none bg-transparent border-t border-t-card-foreground shadow-none">
                <CardHeader>
                  <CardTitle>Applicant Profile</CardTitle>
                  <CardDescription>View Applicant Profile for this user.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>Full Name: {jobApplication.fullName}</p>
                  <p>Email: {jobApplication.emailAddress}</p>
                  <p>Phone: {jobApplication.phoneNumber}</p>
                  <p>Current Job Title: {jobApplication.currentJobTitle}</p>
                  {jobApplication.linkedInURL && <p>LinkedIn: <a href={jobApplication.linkedInURL} target="_blank" rel="noopener noreferrer">{jobApplication.linkedInURL}</a></p>}
                  {jobApplication.portfolioURL && <p>Portfolio: <a href={jobApplication.portfolioURL} target="_blank" rel="noopener noreferrer">{jobApplication.portfolioURL}</a></p>}
                  {jobApplication.additionalInfo && <p>Additional Info: {jobApplication.additionalInfo}</p>}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="resume" className="">
              <Card className="rounded-none bg-transparent border-t border-t-card-foreground shadow-none">
                <CardContent className="py-4">
                  {jobApplication.resumeAttachment ? (
                    <PDFViewer pdfUrl={jobApplication.resumeAttachment} />
                  ) : (
                    <p>No resume attached</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="hiring-progress">
              <Card className="rounded-none bg-transparent border-t border-t-card-foreground shadow-none">
                <CardHeader>
                  <CardTitle>Hiring Progress</CardTitle>
                  <CardDescription>View Hiring Progress for this user.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>Current Status: {jobApplication.status}</p>
                  {/* Add more hiring progress details here */}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="interview-schedule">
              <Card className="rounded-none bg-transparent border-t border-t-card-foreground shadow-none">
                <CardHeader>
                  <CardTitle>Interview Schedule</CardTitle>
                  <CardDescription>View Interview Schedule for this user.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>Interview Schedule coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </main>
  );
}