import Footer from '@/components/Footer';
import { NavBar } from '@/components/NavBar';
import BreadCrumb from "@/components/frontend/BreadCrumb";
import { JobResult } from '@/components/frontend/Jobs';
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

function FindJobsPage({
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
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-10">
        <div className="flex flex-col justify-start items-start space-y-2">
          <h3 className="text-lg font-clash font-semibold md:text-2xl">Find your dream job</h3>
        </div>
        <JobResult
          resultsFilter={getTitle(filterValues)}
          filterValues={filterValues}
          page={page ? parseInt(page, 10) : undefined}
        />
      </main>
    </>
  );
}

export default FindJobsPage;
