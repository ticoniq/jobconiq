"use client";
import Title from "@/components/ui/title";

export default function BreadCrumb() {
  return (
    <section className="bg-neutrals-300 dark:bg-background dark:border-b dark:border-neutrals-800">
      <div className="container flex flex-col justify-center items-center py-10 sm:py-20 space-y-7">
        <Title titleText={"Find your"} highlightText={"dream job"} />
        <div className="text-xl leading-8 font-Epilogue max-md:max-w-full">
          Find your next career at companies like HubSpot, Nike, and Dropbox
        </div>
      </div>
    </section>
  );
}