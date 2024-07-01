import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { formatMoney } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Job, User } from "@prisma/client";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../ui/breadcrumb";
import { Dot } from "lucide-react";

interface JobWithUser extends Job {
  user?: User;
}

interface JobListItemProps {
  job: JobWithUser;
}

function JobListItems({ job }: JobListItemProps) {
  return (
    <Card x-chunk="dashboard-01-chunk-5" className="rounded-none p-4 bg-inherit dark:border-neutrals-900 border-border">
      <CardContent className="p-0 space-y-5 flex flex-col items-start justify-between sm:flex-row sm:space-y-0">
        <div className="flex flex-row justify-start items-start gap-5">
          <Avatar className="h-14 w-14 sm:flex rounded-none">
            <AvatarImage
              src={job.user?.image || "/avatars/01.png"}
              className="rounded-none"
              alt="Avatar"
            />
            <AvatarFallback className="rounded-none">JC</AvatarFallback>
          </Avatar>
          <div className="grid gap-y-2  text-start">
            <p className="text-xl font-semibold leading-none md:w-4/5">
              {job.title}
            </p>
            <Breadcrumb className="font-normal">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink>{job.user?.name}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <Dot />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink>{job.location || "Worldwide"}</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="space-x-2">
              <Badge variant={"secondary"}>{job.type}</Badge>
              <Badge variant={"warning"}>{job.locationType}</Badge>
              <Badge variant={"info"}>{formatMoney(job.salary)}</Badge>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-auto">
          <Button
            className="px-10 w-full sm:w-auto"
            asChild
          >
            <Link href={"/jobs/" + job.slug}>
              Apply
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default JobListItems