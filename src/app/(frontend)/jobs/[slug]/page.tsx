import Footer from "@/components/Footer"
import { NavBar } from "@/components/NavBar"
import Feature from "@/components/frontend/Feature";
import JobPage from "@/components/frontend/JobPage";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { Dot, Slash, Share2 } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PageProps {
  params: { slug: string };
}

const getJob = cache(async (slug: string) => {
  const job = await prisma.job.findUnique({
    where: { slug },
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
}: PageProps): Promise<Metadata> {
  const job = await getJob(slug);

  return {
    title: job.title,
  };
}

async function Page({ params: { slug } }: PageProps) {
  const job = await getJob(slug);

  const { applicationEmail, applicationUrl } = job;

  const applicationLink = applicationEmail
    ? `mailto:${applicationEmail}`
    : applicationUrl;

  if (!applicationLink) {
    notFound();
  }

  return (
    <>
      <NavBar />
      <section className="bg-neutrals-300 dark:bg-background dark:border-b dark:border-neutrals-800">
        <div className="container flex flex-col justify-center items-start py-10 sm:py-20 space-y-7">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/jobs">Jobs</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>{job.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="bg-white drop-shadow-lg max-w-full p-5 w-full dark:bg-neutrals-300">
            <div className="flex flex-col justify-start space-y-5 items-start lg:justify-between lg:items-center lg:flex-row">
              <div className="text-2xl flex items-center gap-5 font-clash font-semibold">
                <Avatar className="h-14 w-14 sm:flex rounded-none">
                  <AvatarImage
                    src={job.companyLogoUrl || "/avatars/01.png"}
                    className="rounded-none"
                    alt="Avatar"
                  />
                  <AvatarFallback className="rounded-none">JC</AvatarFallback>
                </Avatar>
                <div className="text-neutrals-900 space-y-1">
                  <h1 className="text-xl font-bold">{job.title}</h1>
                  <Breadcrumb className="font-normal">
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink>{job.companyName}</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator>
                        <Dot />
                      </BreadcrumbSeparator>
                      <BreadcrumbItem>
                        <BreadcrumbLink>{job.locationType}</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator>
                        <Dot />
                      </BreadcrumbSeparator>
                      <BreadcrumbItem>
                        <BreadcrumbLink>{job.location || "Worldwide"}</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator>
                        <Dot />
                      </BreadcrumbSeparator>
                      <BreadcrumbItem>
                        <BreadcrumbLink>{job.type}</BreadcrumbLink>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
              </div>
              <aside className="flex gap-5">
                <Button
                  variant={"ghost"}
                  asChild
                  className="p-0"
                >
                  <a href={applicationLink} target="_blank">
                    <Share2 className="w-6 h-6" />
                  </a>
                </Button>
                <div className="border-r-2" />
                <Button asChild>
                  <a href={applicationLink} className="px-8">
                    Apply
                  </a>
                </Button>
              </aside>
            </div>
          </div>
        </div>
      </section>
      <JobPage job={job} />
      <Feature />
      <Footer />
    </>
  )
}

export default Page