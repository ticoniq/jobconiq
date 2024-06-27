import { MoveRight, PencilRuler } from "lucide-react";
import { Button } from "@/components/ui/button";
import Title from "@/components/ui/title";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CategoryProps {
  id: number;
  title: string;
  change: string;
}

const data: CategoryProps[] = [
  { id: 1, title: "Design", change: "542 jobs available" },
  { id: 2, title: "Sales", change: "542 jobs available" },
  { id: 3, title: "Marketing", change: "542 jobs available" },
  { id: 4, title: "Finance", change: "542 jobs available" },
  { id: 5, title: "Technology", change: "542 jobs available" },
  { id: 6, title: "Engineering", change: "542 jobs available" },
  { id: 7, title: "Business", change: "542 jobs available" },
  { id: 8, title: "Accountant", change: "542 jobs available" },
];

export default function Category() {
  return (
    <section className="container pt-24 sm:pt-32 space-y-12">
      <div className="flex justify-between items-center">
        <Title titleText="Explore by" highlightText="category" />
        <Link href="#" className="hidden p-0 md:flex">
          <Button variant="link">
            Show all jobs
            <MoveRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {data.map((item) => (
          <Link href="#" key={item.id}>
            <Card className="group/item flex items-center justify-between text-brand-primary rounded-none py-2 hover:bg-brand-primary md:flex-col md:items-start dark:bg-neutrals-300 dark:hover:bg-brand-primary">
              <CardHeader className="pt-0 pb-2 md:pt-6">
                <PencilRuler className="h-10 w-10 group/edit group-hover/item:text-white" />
              </CardHeader>
              <CardContent className="p-0 md:space-y-2 md:p-6">
                <CardTitle className="group/edit text-2xl text-neutrals-900 font-clash font-semibold group-hover/item:text-white">
                  {item.title}
                </CardTitle>
                <div className="p-0">
                  <span className="text-lg text-neutrals-700 font-normal group/edit group-hover/item:text-white">
                    {item.change}
                  </span>
                  <MoveRight className="hidden ml-2 h-6 w-6 text-lg text-neutrals-900 font-normal group/edit group-hover/item:text-white md:inline-flex" />
                </div>
              </CardContent>
              <MoveRight className="flex h-6 w-6 mr-4 text-lg text-neutrals-900 font-normal group/edit group-hover/item:text-white md:hidden" />
            </Card>
          </Link>
        ))}
      </div>
      <Link href="#" className="flex justify-start p-0 md:hidden">
        <Button variant="link" className="p-0">
          Show all jobs
          <MoveRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </section>
  );
}