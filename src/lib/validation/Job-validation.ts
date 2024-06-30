import { z } from "zod";
import { locationTypes as importedLocationTypes, jobTypes } from "../job-types";

const locationTypes = ["Remote", "On-site", "Hybrid"];

export const jobFilterSchema = z.object({
  q: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
});

export type JobFilterValues = z.infer<typeof jobFilterSchema>;

const companyLogoSchema = z
  .custom<File | undefined>()
  .refine(
    (file) => !file || (file instanceof File && file.type.startsWith("image/")),
    "Must be an image file"
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 2;
  }, "File must be less than 2MB");

const requiredString = z.string().min(1, "Required");
const numericRequiredString = requiredString.regex(/^\d+$/, "Must be a number");
const locationSchema = z
  .object({
    locationType: requiredString.refine(
      (value) => locationTypes.includes(value),
      "Invalid location type"
    ),
    location: z.string().max(100).optional(),
  })
  .refine(
    (data) =>
      !data.locationType || data.locationType === "Remote" || data.location,
    {
      message: "Location is required for on-site jobs",
      path: ["location"],
    }
  );

  export const createJobSchema = z.object({
    title: z.string().nonempty({ message: "Title is required" }),
    type: z.string().nonempty({ message: "Type is required" }),
    locationType: z.string().nonempty({ message: "Location Type is required" }),
    location: z.string().optional(),
    description: z.string().optional(),
    salary: numericRequiredString.max(
      9,
      "Number can't be longer than 9 digits"
    ),
    companyName: z.string().nonempty({ message: "Company Name is required" }),
    companyLogoUrl: z.string().url({ message: "Invalid URL" }).optional(),
  });
