import { JobFilterValues, jobFilterSchema } from "@/lib/validation/Job-validation";
import { redirect } from "next/navigation";
import { Input } from "@/components//ui/input";
import { Label } from "@/components//ui/label";
import Select from "./ui/SelectFilter";
import prisma from "@/lib/prisma";
import { Button } from "@/components//ui/button";

const jobTypes = [
  "Full-time",
  "Part-time",
  "Contract",
  "Temporary",
  "Internship",
  "Volunteer",
];

const locationTypes = ["Remote", "On-site", "Hybrid"];

async function filterJobs(formData: FormData) {
  "use server";

  const values = Object.fromEntries(formData.entries());

  if (values.clear) {
    redirect('/jobs');
    return;
  }

  const { q, type, location, remote } = jobFilterSchema.parse(values);

  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(type && { type }),
    ...(location && { location }),
    ...(remote && { remote: "true" }),
  });

  redirect(`jobs/?${searchParams.toString()}`);
}

interface JobFilterSidebarProps {
  defaultValues: JobFilterValues;
}

export async function Filter({
  defaultValues,
}: JobFilterSidebarProps) {
  const distinctLocations = (await prisma.job
    .findMany({
      where: { approved: true },
      select: { location: true },
      distinct: ["location"],
    })
    .then((locations) =>
      locations.map(({ location }) => location).filter(Boolean),
    )) as string[];

  const hasFilters = Boolean(
    defaultValues.q ||
    defaultValues.type ||
    defaultValues.location ||
    defaultValues.remote
  );

  return (
    <>
      <form action={filterJobs} key={JSON.stringify(defaultValues)}>
        <div className="space-y-10">
          <div className="flex flex-col gap-2">
            <Label htmlFor="q">Search</Label>
            <Input
              id="q"
              name="q"
              placeholder="Title, company, etc."
              defaultValue={defaultValues.q}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="type">Type</Label>
            <Select
              id="type"
              name="type"
              defaultValue={defaultValues.type || ""}
            >
              <option value="">All types</option>
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Select
              id="location"
              name="location"
              defaultValue={defaultValues.location || ""}
            >
              <option value="">All locations</option>
              {distinctLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="remote"
              name="remote"
              type="checkbox"
              className="scale-125 accent-black"
              defaultChecked={defaultValues.remote}
            />
            <Label htmlFor="remote">Remote jobs</Label>
          </div>
          <Button className="w-full">Filter jobs</Button>
          {hasFilters && (
            <Button
              type="submit"
              name="clear"
              value="true"
              variant="outline"
              className="w-full"
            >
              Clear
            </Button>
          )}
        </div>
      </form>
    </>
  );
}
