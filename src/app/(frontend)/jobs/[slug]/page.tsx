import Footer from "@/components/Footer"
import { NavBar } from "@/components/NavBar"
import JobPage from "@/components/frontend/JobPage";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

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
    console.error("Job has no application link or email");
    notFound();
  }

  return (
    <>
      <NavBar />
      <section className="container my-10 flex flex-col items-center gap-5 px-3 md:flex-row md:items-start">
        <JobPage job={job} />
        <aside>
          <Button asChild>
            <a href={applicationLink} className="w-40 md:w-fit">
              Apply now
            </a>
          </Button>
        </aside>
      </section>
      <Footer />
    </>
  )
}

export default Page