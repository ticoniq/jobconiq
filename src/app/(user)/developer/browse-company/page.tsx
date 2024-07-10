import Link from "next/link"
import prisma from "@/lib/prisma"
import Footer from "@/components/Footer"
import { UserRole } from "@prisma/client"
import Title from "@/components/ui/title"
import { NavBar } from "@/components/NavBar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { truncateBio } from "@/lib/utils"

async function CompaniesPage() {
  const companies = await prisma.user.findMany({
    where: { role: UserRole.COMPANY },
    include: {
      companies: true,
      jobs: true,
    },
  })

  return (
    <>
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-10">
        <div className="flex flex-col justify-start items-start space-y-2">
          <h3 className="text-lg font-clash font-semibold md:text-2xl">Find your dream job</h3>
        </div>
        <section className="py-16">
          <h2 className="text-2xl font-bold tracking-tight font-clash">All Companies</h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {companies.map((company) => (
              <>
                <Link href={`/companies/${company.id}`} key={company.id} className="block">
                  <Card className="space-y-4 p-4 group relative rounded-none bg-transparent border border-brand-secondary">
                    <CardTitle className="flex justify-between w-full p-0 overflow-hidden lg:aspect-none group-hover:opacity-75">
                      <Avatar className="h-14 w-14 sm:flex rounded-none">
                        <AvatarImage
                          src={company.image || "/avatars/01.png"}
                          className="rounded-none"
                          alt="Avatar"
                        />
                        <AvatarFallback className="rounded-none">JC</AvatarFallback>
                      </Avatar>
                      <div>
                        <Badge variant={"info"} className="rounded-none">{company.jobs.length} Job(s)</Badge>
                      </div>
                    </CardTitle>
                    <CardContent className="p-0 space-y-4 group-hover:opacity-75">
                      <h3 className="text-xl font-clash font-semibold tracking-wide">
                        {company.name}
                      </h3>
                      <p>{truncateBio(company.companies[0]?.bio, 14) || 'No bio available'}</p>
                      <div className="w-full text-sm leading-6 flex gap-2 flex-wrap">
                        <Badge className="border-green-500" variant={"secondary"}>{company.companies[0]?.industry}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}

export default CompaniesPage