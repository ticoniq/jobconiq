import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <section className="container">
      <ModeToggle />
      <div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
        <div className="space-x-5 flex justify-start items-start">
          <Button
            variant="default"
            size="sm"
          >
            Caption
          </Button>
          <Button
            variant="default"
            size="default"
          >
            Caption
          </Button>
          <Button
            variant="default"
            size="lg"
          >
            Caption
          </Button>
          <Button
            variant="default"
            size="sm"
          >
            <ArrowRight />
          </Button>
          <Button
            variant="default"
            size="default"
          >
            <ArrowRight />
          </Button>
          <Button
            variant="default"
            size="lg"
          >
            <ArrowRight />
          </Button>
        </div>
        <div className="space-x-5 flex justify-start w- items-start">
          <Button
            variant="outline"
            size="sm"
          >
            Caption
          </Button>
          <Button
            variant="outline"
            size="default"
          >
            Caption
          </Button>
          <Button
            variant="outline"
            size="lg"
          >
            Caption
          </Button>
        </div>
        <div className="space-x-5 flex justify-start w- items-start">
          <Button
            variant="ghost"
            size="sm"
          >
            Caption
          </Button>
          <Button
            variant="ghost"
            size="default"
          >
            Caption
          </Button>
          <Button
            variant="ghost"
            size="lg"
          >
            Caption
          </Button>
        </div>
        <h3 className="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">Writes Upside-Down</h3>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
          The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space.
        </p>
      </div>
    </section>
  );
}
