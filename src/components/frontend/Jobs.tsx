"use client";
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
  MinusIcon,
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

const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]

export function JobsList() {
  return (
    <section className="pb-24 pt-6">

      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
        {/* Filters */}
        <span className="hidden lg:block">
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
          <p>job listing goes here</p>
        </div>
      </div>
    </section>
  )
}
