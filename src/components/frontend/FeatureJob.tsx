import {
  MoveRight,
  PencilRuler
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Title from "@/components/ui/title";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";

interface Props {
  id: number;
  title: string;
  change: string;
}

const data: Props[] = [
  { id: 1, title: "Design", change: "542 jobs available" },
  { id: 2, title: "Sales", change: "542 jobs available" },
  { id: 3, title: "Marketing", change: "542 jobs available" },
  { id: 4, title: "Finance", change: "542 jobs available" },
  { id: 5, title: "Technology", change: "542 jobs available" },
  { id: 6, title: "Engineering", change: "542 jobs available" },
  { id: 7, title: "Business", change: "542 jobs available" },
  { id: 8, title: "Accountant", change: "542 jobs available" },
];

export default function FeatureJob() {
  return (
    <section className="py-10">
      <div className="container space-y-12">
        <div className="flex justify-between items-center">
          <Title titleText="Featured " highlightText="jobs" />
          <Link href="#" className="hidden p-0 md:flex">
            <Button variant="link">
              Show all jobs
              <MoveRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {Array.from({ length: 8 }).map((_, index) => (
              <CarouselItem key={index} className="px-4 md:basis-2/2 lg:basis-1/4">
                <Link href="#">
                  <Card className="rounded-none space-y-5">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <PencilRuler className="h-10 w-10 text-muted-foreground" />
                      <Button
                        variant="outline"
                        className="py-2 px-4 border-2 border-brand-primary text-brand-primary font-normal"
                      >
                        Full Time
                      </Button>
                    </CardHeader>
                    <CardContent className="">
                      <CardTitle className="text-lg text-neutrals-900 font-Epilogue font-semibold">
                        Brand Designer
                      </CardTitle>
                      <span className="space-y-5">
                        <p className="text-sm text-muted-foreground">
                          Revolut . San Fransisco, US
                        </p>
                        <p className="text-base font-normal">
                          ClassPass is looking for Product Designer to help us...
                        </p>
                        <span className="flex space-x-1">
                          <Badge variant="outline" className="border-0 bg-accents-yellow/10 text-sm text-accents-yellow font-semibold px-4 py-2">Marketing</Badge>
                          <Badge variant="outline" className="border-0 bg-accents-green/60  text-sm text-accents-green font-semibold px-4 py-2">Badge</Badge>
                        </span>
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <Link href="#" className="flex justify-start p-0 md:hidden">
          <Button variant="link" className="p-0">
            Show all jobs
            <MoveRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  )
}