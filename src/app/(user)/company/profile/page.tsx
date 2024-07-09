import Markdown from "@/components/Markdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CustomLink from "@/components/ui/custom-link";
import { currentUser } from "@/lib/auths";
import prisma from "@/lib/prisma";
import { calculateAge, formatDate, removeHttpsWww } from "@/lib/utils";
import { Facebook, Flame, Instagram, Linkedin, Mail, SettingsIcon, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

async function ProfilePage() {
  const activeUser = await currentUser();

  const companyDetails = await prisma.company.findUnique({
    where: { userId: activeUser?.id },
  });

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-10">
      <div className="w-full">
        <div className="flex flex-col justify-start space-y-5 items-start lg:justify-between lg:flex-row">
          <div className="pb-10 border-b border-brand-secondary text-2xl flex gap-5 w-full font-clash font-semibold">
            <Avatar className="h-32 w-32 sm:flex rounded-none bg-transparent">
              <AvatarImage
                src={activeUser?.image || ""}
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
                  <h1 className="text-3xl font-semibold">{activeUser?.name}</h1>
                  <CustomLink
                    href={companyDetails?.website || ""}
                    className="text-brand-primary"
                    textarea={companyDetails?.website || ""}
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
                            {companyDetails?.dateFounded ? (
                              <>
                                {formatDate(companyDetails.dateFounded)}
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
                            {companyDetails?.size ? companyDetails?.size : "Not specified"}
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
                            {companyDetails?.dateFounded ? (
                              <>
                                {formatDate(companyDetails.dateFounded)}
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
                            {companyDetails?.industry ? companyDetails?.industry : "Not specified"}
                          </p>
                        </aside>
                      </div>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <aside className="flex gap-5">
                <Button
                  asChild
                  variant={"outline"}
                >
                  <Link href={"/company/settings"} className="space-x-2">
                    <SettingsIcon className="w-5 h-5" />
                    <span>Profile Settings</span>
                  </Link>
                </Button>
              </aside>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-8 md:gap-8 lg:grid-cols-1 xl:grid-cols-3">
        <Card className="xl:col-span-2 rounded-none bg-transparent border-none shadow-none">
          <CardContent className="p-0 divide-y divide-gray-100">
            <div className="pb-5 space-y-5">
              <CardHeader className="p-0 font-clash font-semibold text-xl">
                <CardTitle className="text-xl tracking-wide">Company Profile</CardTitle>
              </CardHeader>
              <div>{companyDetails?.bio && <Markdown>{companyDetails?.bio}</Markdown>}</div>
            </div>
            <div className="py-5">
              <CardHeader className="p-0 font-clash font-semibold text-xl">
                <CardTitle className="text-xl tracking-wide">Contact</CardTitle>
              </CardHeader>
              <div className="mt-4 w-full text-sm leading-6 flex gap-2 flex-wrap">
                {companyDetails?.twitter ? (
                  <>
                    <Button
                      variant={"outline"}
                    >
                      <Link
                        href={companyDetails?.twitter || "Not specified"}
                        className="flex items-center gap-2"
                        target="_blank"
                      >
                        <Twitter />
                        <span>{removeHttpsWww(companyDetails?.twitter || "") || "Not specified"}</span>
                      </Link>
                    </Button>
                  </>
                ) : (
                  <></>
                )}
                {companyDetails?.facebook ? (
                  <>
                    <Button
                      variant={"outline"}
                    >
                      <Link
                        href={companyDetails?.facebook || "Not specified"}
                        className="flex items-center gap-2"
                        target="_blank"
                      >
                        <Facebook />
                        <span>{removeHttpsWww(companyDetails?.facebook || "") || "Not specified"}</span>
                      </Link>
                    </Button>
                  </>
                ) : (
                  <></>
                )}
                {companyDetails?.instagram ? (
                  <>
                    <Button
                      variant={"outline"}
                    >
                      <Link
                        href={companyDetails?.instagram || "Not specified"}
                        className="flex items-center gap-2"
                        target="_blank"
                      >
                        <Instagram />
                        <span>{removeHttpsWww(companyDetails?.instagram || "") || "Not specified"}</span>
                      </Link>
                    </Button>
                  </>
                ) : (
                  <></>
                )}
                {companyDetails?.youtube ? (
                  <>
                    <Button
                      variant={"outline"}
                    >
                      <Link
                        href={companyDetails?.youtube || "Not specified"}
                        className="flex items-center gap-2"
                        target="_blank"
                      >
                        <Youtube />
                        <span>{removeHttpsWww(companyDetails?.youtube || "") || "Not specified"}</span>
                      </Link>
                    </Button>
                  </>
                ) : (
                  <></>
                )}
                {companyDetails?.linkedin ? (
                  <>
                    <Button
                      variant={"outline"}
                    >
                      <Link
                        href={companyDetails?.linkedin || "Not specified"}
                        target="_blank"
                        className="flex items-center gap-2"
                      >
                        <Linkedin />
                        <span>{removeHttpsWww(companyDetails?.linkedin || "") || "Not specified"}</span>
                      </Link>
                    </Button>
                  </>
                ) : (
                  <></>
                )}
                {activeUser?.email ? (
                  <>
                    <Button
                      variant={"outline"}
                    >
                      <Link
                        href={activeUser?.email || "Not specified"}
                        target="_blank"
                        className="flex items-center gap-2"
                      >
                        <Mail />
                        <span>{removeHttpsWww(activeUser?.email || "") || "Not specified"}</span>
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
              <div className="mt-4 w-full text-sm leading-6 flex gap-2 flex-wrap">
                {companyDetails?.techStack.map((stack) => (
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
              <p className="mt-4">{companyDetails?.location ? companyDetails?.location : "Not specified"}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default ProfilePage