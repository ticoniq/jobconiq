"use client";
import Title from "@/components/ui/title";
import { MapPinned, Shrub, Lock, Globe2 } from "lucide-react";

const features = [
  {
    name: "Trusted security",
    description:
      "Sleep soundly knowing your data is always safe and always accessible. We’re ISO-certified.",
    icon: Lock,
  },
  {
    name: "Fast, global support",
    description:
      "Reach our award-winning support team in about 25 seconds by phone or chat.",
    icon: Globe2,
  },
  {
    name: "Anywhere recruiting",
    description:
      "Keep things moving from anywhere with our top-rated mobile hiring app.",
    icon: MapPinned,
  },
  {
    name: "World-class partners",
    description:
      "Connect with LinkedIn, Google and 70+ other apps and tools to get more done.",
    icon: Shrub,
  },
]

export default function Feature() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container px-6 lg:px-8">
        <div className="">
          <Title titleText="Why Choose " highlightText="Jobconiq" />
          <p className="mt-6 text-lg leading-8">
            Sleep soundly knowing your data is always safe and always accessible. We’re ISO-certified.
          </p>
        </div>
        <div className="mt-12 sm:mt-16">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold font-clash leading-7">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
