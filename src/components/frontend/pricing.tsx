import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Title } from "@/components/ui/title";

const includedFeatures = [
  'Private forum access',
  'Member resources',
  'Entry to annual conference',
  'Official member t-shirt',
]

export function Pricing() {
  return (
    <section className="container">
      <div className="py-24 sm:py-32">
        <div className="max-w-2xl">
          <Title titleText={"Simple no-tricks"} highlightText={"pricing"} />
          <p className="mt-5 text-lg leading-8">
            Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et quasi iusto modi velit ut non voluptas
            in. Explicabo id ut laborum.
          </p>
        </div>
        <div className="mt-8 ring-1 ring-gray-200 sm:mt-10 lg:flex">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-wider font-clash">Lifetime membership</h3>
            <p className="mt-6 text-base leading-7">
              Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque amet indis perferendis blanditiis
              repellendus etur quidem assumenda.
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-brand-primary font-clash">What’s included</h4>
              <div className="h-px flex-auto bg-gray-100" />
            </div>
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 sm:grid-cols-2 sm:gap-6"
            >
              {includedFeatures.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon className="h-6 w-5 flex-none text-brand-primary" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <aside className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16 dark:bg-neutrals-900">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-base font-semibold">Pay once, own it forever</p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight font-clash">$349</span>
                  <span className="text-sm font-semibold leading-6 tracking-wide">USD</span>
                </p>
                <Button
                  asChild
                  className="mt-10 w-full"
                >
                  <Link href="/">Get access</Link>
                </Button>
                <p className="mt-6 text-xs leading-5">
                  Invoices and receipts available for easy company reimbursement
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
