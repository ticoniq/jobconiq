import {
  Bell,
  Menu,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Logo } from "@/components/logo"
import UserButton from "@/components/auth/userButton"
import { SideBar } from "@/components/company/SideBar";
import Link from "next/link"

interface DashboardProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardProps) {

  return (
    <section className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[230px_1fr]">
      <aside className="hidden sticky top-0 z-50 h-screen bg-muted md:block">
        <div className="flex h-full min-h-screen flex-col gap-2">
          <div className="flex h-14 px-4 items-center justify-center border-r lg:h-24 lg:px-6">
            <Logo />
          </div>
          <div className="flex-1">
            <div className="flex flex-col justify-between space-y-10 items-center h-full">
              <SideBar />
              <div className="mx-auto p-2">
                <UserButton />
              </div>
            </div>
          </div>
        </div>
      </aside>
      <div className="flex flex-col">
        <header className="sticky top-0 z-50 flex h-14 items-center justify-between gap-4 bg-muted px-4 lg:h-24 lg:px-6">
          <Sheet>
            <div className="flex justify-center items-center gap-5">
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <h1 className="text-2xl font-semibold md:text-2xl uppercase font-clash">Dashboard</h1>
            </div>
            <SheetContent side="left" className="flex flex-col px-10 py-28 lg:hidden">
              <SheetHeader className="sr-only">
                <SheetTitle>Jobconiq</SheetTitle>
                <SheetDescription>Menu list</SheetDescription>
              </SheetHeader>
              <div className="flex flex-col justify-between space-y-10 items-center h-full">
                <SideBar />
                <div className="mx-auto p-2">
                  <UserButton />
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-96">
                <DropdownMenuLabel className="font-semibold text-xl">Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
            <Button asChild>
              <Link
                href="/company/create-job"
                className="space-x-2"
              >
                <Plus className="h-5 w-5" />
                Post a job
              </Link>
            </Button>
          </div>
        </header>
        {children}
      </div>
    </section>
  )
}
