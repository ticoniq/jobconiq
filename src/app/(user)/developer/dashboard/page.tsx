"use server";
import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/auth";

async function Dashboardpage() {
  const session = await auth();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex flex-col justify-start items-start">
        <h3 className="text-sm font-clash font-semibold md:text-2xl">Good Morning, {"Jake"}</h3>
        <p>Here is what’s happening with your job search applications.</p>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no products
          </h3>
          <p className="text-sm text-muted-foreground">
            {JSON.stringify(session)}
          </p>
          <form
            action={async () => {
              "use server"
              await signOut({
                redirectTo: "/login",
              })
            }}
          >
            <Button className="mt-4">Sign out</Button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default Dashboardpage