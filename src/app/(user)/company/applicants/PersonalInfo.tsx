import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { calculateAge, formatDate } from "@/lib/utils"
import React from 'react'

interface PersonalInfoProps {
  jobApplication: any
  developers: any
}

function PersonalInfo({ jobApplication, developers }: PersonalInfoProps) {

  if (developers === null) {
    return (
      <section className="py-5 grid place-content-center">
        Developer details not found
      </section>
    );
  }

  return (
    <section className="space-y-2 divide-y divide-gray-100">
      <Card className="rounded-none bg-transparent border-t border-t-card-foreground shadow-none">
        <CardHeader>
          <CardTitle className="text-xl">Personal Info</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <dl className="flex flex-col justify-between space-y-4 sm:flex-row">
              <dt className="w-full sm:w-1/2">
                <div className="text-muted-foreground">Full Name</div>
                <div className="font-medium text-sm">
                  {jobApplication.fullName}
                </div>
              </dt>
              <dd className="w-full sm:w-1/2 justify-self-start">
                <div className="text-muted-foreground">Gender</div>
                <div className="font-medium text-sm">
                  {developers?.gender ? developers.gender : "Not specified"}
                </div>
              </dd>
            </dl>
            <dl className="flex flex-col justify-between space-y-4 sm:flex-row">
              <dt className="w-full sm:w-1/2">
                <div className="text-muted-foreground">Date of Birth</div>
                <div className="font-medium text-sm">
                  {/* {formatDate(developers.dob)} <span className="text-muted-foreground font-normal">({calculateAge(developers.dob)} y.o)</span> */}
                  {/* {developers?.dob
                    ? `${formatDate(developers.dob)} (${calculateAge(developers.dob)} y.o)`
                    : "Not specified"} */}
                  {developers.dob ? (
                    <>
                      {formatDate(developers.dob)}
                      <span className="text-muted-foreground font-normal">{" "}
                        ({calculateAge(developers.dob)} y.o)
                      </span>
                    </>
                  ) : (
                    <>Not specified</>
                  )}
                </div>
              </dt>
              <dd className="w-full sm:w-1/2 justify-self-start">
                <div className="text-muted-foreground">Language</div>
                <div className="font-medium text-sm flex flex-wrap gap-2">
                  {developers?.languages[0]
                    ? developers.languages.map((lang: any) => (
                      <Badge key={lang} variant={"info"} className="rounded-sm">
                        {lang}
                      </Badge>
                    ))
                    : "Not specified"}
                </div>
              </dd>
            </dl>
            <dl className="flex flex-col justify-between space-y-4 sm:flex-row">
              <dt className="w-full sm:w-1/2">
                <div className="text-muted-foreground">Address</div>
                <div className="font-medium text-sm">
                  {developers?.location ? developers.location : "Not specified"}
                </div>
              </dt>
            </dl>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-none bg-transparent border-t border-t-card-foreground shadow-none">
        <CardHeader>
          <CardTitle className="text-xl">Professional Info</CardTitle>
        </CardHeader>
        <CardContent>
          <article className="space-y-2 font-semibold">
            <h3>About me</h3>
            <p>{developers?.bio ? developers.bio : "Not specified"}</p>
          </article>
          <div className="mt-4 space-y-4">
            <dl className="flex flex-col justify-between space-y-4 sm:flex-row">
              <dt className="w-full sm:w-1/2">
                <div className="text-muted-foreground">Current Job</div>
                <div className="font-medium text-sm">
                  Product Designer
                </div>
              </dt>
              <dd className="w-full sm:w-1/2 justify-self-start">
                <div className="text-muted-foreground">Experience in Years</div>
                <div className="font-medium text-sm">
                  {developers?.experience ? developers.experience : "Not specified"}
                </div>
              </dd>
            </dl>
            <dl className="flex flex-col justify-between space-y-4 sm:flex-row">
              <dt className="w-full sm:w-1/2">
                <div className="text-muted-foreground">Highest Qualification Held</div>
                <div className="font-medium text-sm">
                  {developers?.qualification ? developers.qualification : "Not specified"}
                </div>
              </dt>
              <dd className="w-full sm:w-1/2 justify-self-start">
                <div className="text-muted-foreground">Skill set</div>
                <div className="font-medium text-sm flex flex-wrap gap-1">
                  {developers?.skills[0]
                    ? developers.skills.map((skill: any) => (
                      <Badge key={skill} variant={"info"} className="rounded-sm">
                        {skill}
                      </Badge>
                    ))
                    : "Not specified"}
                </div>
              </dd>
            </dl>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

export default PersonalInfo