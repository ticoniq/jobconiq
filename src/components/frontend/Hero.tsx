"use client";
import Image from "next/image";
import flashline from "@/assets/images/Vector.png";
import { MapPinIcon, Search } from 'lucide-react';
import { InputFront } from "@/components/ui/inputFront";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/selectFront";

export default function Hero() {
  return (
    <section className="bg-neutrals-300 dark:bg-background dark:border-b-2 dark:border-neutrals-800">
      <div className="container flex flex-col justify-center items-start py-10 sm:py-20 space-y-7">
        <div className="text-7xl font-clash font-semibold leading-[5rem] max-w-md max-md:text-4xl max-md:leading-10">
          <div className="w-full max-md:max-w-full max-md:text-5xl max-leading-10">
            <h1 className="text-neutrals-900 text-shadow-custom dark:text-neutrals-300">Discover more than</h1>{" "}
            <span className="text-accents-blue text-shadow-custom">5000+ Jobs</span>
          </div>
          <Image
            src={flashline}
            alt="Job Search Illustration"
            width={344}
            height={32}
            className="mt-2 w-full"
            priority={true}
            style={{ width: 'auto', height: '36px' }}
          />
        </div>
        <div className="max-w-lg text-xl leading-8 font-Epilogue max-md:max-w-full">
          Great platform for the job seeker that searching for new career heights
          and passionate about startups.
        </div>

        <div className="bg-white drop-shadow-lg max-w-[53.5rem] p-5 w-full dark:bg-neutrals-300">
          <form action="">
            <div className="w-full grid grid-rows-3 grid-flow-col gap-5 md:grid-rows-1 md:grid-cols-5">
              <div className="flex items-center col-span-2 gap-5">
                <div className="flex-none">
                  <Search className="text-neutrals-900" size={24} />
                </div>
                <div className="grow grid items-center">
                  <InputFront type="email" id="email" className="w-full p-0" placeholder="Search by email" />
                </div>
              </div>

              <div className="flex items-center col-span-2 gap-5">
                <div className="flex-none">
                  <MapPinIcon className="text-neutrals-900" size={24} />
                </div>
                <div className="grow grid items-center">
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Florence, Italy</SelectItem>
                      <SelectItem value="dark">Florence, Italy</SelectItem>
                      <SelectItem value="system">Florence, Italy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="col-span-2 w-full md:w-auto md:col-span-1 place-self-center">
                <Button
                  className="w-full"
                  size={"lg"}
                >
                  Search my job
                </Button>
              </div>
            </div>
          </form>
        </div>
        <p className="text-base font-Epilogue font-medium">
          Popular : UI Designer, UX Researcher, Android, Admin
        </p>
      </div>
    </section>
  );
}