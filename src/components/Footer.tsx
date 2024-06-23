import Image from "next/image";
import Logo from "@/assets/images/logo-2.png";
import Link from "next/link";
import { Facebook } from "lucide-react";
import CustomLink from "@/components/ui/custom-link";
import { ModeToggle } from "@/components/ModeToggle";

type Props = {}

export default function Footer({ }: Props) {
  return (
    <footer className="bg-neutrals-900 pb-6 pt-14">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 sm:w-2/3 lg:w-4/12">
            <div className="mb-10 w-full flex flex-col justify-start items-start text-neutrals-300">
              <Link
                href="#"
                className="mb-6 inline-block max-w-[160px]"
              >
                <Image
                  src={Logo}
                  alt="logo"
                  className="max-w-full"
                />
              </Link>
              <p className="mb-7 text-base">
                Great platform for the job seeker that passionate about startups. Find your dream job easier.
              </p>
              <div>
                <ModeToggle />
              </div>
            </div>
          </div>
          <div className="px-4 w-1/2 lg:w-2/12">
            <div className="mb-10 w-full">
              <h4 className="mb-9 text-lg font-semibold text-white">
                About
              </h4>
              <ul className="space-y-3">
                <li><CustomLink href="#" textarea="Companies" /></li>
                <li><CustomLink href="#" textarea="Pricing" /></li>
                <li><CustomLink href="#" textarea="Terms" /></li>
                <li><CustomLink href="#" textarea="Advice" /></li>
                <li><CustomLink href="#" textarea="Privacy Policy" /></li>
              </ul>
            </div>
          </div>
          <div className="px-4 w-1/2 lg:w-2/12">
            <div className="mb-10 w-full">
              <h4 className="mb-9 text-lg font-semibold text-white">
                Resources
              </h4>
              <ul className="space-y-3">
                <li><CustomLink href="#" textarea="Help Docs" /></li>
                <li><CustomLink href="#" textarea="Guide" /></li>
                <li><CustomLink href="#" textarea="Updates" /></li>
                <li><CustomLink href="#" textarea="Contact Us" /></li>
              </ul>
            </div>
          </div>
          <div className="px-4 w-1/2 lg:w-2/12">
            <div className="mb-10 w-full">
              <h4 className="mb-9 text-lg font-semibold text-white">
                For developers
              </h4>
              <ul className="space-y-3">
                <li><CustomLink href="#" textarea="Help Docs" /></li>
                <li><CustomLink href="#" textarea="Guide" /></li>
                <li><CustomLink href="#" textarea="Updates" /></li>
                <li><CustomLink href="#" textarea="Contact Us" /></li>
              </ul>
            </div>
          </div>
          <div className="px-4 w-1/2 lg:w-2/12">
            <div className="mb-10 w-full">
              <h4 className="mb-9 text-lg font-semibold text-white">
                Company
              </h4>
              <ul className="space-y-3">
                <li><CustomLink href="#" textarea="Help Docs" /></li>
                <li><CustomLink href="#" textarea="Guide" /></li>
                <li><CustomLink href="#" textarea="Updates" /></li>
                <li><CustomLink href="#" textarea="Contact Us" /></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-100 pt-6">
          <div className="text-center sm:flex sm:justify-between sm:text-left">
            <div className="mb-6 flex items-center gap-4">
              {/* <aside className="space-x-5">
                  <Button variant="link" className="p-0">
                    <Link
                      className="inline-block text-white transition ease-linear"
                      href="#"
                    >
                      Terms & Conditions
                    </Link>
                  </Button>
                  <Button variant="link" className="p-0">
                    <Link
                      className="inline-block text-white transition"
                      href="#"
                    >
                      Privacy Policy
                    </Link>
                  </Button>
                </aside> */}
              <Link
                href="javascript:void(0)"
                className="mr-3 flex h-8 w-8 items-center justify-center rounded-full border border-stroke text-dark hover:border-primary sm:mr-4 lg:mr-3 xl:mr-4"
              >
                <Facebook />
              </Link>
            </div>
            <p className="mt-4 text-base text-white sm:order-first sm:mt-0">2024 &copy; <Link href="/">JobHuntly</Link>. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}