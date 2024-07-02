import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { JobDetails } from "../JobDetails"

interface PageProps {
  params: { slug: string };
}

export default function Page({ params: { slug } }: PageProps) {
  return (
    <section className="container py-10">
      <Tabs defaultValue="applicants">
        <TabsList className="grid w-1/4 grid-cols-3 t">
          <TabsTrigger value="applicants" className="shadow-none bg-transparent">Applicants</TabsTrigger>
          <TabsTrigger value="job-details" className="shadow-none bg-transparent">Job Details</TabsTrigger>
          <TabsTrigger value="analytics" className="shadow-none bg-transparent">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="applicants">
          <Card>
            <CardHeader>
              <CardTitle>applicants</CardTitle>
              <CardDescription>
                {"Make changes to your account here. Click save when you're done."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Pedro Duarte" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="@peduarte" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="job-details">
          <JobDetails params={{ slug }} />
        </TabsContent>
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>
                {"Change your password here. After saving, you'll be logged out."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  )
}
