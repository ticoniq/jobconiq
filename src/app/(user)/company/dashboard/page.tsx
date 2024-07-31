"use server";
import { currentUser } from "@/lib/auths";
import { formatDate, getGreeting, getLastWord } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import CustomLink from "@/components/ui/custom-link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import prisma from "@/lib/prisma";
import { cache } from "react";
import { Dot, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const getBadgeClasses = (status: string) => {
  const baseClasses = "px-2 py-1 rounded-full text-xs font-semibold";
  switch (status.toLowerCase()) {
    case "in review":
      return `${baseClasses} border border-yellow-500 bg-yellow-500/10 text-yellow-500`;
    case "shortlisted":
      return `${baseClasses} bg-blue-100 text-blue-800 border border-blue-500`;
    case "declined":
      return `${baseClasses} border border-red-500 bg-red-500/10 text-red-500`;
    case "hired":
      return `${baseClasses} border border-green-500 bg-green-500/10 text-green-500`;
    case "interviewing":
      return `${baseClasses} border border-blue-300 bg-blue-300/10 text-blue-300`;
    default:
      return `${baseClasses} bg-gray-100 text-gray-800 border border-gray-300`;
  }
};

async function Dashboardpage() {
  const user = await currentUser();

  const AllJobs = await prisma.job.findMany({
    where: { userId: user?.id },
    include: { jobapplications: true },
  });

  const jobCount = await prisma.job.count({
    where: { userId: user?.id },
  });

  const jobReviewCount = await prisma.jobApplication.findMany({
    where: {
      status: "In Review",
      job: {
        userId: user?.id
      },
    },
  });

  const jobInterviewingCount = await prisma.jobApplication.findMany({
    where: {
      status: "Interviewing",
      job: {
        userId: user?.id
      },
    },
  });

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex flex-col justify-start items-start">
        <h3 className="text-sm font-clash font-semibold md:text-2xl">{getGreeting(getLastWord(user?.name))}</h3>
        <p>Here is your job listings statistic report</p>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"
      >
        <section className="w-full space-y-8">
          <div className="grid gap-2 md:grid-cols-2 md:gap-2 lg:grid-cols-3">
            <Card className="p-6 rounded-none bg-brand-primary flex justify-start items-center gap-3">
                <h3 className="text-5xl font-semibold">{jobReviewCount.length || 0}</h3>
                <p>New candidates to review</p>
            </Card>
            <Card className="p-6 rounded-none bg-accents-green flex justify-start items-center gap-3">
                <h3 className="text-5xl font-semibold">{jobInterviewingCount.length || 0}</h3>
                <p>New candidates to review</p>
            </Card>
            <Card className="p-6 rounded-none bg-accents-blue flex justify-start items-center gap-3">
                {/* <h3 className="text-5xl font-semibold">{jobInterviewingCount.length || 0}</h3> */}
                <p>Message Count comming soon</p>
            </Card>
          </div>
          <Card className="rounded-none bg-transparent border border-brand-secondary w-full">
            <CardHeader className="p-4 border-b border-b-brand-secondary">
              <CardTitle className="font-clash font-semibold text-xl">Job Update</CardTitle>
            </CardHeader>
            <CardContent className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {jobCount === 0 ? (
                <div className="text-center py-8">
                  <p className="text-lg font-semibold">No jobs applied yet</p>
                  <p className="text-muted-foreground">Start your job search journey by applying to some positions!</p>
                </div>
              ) : (
                <>
                  {AllJobs.map((job) => (
                    <Link href={`/companies/${job.id}`} key={job.id} className="block">
                      <Card className="space-y-4 p-4 group relative rounded-none bg-transparent border border-brand-secondary">
                        <CardTitle className="flex justify-between w-full p-0 overflow-hidden lg:aspect-none group-hover:opacity-75">
                          <Avatar className="h-14 w-14 sm:flex rounded-none">
                            <AvatarImage
                              src={user?.image || "/avatars/01.png"}
                              className="rounded-none"
                              alt="Avatar"
                            />
                            <AvatarFallback className="rounded-none">JC</AvatarFallback>
                          </Avatar>
                          <div>
                            <Badge variant={"info"} className="rounded-none">{job.type}</Badge>
                          </div>
                        </CardTitle>
                        <CardContent className="p-0 space-y-2 group-hover:opacity-75">
                          <h3 className="text-xl font-clash font-semibold tracking-wide">
                            {job.title}
                          </h3>
                          <div className="w-full text-sm leading-6 flex items-center gap-1 flex-wrap">
                            <span>{user?.name}</span>
                            <Dot size={18} />
                            <span>{job.location}</span>
                          </div>
                          <p>{job.jobapplications.length} applied</p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                  {jobCount > 3 && (
                    <CardFooter className="p-0 flex justify-center items-center">
                      <CustomLink
                        href={"/company/applicants"}
                        textarea={"View all"}
                        className="text-brand-primary text-center"
                        divClassName="bg-brand-primary"
                      />
                    </CardFooter>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  )
}

export default Dashboardpage