import { formatDate, formatMoney } from "@/lib/utils";
import { Job } from "@prisma/client";
import Markdown from "@/components/Markdown";
import { Badge } from "@/components/ui/badge";

interface JobPageProps {
  job: Job;
}

export default function JobPage({
  job: {
    description,
    type,
    salary,
    createdAt,
  },
}: JobPageProps) {
  return (
    <section className="container pt-16 ">
      <div className="space-y-10 lg:flex lg:gap-x-10 lg:space-y-0">
        <div className="lg:flex-auto">
          <section className="w-full grow space-y-5">
            <div>{description && <Markdown>{description}</Markdown>}</div>
          </section>
        </div>
        <aside className="w-full lg:w-full lg:max-w-sm">
          <div className="lg:flex lg:flex-col">
            <div className="w-full lg:max-w-xs">
              <dl className="divide-y divide-gray-100">
                <div className="pb-8">
                  <dt className="text-2xl font-clash font-semibold">About this role</dt>
                  <dd className="mt-4 text-sm leading-6 space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm leading-6">Apply Before</span>
                      <span className="text-sm font-semibold leading-6">Backend Developer</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm leading-6">Job Posted On</span>
                      <span className="text-sm font-semibold leading-6">{formatDate(createdAt)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm leading-6">Job Type</span>
                      <span className="text-sm font-semibold leading-6">{type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm leading-6">Salary</span>
                      <span className="text-sm font-semibold leading-6">{formatMoney(salary)}</span>
                    </div>
                  </dd>
                </div>
                <div className="py-8">
                  <dt className="text-2xl font-clash font-semibold">Categories</dt>
                  <dd className="mt-4 text-sm leading-6 space-x-2 flex-wrap">
                    <Badge variant={"warning"}>Marketing</Badge>
                    <Badge variant={"secondary"}>Design</Badge>
                  </dd>
                </div>
                <div className="py-8">
                  <dt className="text-2xl font-clash font-semibold">Required Skills</dt>
                  <dd className="mt-4 w-full text-sm leading-6 flex gap-2 flex-wrap">
                    <Badge variant={"info"} className="rounded-md whitespace-nowrap text-ellipsis px-2 font-normal">Project Management</Badge>
                    <Badge variant={"info"} className="rounded-md whitespace-nowrap text-ellipsis px-2 font-normal">Copywriting</Badge>
                    <Badge variant={"info"} className="rounded-md whitespace-nowrap text-ellipsis px-2 font-normal">Social Media Marketing</Badge>
                    <Badge variant={"info"} className="rounded-md whitespace-nowrap text-ellipsis px-2 font-normal">English</Badge>
                    <Badge variant={"info"} className="rounded-md whitespace-nowrap text-ellipsis px-2 font-normal">Copy Editing</Badge>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </aside>
      </div>
    </section >
  );
}