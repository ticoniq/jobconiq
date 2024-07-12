import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { MyProfile } from "./MyProfile";
import { currentUser } from "@/lib/auths";
import prisma from "@/lib/prisma";

type Props = {}

export default async function page({ }: Props) {
  const activeUser = await currentUser();

  const userDetails = await prisma.developer.findUnique({
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
      <Card className="xl:col-span-2 rounded-none bg-transparent border-0 shadow-none px-0">
        <Tabs defaultValue="my-profile">
          <CardHeader className="p-0 border-b border-b-card-foreground">
            <TabsList className="w-full">
              <TabsTrigger value="my-profile" className="shadow-none bg-transparent">My Profile</TabsTrigger>
              <TabsTrigger value="login_details" className="shadow-none bg-transparent">Login Details</TabsTrigger>
              <TabsTrigger value="notifications" className="shadow-none bg-transparent">Notifications</TabsTrigger>
            </TabsList>
          </CardHeader>
          <CardContent className="p-0">
            <TabsContent value="my-profile">
              <MyProfile userDetails={userDetails} />
            </TabsContent>
            <TabsContent value="login_details" className="">
              <Card className="rounded-none bg-transparent border-none shadow-none">
                <CardContent className="p-0">
                  <p>login_details</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="notifications">
              <Card className="rounded-none bg-transparent border-none shadow-none">
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>View Notifications for this user.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>Notifications</p>
                  <p>Notifications coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </main>
  )
}