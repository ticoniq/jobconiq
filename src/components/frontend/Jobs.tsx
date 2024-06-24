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
import { Button } from '../ui/button';
import { ScrollArea } from "@/components/ui/scroll-area"

const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]

const filters = [
  {
    id: 'type-of-employment',
    name: 'Type of Employment',
    options: [
      { value: 'white', label: 'Full-time (3)', checked: false },
      { value: 'beige', label: 'Part-Time (5)', checked: false },
      { value: 'blue', label: 'Remote (2)', checked: true },
      { value: 'brown', label: 'Internship (24)', checked: false },
      { value: 'green', label: 'Contract (3)', checked: false },
    ],
  },
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'new-arrivals', label: 'New Arrivals', checked: false },
      { value: 'sale', label: 'Sale', checked: false },
      { value: 'travel', label: 'Travel', checked: true },
      { value: 'organization', label: 'Organization', checked: false },
      { value: 'accessories', label: 'Accessories', checked: false },
    ],
  },
  {
    id: 'job-level',
    name: 'Job Level',
    options: [
      { value: '2l', label: 'Entry Level (57)', checked: false },
      { value: '6l', label: 'Mid Level (3)', checked: false },
      { value: '12l', label: 'Senior Level (5)', checked: false },
      { value: '18l', label: 'Director (12)', checked: false },
      { value: '20l', label: 'VP or Above (8)', checked: false },
    ],
  },
  {
    id: 'salary-range',
    name: 'Salary Range',
    options: [
      { value: '2l', label: '$700 - $1000 (4)', checked: false },
      { value: '6l', label: '$700 - $1000 (4)', checked: false },
      { value: '12l', label: '$700 - $1000 (4)', checked: false },
      { value: '18l', label: '$700 - $1000 (4)', checked: false },
    ],
  },
]

export function JobsList() {
  return (
    <section className="pb-24 pt-6">

      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
        {/* Filters */}
        <form className="hidden lg:block">
          {filters.map((section) => (
            <div key={section.id}>
              <>
                <h3 className="-my-3 flow-root">
                  <div className="flex w-full items-center justify-between pt-10 text-sm">
                    <span className="font-medium text-primary">{section.name}</span>
                    <span className="ml-6 flex items-center">
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </div>
                </h3>
                <div className="mt-6">
                  <div className="space-y-4">
                    {section.options.map((option, optionIdx) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          id={`filter-${section.id}-${optionIdx}`}
                          name={`${section.id}[]`}
                          defaultValue={option.value}
                          type="checkbox"
                          defaultChecked={option.checked}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor={`filter-${section.id}-${optionIdx}`}
                          className="ml-3 text-sm text-primary"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            </div>
          ))}
        </form>

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
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle className="py-3">Filter</SheetTitle>
                    <SheetDescription className="sr-only">
                      Make changes to your profile here. Click save when you are done.
                    </SheetDescription>
                  </SheetHeader>
                  <ScrollArea className="h-full w-full">
                    <form className="block">
                      {filters.map((section) => (
                        <div key={section.id}>
                          <h3 className="-my-3 flow-root">
                            <div className="flex w-full items-center justify-between pt-10 text-sm text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">{section.name}</span>
                              <span className="ml-6 flex items-center">
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                            </div>
                          </h3>
                          <div className="mt-6">
                            <div className="space-y-4">
                              {section.options.map((option, optionIdx) => (
                                <div key={option.value} className="flex items-center">
                                  <input
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className="ml-3 text-sm text-gray-600"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </form>
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
