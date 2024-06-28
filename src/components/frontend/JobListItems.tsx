import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { formatMoney } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Job } from "@prisma/client";

interface JobListItemProps {
  job: Job;
}


function JobListItems({job}: JobListItemProps) {
  return (
    <Card x-chunk="dashboard-01-chunk-5" className="rounded-none p-4 bg-inherit dark:border-neutrals-900 border-border">
      <CardContent className="p-0 space-y-5 flex flex-col items-start justify-between sm:flex-row sm:space-y-0">
        <div className="flex flex-row justify-start items-start gap-5">
          <Avatar className="h-14 w-14 sm:flex">
            <AvatarImage
              src={job.companyLogoUrl || "/avatars/01.png"}
              className="rounded-none"
              alt="Avatar"
            />
            <AvatarFallback>JC</AvatarFallback>
          </Avatar>
          <div className="grid gap-1 text-start">
            <p className="text-xl font-semibold leading-none">
              {job.title}
            </p>
            <p className="text-base text-muted-foreground">
              {job.location}
            </p>
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