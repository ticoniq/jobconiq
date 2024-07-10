import Footer from "@/components/Footer"
import Markdown from "@/components/Markdown";
import { NavBar } from "@/components/NavBar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CustomLink from "@/components/ui/custom-link";
import prisma from "@/lib/prisma";
import { formatDate, removeHttpsWww } from "@/lib/utils";
import { Facebook, Flame, Instagram, Linkedin, Mail, SettingsIcon, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import React, { cache } from 'react'

interface Props {
  params: {
    id: string
  }
}

const getCompanyDetails = cache(async (id: string) => {
  const companyDetails = await prisma.user.findUnique({
    where: { id },
    include: {
      companies: true,
      jobs: true,
    },
  });

  if (!companyDetails) {
    throw new Error('Company not found');
  }

  return companyDetails;
});

async function page({ params: { id } }: Props) {
  const companyDetails = await getCompanyDetails(id);

  return (
    <>
      <NavBar />
      <section className="bg-neutrals-300 dark:bg-background dark:border-b dark:border-neutrals-800">
        <div className="container">
          <div className="py-10 flex flex-col justify-start space-y-5 items-start lg:justify-between lg:flex-row md:py-20">
            <div className="pb-10 text-2xl flex flex-col gap-5 w-full font-clash font-semibold md:flex-row">
              <Avatar className="h-32 w-32 sm:flex rounded-none bg-transparent">
                <AvatarImage
                  src={companyDetails?.image || ""}
                  className="rounded-none bg-transparent"
                  alt="Avatar"
                />
                <AvatarFallback className="rounded-none uppercase bg-transparent">
                  {"JC"}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1 w-full flex flex-col justify-start items-start lg:justify-between lg:flex-row">
                <div className="space-y-3">
                  <div className="space-y-3">
                    <h1 className="text-3xl font-semibold">{companyDetails?.name}</h1>
                    <CustomLink
                      href={companyDetails?.companies[0]?.website || ""}
                      className="text-brand-primary"
                      textarea={companyDetails?.companies[0]?.website || ""}
                      divClassName="bg-brand-primary"
                      target="_blank"
                    />
                  </div>
                  <Breadcrumb className="font-normal">
                    <BreadcrumbList className="space-y-3 lg:space-x-5 lg:space-y-0">
                      <BreadcrumbItem>
                        <div className="flex justify-center items-center gap-3 text-foreground">
                          <div
                            className="rounded-full border border-neutrals-600 p-2 uppercase leading-normal">
                            <Flame className="w-6 h-6 text-brand-primary" />
                          </div>
                          <aside className="flex flex-col">
                            <span className="text-base leading-6">Founded</span>
                            <p className="text-sm font-semibold break-all">
                              {companyDetails?.companies[0]?.dateFounded ? (
                                <>
                                  {formatDate(companyDetails.companies[0]?.dateFounded)}
                                </>
                              ) : (
                                <>Not specified</>
                              )}
                            </p>
                          </aside>
                        </div>
                      </BreadcrumbItem>
                      <BreadcrumbItem>
                        <div className="flex justify-center items-center gap-3 text-foreground">
                          <div
                            className="rounded-full border border-neutrals-600 p-2 uppercase leading-normal">
                            <Flame className="w-6 h-6 text-brand-primary" />
                          </div>
                          <aside className="flex flex-col">
                            <span className="text-base leading-6">Employees</span>
                            <p className="text-sm font-semibold break-all">
                              {companyDetails?.companies[0]?.size ? companyDetails?.companies[0]?.size : "Not specified"}
                            </p>
                          </aside>
                        </div>
                      </BreadcrumbItem>
                      <BreadcrumbItem>
                        <div className="flex justify-center items-center gap-3 text-foreground">
                          <div
                            className="rounded-full border border-neutrals-600 p-2 uppercase leading-normal">
                            <Flame className="w-6 h-6 text-brand-primary" />
                          </div>
                          <aside className="flex flex-col">
                            <span className="text-base leading-6">Founded</span>
                            <p className="text-sm font-semibold break-all">
                              {companyDetails?.companies[0]?.dateFounded ? (
                                <>
                                  {formatDate(companyDetails.companies[0]?.dateFounded)}
                                </>
                              ) : (
                                <>Not specified</>
                              )}
                            </p>
                          </aside>
                        </div>
                      </BreadcrumbItem>
                      <BreadcrumbItem>
                        <div className="flex justify-center items-center gap-3 text-foreground">
                          <div
                            className="rounded-full border border-neutrals-600 p-2 uppercase leading-normal">
                            <Flame className="w-6 h-6 text-brand-primary" />
                          </div>
                          <aside className="flex flex-col">
                            <span className="text-base leading-6">Industry</span>
                            <p className="text-sm font-semibold break-all">
                              {companyDetails?.companies[0]?.industry ? companyDetails?.companies[0]?.industry : "Not specified"}
                            </p>
                          </aside>
                        </div>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container py-10 md:py-20">
        <div className="grid gap-8 md:gap-8 lg:grid-cols-1 xl:grid-cols-3">
          <Card className="xl:col-span-2 rounded-none bg-transparent border-none shadow-none">
            <CardContent className="p-0 divide-y divide-gray-100">
              <div className="pb-5 space-y-5">
                <CardHeader className="p-0 font-clash font-semibold text-xl">
                  <CardTitle className="text-xl tracking-wide">Company Profile</CardTitle>
                </CardHeader>
                <div>{companyDetails?.companies[0]?.bio && <Markdown>{companyDetails?.companies[0]?.bio}</Markdown>}</div>
              </div>
              <div className="py-5">
                <CardHeader className="p-0 font-clash font-semibold text-xl">
                  <CardTitle className="text-xl tracking-wide">Contact</CardTitle>
                </CardHeader>
                <div className="mt-4 w-full text-sm leading-6 flex gap-2 flex-wrap">
                  {companyDetails?.companies[0]?.twitter ? (
                    <>
                      <Button
                        variant={"outline"}
                      >
                        <Link
                          href={companyDetails?.companies[0]?.twitter || "Not specified"}
                          className="flex items-center gap-2"
                          target="_blank"
                        >
                          <Twitter />
                          <span>{removeHttpsWww(companyDetails?.companies[0]?.twitter || "") || "Not specified"}</span>
                        </Link>
                      </Button>
                    </>
                  ) : (
                    <></>
                  )}
                  {companyDetails?.companies[0]?.facebook ? (
                    <>
                      <Button
                        variant={"outline"}
                      >
                        <Link
                          href={companyDetails?.companies[0]?.facebook || "Not specified"}
                          className="flex items-center gap-2"
                          target="_blank"
                        >
                          <Facebook />
                          <span>{removeHttpsWww(companyDetails?.companies[0]?.facebook || "") || "Not specified"}</span>
                        </Link>
                      </Button>
                    </>
                  ) : (
                    <></>
                  )}
                  {companyDetails?.companies[0]?.instagram ? (
                    <>
                      <Button
                        variant={"outline"}
                      >
                        <Link
                          href={companyDetails?.companies[0]?.instagram || "Not specified"}
                          className="flex items-center gap-2"
                          target="_blank"
                        >
                          <Instagram />
                          <span>{removeHttpsWww(companyDetails?.companies[0]?.instagram || "") || "Not specified"}</span>
                        </Link>
                      </Button>
                    </>
                  ) : (
                    <></>
                  )}
                  {companyDetails?.companies[0]?.youtube ? (
                    <>
                      <Button
                        variant={"outline"}
                      >
                        <Link
                          href={companyDetails?.companies[0]?.youtube || "Not specified"}
                          className="flex items-center gap-2"
                          target="_blank"
                        >
                          <Youtube />
                          <span>{removeHttpsWww(companyDetails?.companies[0]?.youtube || "") || "Not specified"}</span>
                        </Link>
                      </Button>
                    </>
                  ) : (
                    <></>
                  )}
                  {companyDetails?.companies[0]?.linkedin ? (
                    <>
                      <Button
                        variant={"outline"}
                      >
                        <Link
                          href={companyDetails?.companies[0]?.linkedin || "Not specified"}
                          target="_blank"
                          className="flex items-center gap-2"
                        >
                          <Linkedin />
                          <span>{removeHttpsWww(companyDetails?.companies[0]?.linkedin || "") || "Not specified"}</span>
                        </Link>
                      </Button>
                    </>
                  ) : (
                    <></>
                  )}
                  {companyDetails?.email ? (
                    <>
                      <Button
                        variant={"outline"}
                      >
                        <Link
                          href={companyDetails?.email || "Not specified"}
                          target="_blank"
                          className="flex items-center gap-2"
                        >
                          <Mail />
                          <span>{removeHttpsWww(companyDetails?.email || "") || "Not specified"}</span>
                        </Link>
                      </Button>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="py-5">
                <CardHeader className="p-0 font-clash font-semibold text-xl">
                  <CardTitle className="text-xl tracking-wide">Team</CardTitle>
                </CardHeader>
                <div className="mt-4">
                  <p>Team is coming soon...</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-none bg-transparent border-none shadow-none">
            <CardContent className="p-0 divide-y divide-gray-100">
              <div className="pb-5">
                <CardHeader className="p-0 font-clash font-semibold text-xl">
                  <CardTitle className="text-xl tracking-wide">Tech Stack</CardTitle>
                </CardHeader>
                <p className="mt-4 text-sm leading-6">Learn about the technology and tools that {companyDetails?.name} uses. </p>
                <div className="mt-4 w-full text-sm leading-6 flex gap-2 flex-wrap">
                  {companyDetails?.companies[0]?.techStack.map((stack) => (
                    <span
                      key={stack}
                      className="rounded-md whitespace-nowrap text-ellipsis px-2 font-normal"
                    >
                      {stack.charAt(0).toUpperCase() + stack.slice(1)}
                    </span>
                  ))}
                </div>
              </div>
              <div className="py-5">
                <CardHeader className="p-0 font-clash font-semibold text-xl">
                  <CardTitle className="text-xl tracking-wide">Office Location</CardTitle>
                </CardHeader>
                <p className="mt-4">{companyDetails?.companies[0]?.location ? companyDetails?.companies[0]?.location : "Not specified"}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default page