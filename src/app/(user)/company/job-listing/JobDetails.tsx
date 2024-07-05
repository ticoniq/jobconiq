import JobPage from "@/components/frontend/JobPage";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { SquarePen } from "lucide-react";

interface JobDetailsProps {
  params: { slug: string };
}

const getJob = cache(async (slug: string) => {
  const job = await prisma.job.findUnique({
    where: { slug },
    include: { user: true },
  });

  if (!job) notFound();

  return job;
});

export async function generateStaticParams() {
  const jobs = await prisma.job.findMany({
    where: { approved: true },
    select: { slug: true },

  });

  return jobs.map(({ slug }) => slug);
}

export async function generateMetadata({
  params: { slug },
}: JobDetailsProps): Promise<Metadata> {
  const job = await getJob(slug);

  return {
    title: job.title,
  };
}

export async function JobDetails({ params: { slug } }: JobDetailsProps) {
  const job = await getJob(slug);

  return (
    <>
      <section className="bg-neutrals-300 dark:bg-background">
        <div className="container mt-10">
          <div className="flex flex-col space-y-4 justify-between items-start bg-white drop-shadow-lg max-w-full p-5 w-full dark:bg-neutrals-300 md:flex-row md:items-center">
            <div className="text-2xl flex items-center gap-5 font-clash font-semibold">
              <Avatar className="h-14 w-14 sm:flex rounded-none">
                <AvatarImage
                  src={job.user?.image || "/avatars/01.png"}
                  className="rounded-none"
                  alt="Avatar"
                />
                <AvatarFallback className="rounded-none uppercase">
                  {`${job.user?.name?.[0]}${job.user?.name?.[1]}` || "JC"}
                </AvatarFallback>
              </Avatar>
              <div className="text-neutrals-900 space-y-1">
                <h1 className="text-xl font-bold">{job.title}</h1>
              </div>
            </div>
            <aside className="flex gap-5">
              <Button
                asChild
                variant={"outline"}
              >
                <Link href={"/"} className="px-8 space-x-2">
                  <SquarePen className="h-4 w-4" />
                  <p>Edit Job Details</p>
                </Link>
              </Button>
            </aside>
          </div>
        </div>
      </section>
      <JobPage job={job} />
    </>
  )
}