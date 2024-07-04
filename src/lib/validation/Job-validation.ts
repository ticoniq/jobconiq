import { z } from "zod";
import { locationTypes, jobTypes } from "../job-types";
import { max } from "date-fns";

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
  title: z.string().min(1, "Title is required"),
  type: z.string().min(1, "Type is required"),
  locationType: z.string().min(1, "Location type is required"),
  location: z.string().optional(),
  categories: z
    .array(z.string().min(1))
    .min(1)
    .nonempty("Please select at least one category."),
  approved: z.boolean().optional(),
  skills: z
    .array(z.string().min(1))
    .min(1)
    .nonempty("Please select at least one skill."),
  description: z
    .string()
    .min(1, "Description is required")
    .max(5000, "Description can't be longer than 5000 characters"),
  salary: numericRequiredString.max(9, "Number can't be longer than 9 digits"),
});

const resumeAttachmentSchema = z
  .instanceof(File)
  .refine((file) => file.type === "application/pdf", {
    message: "Only PDF files are allowed",
  })
  .refine((file) => file.size <= 1024 * 1024 * 2, {
    message: "File must be less than 2MB",
  });

export const JobApplicationSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  emailAddress: z.string().email(),
  phoneNumber: z.string().min(1, "Phone number is required"),
  currentJobTitle: z.string().min(1, "Current job title is required"),
  linkedInURL: z.string().url().min(1, "linkedIn URL title is required"),
  portfolioURL: z.string().url().min(1, "portfolio URL title is required"),
  additionalInfo: z.string().optional(),
  resumeAttachmentUrl: resumeAttachmentSchema,
  jobId: z.string(),
  status: z.string(),
});
