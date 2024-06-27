import Footer from '@/components/Footer'
import { NavBar } from '@/components/NavBar'
import BreadCrumb from "@/components/frontend/BreadCrumb";
import { JobResult } from '@/components/frontend/Jobs'
import { JobFilterValues } from "@/lib/validation/Job-validation";
import { Metadata } from "next";

interface PageProps {
  searchParams: {
    q?: string;
    type?: string;
    location?: string;
    remote?: string;
    page?: string;
  };
  resultsFilter?: string,
}

function getTitle({ q, type, location, remote }: JobFilterValues) {
  const titlePrefix = q
    ? `${q} jobs`
    : type
      ? `${type} developer jobs`
      : remote
        ? "Remote developer jobs"
        : "All Jobs";

  const titleSuffix = location ? ` in ${location}` : "";

  return `${titlePrefix}${titleSuffix}`;
}

export function generateMetadata({
  searchParams: { q, type, location, remote },
}: PageProps): Metadata {
  return {
    title: `${getTitle({
      q,
      type,
      location,
      remote: remote === "true",
    })} | Jobconiq`,
  };
}


function JobsPage({
  searchParams: { q, type, location, remote, page },
}: PageProps) {
  const filterValues: JobFilterValues = {
    q,
    type,
    location,
    remote: remote === "true",
  };
  return (
    <>
      <NavBar />
      <BreadCrumb />
      <section className="container">
        <JobResult
          resultsFilter={getTitle(filterValues)}
          filterValues={filterValues}
          page={page ? parseInt(page) : undefined}
        />
      </section>
      <Footer />
    </>
  )
}

export default JobsPage