"use client";
import Link from "next/link";
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
  SheetDescription
} from "@/components/ui/sheet";
import { Logo } from "@/components/logo";

interface NavigationItem {
  name: string;
  href: string;
}

const navigation: NavigationItem[] = [
  { name: 'Find Jobs', href: '#' },
  { name: 'Browse Companies', href: '#' },
];

export function NavBar() {
  return (
    <section className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background">
      <header className="container flex items-center justify-between h-20">
        <nav className="w-full flex items-center justify-between" aria-label="Global">
          <div className="flex items-center justify-start gap-x-8 lg:flex-1">
            <Logo />
            <div className="hidden lg:flex lg:gap-x-5">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href} className="text-base font-semibold text-neutrals-800 leading-6 dark:text-neutrals-300">
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden lg:flex lg:gap-5">
            <Button variant="link" className="border-r-2 border-gray-300" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <div className="bg-gray-500 w-full h-[1px] lg:hidden"></div>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 lg:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="px-10 py-28 lg:hidden">
            <SheetHeader className="sr-only">
              <SheetTitle>Jobconiq</SheetTitle>
              <SheetDescription>Menu list</SheetDescription>
            </SheetHeader>
            <aside className="flex flex-col justify-between h-full">
              <nav className="grid gap-6 text-lg font-medium">
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href} className="text-base font-semibold text-neutrals-800 leading-6 dark:text-neutrals-300">
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="flex flex-col gap-5">
                <Button variant="link" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            </aside>
          </SheetContent>
        </Sheet>
      </header>
    </section>
  )
}
