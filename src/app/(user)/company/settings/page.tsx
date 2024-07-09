import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import prisma from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import OverviewForm from "./OverviewForm";
import { currentUser } from "@/lib/auths";
import SocialForm from "./SocialForm";

export default async function CompanyPage() {
  const activeUser = await currentUser();

  const companyDetails = await prisma.company.findUnique({
    where: { userId: activeUser?.id },
    include: {
      user: true,
    }
  });

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-10">
      <div className="flex flex-col justify-start items-start space-y-2">
        <p className="text-sm font-clash font-semibold md:text-2xl">Settings</p>
      </div>
      <Tabs defaultValue="overview">
        <TabsList className="grid w-4/5 grid-cols-3 md:w-2/5 py-0 my-0">
          <TabsTrigger value="overview" className="shadow-none bg-transparent">Overview</TabsTrigger>
          <TabsTrigger value="social-links" className="shadow-none bg-transparent">Social Links</TabsTrigger>
          <TabsTrigger value="team" className="shadow-none bg-transparent">Team</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="border-t border-t-brand-secondary">
          <OverviewForm companyDetails={companyDetails} />
        </TabsContent>
        <TabsContent value="social-links" className="border-t border-t-brand-secondary">
          <SocialForm companyDetails={companyDetails} />
        </TabsContent>
        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle>Company Team</CardTitle>
              <CardDescription>
                Company Teams.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {/* Add your team content here */}
              <p>Team content coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}