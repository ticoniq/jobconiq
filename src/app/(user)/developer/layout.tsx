"use client";
import Link from "next/link"
import {
  CircleUser,
  Home,
  Menu,
  MessageSquareText,
  LayoutDashboard,
  Settings,
  CircleHelp
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
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DashboardProps {
  children: React.ReactNode;
}

const navigation = [
  { name: "Dashboard", href: "/developer/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
  { name: "Messages", href: "/developer/message", icon: <MessageSquareText className="h-4 w-4" /> },
];
const settings = [
  { name: "Settings", href: "/developer/settings", icon: <Settings className="h-4 w-4" /> },
  { name: "Help", href: "/developer/help", icon: <CircleHelp className="h-4 w-4" /> },
];

export default function DashboardLayout({ children }: DashboardProps) {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const lastSegment = segments[segments.length - 1];

  return (
    <section className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[230px_1fr]">
      <aside className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full min-h-screen flex-col gap-2">
          <div className="flex h-14 px-4 items-center justify-center border-b lg:h-24 lg:px-6">
            <Logo />
          </div>
          <div className="flex-1">
            <div className="flex flex-col justify-between space-y-10 items-center h-full">
              <nav className="w-full grid items-start space-y-2 text-sm font-medium">
                {navigation.map((item) => (
                  <div key={item.name} className="flex justify-start items-center group/item">
                    <p className={`border-r-[3.5px] h-[28px] border-brand-primary group/edt 
                      ${pathname === item.href ? 'visible' : 'invisible group-hover/item:visible'}`} />
                    <Link
                      href={item.href}
                      className={`w-full mx-2 flex items-center justify-start px-5 gap-3 rounded-lg py-2 transition-all hover:text-brand-primary hover:bg-blue-100
                    ${pathname === item.href ? "bg-blue-100 text-brand-primary" : ""}`}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  </div>
                ))}
                <div className="py-6">
                  <span className="border-t border-primary block" />
                </div>
                <p className="px-8 font-semibold text-sm">SETTINGS</p>
                {settings.map((item) => (
                  <div key={item.name} className="flex justify-start items-center group/item">
                    <p className={`border-r-[3.5px] h-[28px] border-brand-primary group/edt 
                      ${pathname === item.href ? 'visible' : 'invisible group-hover/item:visible'}`} />
                    <Link
                      href={item.href}
                      className={`w-full mx-2 flex items-center font-medium justify-start px-5 gap-3 rounded-lg py-2 transition-all hover:text-brand-primary hover:bg-blue-100
                    ${pathname === item.href ? "bg-blue-100 text-brand-primary" : ""}`}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  </div>
                ))}
              </nav>
              <div className="mx-auto p-2">
                <div className="flex items-center gap-1">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/avatars/01.png" alt="Avatar" />
                    <AvatarFallback>JC</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      Olivia Martin
                    </p>
                    <p className="text-xs text-muted-foreground line">
                      olivia.martin@email.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
      <div className="flex flex-col">
        <header className="flex h-14 items-center justify-between gap-4 border-b bg-muted/40 px-4 lg:h-24 lg:px-6">
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
              <h1 className="text-2xl font-semibold md:text-2xl uppercase font-clash">{lastSegment}</h1>
            </div>
            <SheetContent side="left" className="flex flex-col px-10 py-28 lg:hidden">
              <SheetHeader className="sr-only">
                <SheetTitle>Jobconiq</SheetTitle>
                <SheetDescription>Menu list</SheetDescription>
              </SheetHeader>
              <div className="flex flex-col justify-between space-y-10 items-center h-full">
                <nav className="w-full grid items-start space-y-2 text-sm font-medium">
                  {navigation.map((item) => (
                    <div key={item.name} className="flex justify-start items-center group/item">
                      <p className={`border-r-[3.5px] h-[28px] border-brand-primary group/edt 
                      ${pathname === item.href ? 'visible' : 'invisible group-hover/item:visible'}`} />
                      <Link
                        href={item.href}
                        className={`w-full mx-2 flex items-center justify-start px-5 gap-3 rounded-lg py-2 transition-all hover:text-brand-primary hover:bg-blue-100
                    ${pathname === item.href ? "bg-blue-100 text-brand-primary" : ""}`}
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </Link>
                    </div>
                  ))}
                  <div className="py-6">
                    <span className="border-t border-primary block" />
                  </div>
                  <p className="px-8 font-semibold text-sm">SETTINGS</p>
                  {settings.map((item) => (
                    <div key={item.name} className="flex justify-start items-center group/item">
                      <p className={`border-r-[3.5px] h-[28px] border-brand-primary group/edt 
                      ${pathname === item.href ? 'visible' : 'invisible group-hover/item:visible'}`} />
                      <Link
                        href={item.href}
                        className={`w-full mx-2 flex items-center font-medium justify-start px-5 gap-3 rounded-lg py-2 transition-all hover:text-brand-primary hover:bg-blue-100
                    ${pathname === item.href ? "bg-blue-100 text-brand-primary" : ""}`}
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </Link>
                    </div>
                  ))}
                </nav>
                <div className="mx-auto p-2">
                  <div className="flex items-center gap-1">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/avatars/01.png" alt="Avatar" />
                      <AvatarFallback>JC</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        Olivia Martin
                      </p>
                      <p className="text-xs text-muted-foreground line">
                        olivia.martin@email.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        {children}
      </div>
    </section>
  )
}
