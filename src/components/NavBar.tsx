"use client";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react"
import logo from "@/assets/images/logo.png";
import logoLight from "@/assets/images/logo-2.png";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
  SheetDescription
} from "@/components/ui/sheet";

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
            <Link href="/">
              <span className="sr-only">JobConiq</span>
              <Image
                src={logo}
                alt="JobConiq Logo"
                width={160}
                height={32}
                priority
                className="block dark:hidden"
              />
              <Image
                src={logoLight}
                alt="JobConiq Logo"
                width={160}
                height={32}
                priority
                className="hidden dark:block"
              />
            </Link>

            <div className="hidden lg:flex lg:gap-x-5">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href} className="text-base font-semibold text-gray-900 leading-6">
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
            <nav className="grid gap-6 text-lg font-medium">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href} className="text-base font-semibold text-gray-900 leading-6">
                  {item.name}
                </Link>
              ))}
              <Link href="#" className="hover:text-foreground">
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </header>
    </section>
  )
}
