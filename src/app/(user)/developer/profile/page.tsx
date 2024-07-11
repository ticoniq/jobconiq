import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { currentUser } from "@/lib/auths"
import Link from "next/link"
import Image from "next/image"
import React from "react"

async function ProfilePage() {
  const user = await currentUser();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-10">
      <div className="flex flex-col justify-start items-start space-y-2">
        <p className="text-lg font-clash font-semibold md:text-2xl">My Profile</p>
      </div>
      <section className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <div className="xl:col-span-2 space-y-4">
          <Card className="bg-transparent rounded-none border border-brand-secondary">
            {/* <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Transactions</CardTitle>
                <CardDescription>
                  Recent transactions from your store.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="#">
                  View All
                </Link>
              </Button>
            </CardHeader> */}
            <CardHeader className="p-0">
              <div className="relative pt-16 pb-16">
                {/* <Image
                  src="https://pagedone.io/asset/uploads/1705473378.png"
                  alt="cover-image"
                  className="w-full absolute top-0 left-0 z-0 h-36"
                /> */}
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
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Transactions</CardTitle>
                <CardDescription>
                  Recent transactions from your store.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="#">
                  View All
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              hola mundo
            </CardContent>
          </Card>
          <Card className="bg-transparent rounded-none border border-brand-secondary">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Transactions</CardTitle>
                <CardDescription>
                  Recent transactions from your store.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="#">
                  View All
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              hola mundo
            </CardContent>
          </Card>
          <Card className="bg-transparent rounded-none border border-brand-secondary">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Transactions</CardTitle>
                <CardDescription>
                  Recent transactions from your store.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="#">
                  View All
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              hola mundo
            </CardContent>
          </Card>
          <Card className="bg-transparent rounded-none border border-brand-secondary">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Transactions</CardTitle>
                <CardDescription>
                  Recent transactions from your store.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="#">
                  View All
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              hola mundo
            </CardContent>
          </Card>
        </div>
        <aside className="space-y-4">
          <Card className="bg-transparent rounded-none border border-brand-secondary">
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              <div className="flex items-center gap-4">

                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Olivia Martin
                  </p>
                  <p className="text-sm text-muted-foreground">
                    olivia.martin@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">+$1,999.00</div>
              </div>

            </CardContent>
          </Card>
          <Card className="bg-transparent rounded-none border border-brand-secondary">
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              <div className="flex items-center gap-4">

                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Olivia Martin
                  </p>
                  <p className="text-sm text-muted-foreground">
                    olivia.martin@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">+$1,999.00</div>
              </div>

            </CardContent>
          </Card>
        </aside>
      </section>
    </main>
  )
}

export default ProfilePage