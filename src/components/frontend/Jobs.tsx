import prisma from "@/lib/prisma";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  ChevronDownIcon,
  FilterIcon,
  Grid2X2Icon
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Filter } from '@/components/Filter';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Fragment } from "react";
import JobListItems from "./JobListItems";
import { JobFilterValues } from "@/lib/validation/Job-validation";
import { Prisma } from "@prisma/client";
import { Pagination } from "./Pagination";

const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]

interface JobResultsProps {
  filterValues: JobFilterValues;
  page?: number;
  resultsFilter?: string;
}

export async function JobResult({
  filterValues,
  page = 1,
  resultsFilter,
}: JobResultsProps) {
  const { q, type, location, remote } = filterValues;

  const jobsPerPage = 6;
  const skip = (page - 1) * jobsPerPage;

  const searchString = q
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  const searchFilter: Prisma.JobWhereInput = searchString
    ? {
      OR: [
        { title: { contains: searchString } },
        { companyName: { contains: searchString } },
        { type: { contains: searchString } },
        { locationType: { contains: searchString } },
        { location: { contains: searchString } },
      ],
    }
    : {};

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      location ? { location } : {},
      remote ? { locationType: "Remote" } : {},
      { approved: true },
    ],
  };

  const jobsPromise = prisma.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: jobsPerPage,
    skip,
  });

  const countPromise = prisma.job.count({ where });

  const [jobs, totalResults] = await Promise.all([jobsPromise, countPromise]);

  return (
    <section className="pb-24 pt-6">

      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
        {/* Filters */}
        <span className="hidden lg:block sticky top-20 h-fit">
          <Filter defaultValues={filterValues} />
        </span>

        <div className="lg:col-span-3 text-center">
          <div className="flex items-baseline justify-between py-6">
            <h3 className="text-2xl font-semibold font-clash text-primary">{resultsFilter}</h3>

            <div className="flex items-center">

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Grid2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>

              {/* Mobile filter dialog */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  >
                    <span className="sr-only">Filters</span>
                    <FilterIcon className="h-5 w-5" aria-hidden="true" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="lg:hidden">
                  <SheetHeader>
                    <SheetTitle className="py-3">Filter</SheetTitle>
                    <SheetDescription className="sr-only">
                      Make changes to your profile here. Click save when you are done.
                    </SheetDescription>
                  </SheetHeader>
                  <ScrollArea className="h-5/6 w-full">
                    <span className="block lg:hidden">
                      <Filter defaultValues={filterValues} />
                    </span>
                  </ScrollArea>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          <article className="space-y-5">
            {jobs.map((job) => (
              <Fragment key={job.id}>
                <JobListItems job={job} />
              </Fragment>
            ))}
            {jobs.length === 0 && (
              <p className="m-auto text-center">
                No jobs found. Try adjusting your search filters.
              </p>
            )}
            {jobs.length > 0 && (
              <Pagination
                currentPage={page}
                totalPages={Math.ceil(totalResults / jobsPerPage)}
                filterValues={filterValues}
              />
            )}
          </article>
        </div>
      </div>
    </section>
  )
}
