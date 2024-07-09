import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs"

async function HelpPage() {

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-10">
      <div className="flex flex-col justify-start items-start space-y-2">
        <p className="text-sm font-clash font-semibold md:text-2xl">Help Center</p>
      </div>
      <Tabs defaultValue="getting_starting" className="w-full">
        <div className="divide-y divide-gray-100 grid gap-8 md:gap-8 lg:grid-cols-1 xl:grid-cols-3">
          <Card className="rounded-none bg-transparent border-none shadow-none">
            <CardContent className="p-0">
              <TabsList className="flex flex-col h-full divide-y divide-gray-100">
                <TabsTrigger value="getting_starting" className="py-3 text-lg text-left">Getting Started</TabsTrigger>
                <TabsTrigger value="my_profile" className="py-3 text-lg text-left">My Profile</TabsTrigger>
                <TabsTrigger value="applying_job" className="py-3 text-lg text-left">Applying for a job</TabsTrigger>
                <TabsTrigger value="job_search_tips" className="py-3 text-lg text-left">Job Search Tips</TabsTrigger>
                <TabsTrigger value="job_alerts" className="py-3 text-lg text-left">Job Alerts</TabsTrigger>
              </TabsList>
            </CardContent>
          </Card>
          <Card className="xl:col-span-2 rounded-none bg-transparent border-none shadow-none">
            <TabsContent value="getting_starting">
              <Card>
                <CardContent className="p-0 divide-y divide-gray-100">
                  <div className="">
                    <CardHeader className="p-0 font-clash font-semibold text-xl">
                      <CardTitle className="text-xl tracking-wide">Getting Started</CardTitle>
                    </CardHeader>
                    <div className="mt-4">
                      <p>Getting Started is coming soon...</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="my_profile">
              <Card>
                <CardContent className="p-0 divide-y divide-gray-100">
                  <div className="">
                    <CardHeader className="p-0 font-clash font-semibold text-xl">
                      <CardTitle className="text-xl tracking-wide">My Profile</CardTitle>
                    </CardHeader>
                    <div className="mt-4">
                      <p>My Profile is coming soon...</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="applying_job">
              <Card>
                <CardContent className="p-0 divide-y divide-gray-100">
                  <div className="">
                    <CardHeader className="p-0 font-clash font-semibold text-xl">
                      <CardTitle className="text-xl tracking-wide">Applying For a Job</CardTitle>
                    </CardHeader>
                    <div className="mt-4">
                      <p>Applying For a Job is coming soon...</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="job_search_tips">
              <Card>
                <CardContent className="p-0 divide-y divide-gray-100">
                  <div className="">
                    <CardHeader className="p-0 font-clash font-semibold text-xl">
                      <CardTitle className="text-xl tracking-wide">Job Search Tips</CardTitle>
                    </CardHeader>
                    <div className="mt-4">
                      <p>Job Search Tips is coming soon...</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="job_alerts">
              <Card>
                <CardContent className="p-0 divide-y divide-gray-100">
                  <div className="">
                    <CardHeader className="p-0 font-clash font-semibold text-xl">
                      <CardTitle className="text-xl tracking-wide">Job Alert</CardTitle>
                    </CardHeader>
                    <div className="mt-4">
                      <p>Job Alert is coming soon...</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Card>
        </div>
      </Tabs>
    </main>
  )
}

export default HelpPage