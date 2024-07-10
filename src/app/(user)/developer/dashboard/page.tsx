"use server";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import { currentUser } from "@/lib/auths";
import prisma from "@/lib/prisma";
import { formatDate, getGreeting, getLastWord } from "@/lib/utils";
import { Dot, FileIcon, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Component } from "./JobAppliedChart"

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

  const jobsApplied = await prisma.jobApplication.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      job: {
        include: {
          user: true,
        }
      }
    },
  });

  const jobCount = await prisma.jobApplication.count({
    where: {
      userId: user?.id,
    },
  })

  const isInterviewing = await prisma.jobApplication.count({
    where: {
      userId: user?.id,
      status: "Interviewing",
    },
  });

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex flex-col justify-start items-start">
        <h3 className="text-lg font-clash font-semibold md:text-2xl">{getGreeting(getLastWord(user?.name))}</h3>
        <p>Here is what’s happening with your job search applications.</p>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"
      >
        <section className="w-full space-y-8">
          <div className="mt-6 grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-5">
            <div className="space-y-4">
              <Card className="space-y-4 p-4 group rounded-none bg-transparent border border-brand-secondary">
                <CardHeader className="p-0 flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-lg font-medium">
                    Total Jobs Applied
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-6xl font-bold">{jobCount ? jobCount : "0"}</p>
                </CardContent>
              </Card>
              <Card className="space-y-4 p-4 group rounded-none bg-transparent border border-brand-secondary">
                <CardHeader className="p-0 flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-lg font-medium">
                    Interviewed
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-6xl font-bold">{isInterviewing ? isInterviewing : "0"}</p>
                </CardContent>
              </Card>
            </div>
            <Card className="space-y-2 p-4 group rounded-none bg-transparent border border-brand-secondary">
              <CardHeader className="p-0 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-lg font-medium">
                  Jobs Applied Status
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Component jobCount={jobCount} />
              </CardContent>
              <CardFooter className="p-0">
                <CustomLink
                  href={"/developer/application-history"}
                  textarea={"View All Applications"}
                  className="text-brand-primary"
                  divClassName="bg-brand-primary"
                />
              </CardFooter>
            </Card>
            <Card className="space-y-4 p-4 group rounded-none bg-transparent border border-brand-secondary">
              <CardHeader className="p-0 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-lg font-medium">
                  Upcomming Interviews
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
          </div>
          <Card className="rounded-none bg-transparent border border-brand-secondary w-full">
            <CardHeader className="p-4 border-b border-b-brand-secondary">
              <CardTitle className="font-clash font-semibold text-xl">Recent Applications History</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              {jobsApplied.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-lg font-semibold">No jobs applied yet</p>
                  <p className="text-muted-foreground">Start your job search journey by applying to some positions!</p>
                </div>
              ) : (
                <>
                  {jobsApplied.map((job) => (
                    <Card key={job.id} className="rounded-none p-4 bg-inherit dark:border-neutrals-900 border-border">
                      <CardContent className="p-0 space-y-5 flex flex-col items-start justify-between sm:flex-row sm:space-y-0">
                        <div className="flex flex-wrap flex-row justify-start items-start gap-5 md:w-2/4">
                          <Avatar className="h-14 w-14 sm:flex rounded-none">
                            <AvatarImage
                              src={job.job.user?.image || "/avatars/01.png"}
                              className="rounded-none"
                              alt="Avatar"
                            />
                            <AvatarFallback className="rounded-none">JC</AvatarFallback>
                          </Avatar>
                          <div className="grid gap-y-2  text-start">
                            <p className="text-xl font-semibold leading-none">
                              {job.job.title}
                            </p>
                            <Breadcrumb className="font-normal">
                              <BreadcrumbList>
                                <BreadcrumbItem>
                                  <BreadcrumbLink>{job.job.user.name}</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator>
                                  <Dot />
                                </BreadcrumbSeparator>
                                <BreadcrumbItem>
                                  <BreadcrumbLink>{job.job.location || "Worldwide"}</BreadcrumbLink>
                                </BreadcrumbItem>
                              </BreadcrumbList>
                            </Breadcrumb>
                          </div>
                        </div>
                        <div className="md:w-1/4">
                          <dl>
                            <dt>Date Applied</dt>
                            <dd>{formatDate(job.createdAt)}</dd>
                          </dl>
                        </div>
                        <div className="flex justify-between items-center md:w-1/4">
                          <Badge className={getBadgeClasses(job.status)}>{job.status}</Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Link href={`/developer/application-history/${job.slug}`}>
                                  View job details
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>Edit job</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {jobCount > 3 && (
                    <CardFooter className="p-0 flex justify-center items-center">
                      <CustomLink
                        href={"/developer/application-history"}
                        textarea={"View all applications history"}
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