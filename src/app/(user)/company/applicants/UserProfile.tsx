import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { formatDate, relativeDate } from "@/lib/utils"
import { CircleDotIcon, Dot, Github, Globe, Linkedin, Mail, Phone } from "lucide-react"
import React from 'react'

interface UserProfileProps {
  jobApplication: any
}

function UserProfile({ jobApplication }: UserProfileProps) {
  const status = jobApplication.status;
  const getBadgeClasses = (status: string) => {
    const baseClasses = "";
    switch (status.toLowerCase()) {
      case "in review":
        return `${baseClasses} text-yellow-500`;
      case "shortlisted":
        return `${baseClasses} border-blue-500`;
      case "declined":
        return `${baseClasses} text-red-500`;
      case "hired":
        return `${baseClasses} text-green-500`;
      case "interviewing":
        return `${baseClasses} text-blue-300`;
      default:
        return `${baseClasses} border-gray-300`;
    }
  };

  return (
    <Card className="rounded-none bg-transparent border-t border-card-foreground shadow-none">
      <CardHeader>
        <div className="flex items-center gap-6">
          <Avatar className="hidden h-16 w-16 sm:flex">
            <AvatarImage src={jobApplication.user.image || ""} alt={jobApplication.user.name || ""} />
            <AvatarFallback>{jobApplication.user.name ? jobApplication.user.name.charAt(0) : 'U'}</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-2xl font-semibold font-clash leading-none">
              {jobApplication.user.name}
            </p>
            <p className="text-sm font-light">{jobApplication.currentJobTitle}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-8 divide-y divide-gray-100">
        <dl className="divide-y divide-neutrals-900 bg-neutrals-400 px-4">
          <div className="pb-2">
            <dd className="mt-4 text-sm leading-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-base leading-6 text-neutrals-900">Applied Jobs</span>
                <span className="text-sm leading-6 text-neutrals-800">{relativeDate(jobApplication.createdAt)}</span>
              </div>
            </dd>
          </div>
          <div className="py-2 text-gray-800">
            <dt className="text-lg font-clash font-semibold">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="text-start w-full truncate">
                    {jobApplication.job.title}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{jobApplication.job.title}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </dt>
            <dd className="mt-1 text-sm leading-6 flex flex-wrap gap-2">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink className="font-normal text-neutrals-800 hover:text-neutrals-900">
                      {jobApplication.job.locationType}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <Dot />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink className="font-normal text-neutrals-800 hover:text-neutrals-900">{jobApplication.job.type}</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </dd>
          </div>
        </dl>
        <dl className="divide-y divide-neutrals-900 bg-neutrals-400 px-4">
          <div className="pb-2">
            <dt className="mt-4 text-sm leading-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-base leading-6 text-neutrals-900">Stage</span>
                <span className={`text-md font-semibold leading-6 text-neutrals-800 flex justify-center items-center gap-1 
                  ${getBadgeClasses(jobApplication.status)}`}>
                  <CircleDotIcon className="w-4 h-4" />
                  <p>{jobApplication.status}</p>
                </span>
              </div>
            </dt>
          </div>
        </dl>
        <dl className="">
          <div className="py-4">
            <dt className="text-xl font-semibold">Contact</dt>
          </div>
          <dd className="text-sm leading-6 space-y-6">
            <div className="flex gap-4">
              <Mail />
              <aside className="flex flex-col">
                <span className="text-base leading-6">Email</span>
                <p className="text-sm leading-6break-all">{jobApplication.user.email}</p>
              </aside>
            </div>
            <div className="flex gap-4">
              <Phone />
              <aside className="flex flex-col">
                <span className="text-base leading-6">Phone</span>
                <p className="text-sm leading-6break-all">{jobApplication.user.email}</p>
              </aside>
            </div>
            <div className="flex gap-4">
              <Github />
              <aside className="flex flex-col">
                <span className="text-base leading-6">Github</span>
                <p className="text-sm leading-6break-all">{jobApplication.user.email}</p>
              </aside>
            </div>
            <article className="flex gap-4 ">
              <Linkedin />
              <aside className="flex flex-col">
                <span className="text-base leading-6">LinkedIn</span>
                <p className="text-md leading-6 break-all">{jobApplication.linkedInURL}</p>
              </aside>
            </article>
            <article className="flex gap-4 flex-wrap w-full">
              <Globe />
              <aside className="flex flex-col flex-wrap">
                <span className="text-base leading-6">Portfolio</span>
                <p className="text-sm leading-6 break-all">{jobApplication.portfolioURL}</p>
              </aside>
            </article>
          </dd>
        </dl>
      </CardContent>
    </Card>
  )
}

export default UserProfile