"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ArrowUpDown, ChevronDown, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatDate } from "@/lib/utils"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Applicant {
  id: string
  name: string
  image: string
  status: string
  jobTitle: string
  slugg: string
  appliedAt: Date
}

const columns: ColumnDef<Applicant>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <p>#</p>
    ),
    cell: ({ row }) => <p>{row.index + 1}</p>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Company Name",
    cell: ({ row }) => {
      const applicant = row.original;

      return (
        <div className="flex items-center gap-4">
          <Avatar className="hidden h-12 w-12 sm:flex">
            <AvatarImage src={applicant.image} alt={`Avatar of ${applicant.name}`} />
            <AvatarFallback>JC</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">
              {row.getValue("name")}
            </p>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "jobTitle",
    header: "Roles",
    cell: ({ row }) => {
      return (
        <>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="w-36 truncate">
                {row.getValue("jobTitle")}
              </TooltipTrigger>
              <TooltipContent>
                <p>{row.getValue("jobTitle")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

        </>
      )
    },
  },
  {
    accessorKey: "appliedAt",
    header: "Date Applied",
    cell: ({ row }) => <div>{formatDate(row.getValue("appliedAt"))}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      const getBadgeClasses = (status: string) => {
        const baseClasses = "px-2 py-1 rounded-full text-xs font-semibold";
        switch (status.toLowerCase()) {
          case "in review":
            return `${baseClasses} border border-yellow-500 bg-yellow-500/10 text-yellow-500`;
          case "shortlisted":
            return `${baseClasses} bg-blue-100 text-blue-800 border border-blue-500`;
          case "declined":
            return `${baseClasses} border border-red-500 bg-red-500/10 text-red-500`;
          case "hired":
            return `${baseClasses} border border-green-500 bg-green-500/10 text-green-500`;
          case "interviewing":
            return `${baseClasses} border border-blue-300 bg-blue-300/10 text-blue-300`;
          default:
            return `${baseClasses} bg-gray-100 text-gray-800 border border-gray-300`;
        }
      };

      return (
        <span className={getBadgeClasses(row.getValue("status"))}>
          {row.getValue("status")}
        </span>
      );
    }
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Action",
    cell: ({ row }) => {
      const applicant = row.original

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View job details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )
    },
  },
]

interface ApplicationTableProps {
  applicants: Applicant[]
}

export function ApplicationTable({ applicants }: ApplicationTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: applicants,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center p-4 border border-brand-secondary">
        <Input
          placeholder="Filter names..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-[15rem]"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="border border-brand-secondary">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center space-x-2 p-4">
        <div className="space-x-2">
          <Button
            className="rounded-sm"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </Button>
          <Button
            className="rounded-sm"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  )
}