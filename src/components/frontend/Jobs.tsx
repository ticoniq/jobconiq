import prisma from "@/lib/prisma";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
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
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { formatMoney } from "@/lib/utils";

const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]

export async function JobsList() {
  const jobs = prisma.job.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <section className="pb-24 pt-6">

      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
        {/* Filters */}
        <span className="hidden lg:block sticky top-10 h-fit">
          <Filter />
        </span>

        <div className="lg:col-span-3 text-center">
          <div className="flex items-baseline justify-between py-6">
            <h3 className="text-2xl font-semibold font-clash text-primary">All Jobs</h3>

            <div className="flex items-center">
              <DropdownMenu>
                <div className="relative inline-block text-left">
                  <DropdownMenuTrigger className="group inline-flex justify-center text-sm font-medium">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </DropdownMenuTrigger>
                </div>

                <DropdownMenuContent
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <DropdownMenuGroup key={option.name}>
                        <DropdownMenuItem>
                          {option.name}
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

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
                      <Filter />
                    </span>
                  </ScrollArea>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          <article className="space-y-5">
            {(await jobs).map((job) => (
              <Fragment key={job.id}>
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
              </Fragment>
            ))}
          </article>
        </div>
      </div>
    </section>
  )
}
