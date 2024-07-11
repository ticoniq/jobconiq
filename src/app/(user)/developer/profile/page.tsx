import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { currentUser } from "@/lib/auths"
import React, { cache, Fragment } from "react"
import prisma from "@/lib/prisma"
import Image from "next/image"
import Link from "next/link"
import { Github, Globe, Languages, Linkedin, Mail, PenSquare, Smartphone } from "lucide-react"
import Markdown from "@/components/Markdown"
import { Experiences } from "./Experiences"
import { Educations } from "./Educations"

const getCachedUserDetails = cache(async (uid: string) => {
  return await prisma.developer.findUnique({
    where: {
      userId: uid,
    }
  });
})

async function ProfilePage() {
  const user = await currentUser();

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  const userDetails = await getCachedUserDetails(user?.id ?? "");

  if (!userDetails) {
    return <div>User details not found.</div>;
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-10">
      <div className="flex flex-col justify-start items-start space-y-2">
        <p className="text-lg font-clash font-semibold md:text-2xl">My Profile</p>
      </div>
      <section className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <div className="xl:col-span-2 space-y-4">
          <Card className="bg-transparent rounded-none border border-brand-secondary">
            <CardHeader className="p-0">
              <div className="relative pt-16 pb-16">
                <div className="w-full absolute top-0 left-0 z-0 h-36 bg-gradient-to-r from-teal-400 to-yellow-200" />
                <div className="px-6 md:px-8">
                  <div className="flex items-center justify-center sm:justify-start relative z-10 mb-5">
                    <Avatar className="h-40 w-40 border-8 border-solid border-background rounded-full">
                      <AvatarImage src={user?.image || ""} />
                      <AvatarFallback>JC</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              Hola mundo
            </CardContent>
          </Card>
          <Card className="bg-transparent rounded-none border border-brand-secondary">
            <CardHeader>
              <CardTitle className="font-clash">About Me</CardTitle>
            </CardHeader>
            <CardContent>
              {userDetails?.bio && <Markdown>{userDetails?.bio}</Markdown>}
            </CardContent>
          </Card>
          <Card className="bg-transparent rounded-none border border-brand-secondary">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-clash">Experiences</CardTitle>
              <Experiences />
            </CardHeader>
            <CardContent>
              <CardDescription>
                Coming soon...
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="bg-transparent rounded-none border border-brand-secondary">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-clash">Educations</CardTitle>
              <Educations />
            </CardHeader>
            <CardContent>
              <CardDescription>
                Coming soon...
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="bg-transparent rounded-none border border-brand-secondary">
            <CardHeader>
              <CardTitle className="font-clash">Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm leading-6 flex flex-wrap gap-2">
                {userDetails?.skills[0] ? (
                  <>
                    {userDetails.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="info"
                        className="rounded-none whitespace-nowrap text-ellipsis px-2 text-blue-700"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </>
                ) : (
                  <>{"No bio available."}</>
                )}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-transparent rounded-none border border-brand-secondary">
            <CardHeader>
              <CardTitle className="font-clash">Portfolios</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Coming soon...
              </CardDescription>
            </CardContent>
          </Card>
        </div>
        <aside className="space-y-4">
          <Card className="bg-transparent rounded-none border border-brand-secondary">
            <CardHeader>
              <CardTitle className="font-clash">Additional Details</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              <div className="flex gap-4">
                <Mail />
                <aside className="flex flex-col">
                  <span className="text-base leading-6">Email</span>
                  <p className="text-sm leading-6 break-all">
                    {user?.email ? user.email : "Not specified"}
                  </p>
                </aside>
              </div>
              <div className="flex gap-4">
                <Smartphone />
                <aside className="flex flex-col">
                  <span className="text-base leading-6">Phone</span>
                  <p className="text-sm leading-6 break-all">
                    {userDetails?.phone ? userDetails.phone : "Not specified"}
                  </p>
                </aside>
              </div>
              <div className="flex gap-4">
                <Languages />
                <aside className="flex flex-col">
                  <span className="text-base leading-6">Languages</span>
                  {userDetails?.languages?.length > 0 ? (
                    <>
                      {userDetails.languages.map((skill, index, array) => (
                        <Fragment key={index}>
                          {skill}
                          {index < array.length - 1 && ", "}
                        </Fragment>
                      ))}
                    </>
                  ) : (
                    <p>{"No skills available."}</p>
                  )}
                </aside>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-transparent rounded-none border border-brand-secondary">
            <CardHeader>
              <CardTitle className="font-clash">Social Links</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              <div className="flex gap-4">
                <Github />
                <aside className="flex flex-col">
                  <span className="text-base leading-6">Github</span>
                  <p className="text-sm leading-6 break-all">
                    {userDetails?.github ? userDetails.github : "Not specified"}
                  </p>
                </aside>
              </div>
              <div className="flex gap-4">
                <Linkedin />
                <aside className="flex flex-col">
                  <span className="text-base leading-6">LinkedIn</span>
                  <p className="text-sm leading-6 break-all">
                    {userDetails?.linkedin ? userDetails.linkedin : "Not specified"}
                  </p>
                </aside>
              </div>
              <div className="flex gap-4">
                <Globe />
                <aside className="flex flex-col">
                  <span className="text-base leading-6">Portfolio</span>
                  <p className="text-sm leading-6 break-all">
                    {userDetails?.website ? userDetails.website : "Not specified"}
                  </p>
                </aside>
              </div>
            </CardContent>
          </Card>
        </aside>
      </section>
    </main>
  )
}

export default ProfilePage