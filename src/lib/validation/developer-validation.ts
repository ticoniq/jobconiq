import * as z from "zod";
import { industries } from "../job-types";

const MB_BYTES = 1000000; // Number of bytes in a megabyte.

// This is the list of mime types you will accept with the schema
const ACCEPTED_MIME_TYPES = ["image/gif", "image/jpeg", "image/png", "image/svg+xml", "image/svg"];

// This is a file validation with a few extra checks in the `superRefine`.
// The `refine` method could also be used, but `superRefine` offers better
// control over when the errors are added and can include specific information
// about the value being parsed.
const imageSchema = z.instanceof(File).superRefine((f, ctx) => {
  // First, add an issue if the mime type is wrong.
  if (!ACCEPTED_MIME_TYPES.includes(f.type)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `File must be one of [${ACCEPTED_MIME_TYPES.join(
        ", "
      )}] but was ${f.type}`
    });
  }
  // Next add an issue if the file size is too large.
  if (f.size > 3 * MB_BYTES) {
    ctx.addIssue({
      code: z.ZodIssueCode.too_big,
      type: "array",
      message: `The file must not be larger than ${3 * MB_BYTES} bytes: ${
        f.size
      }`,
      maximum: 3 * MB_BYTES,
      inclusive: true
    });
  }
});

export const developerSchema = z.object({
  imageurl: imageSchema.optional(),
  name: z.string().min(1, "Full Name is required").max(30, "Maximum character 30"),
  // size: z.string().min(1, "This field is required"),
  // industry: z.string().min(1, "industry field is required"),
  // location: z.string().min(1, "Location field is required").max(30, "Maximum character 100"),
  // techstack: z.array(z.string()).min(1, "Please select at least one skill."),
  title: z.string().min(1, "title field is required"),
  number: z.string().min(1, "Number field is required"),
  gender: z.string().min(1, "Gender field is required"),
  date: z.date(),
  website: z.string().url().min(1, "Website URL field is required").max(30, "Maximum character 50"),
  linkedin: z.string().url().optional().or(z.literal("")),
  github: z.string().url().optional().or(z.literal("")),
  bio: z
    .string()
    .min(1, "Description is required")
    .max(5000, "Description can't be longer than 5000 characters"),
});

export const ChangePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[@$!%*?&#]/,
        "Password must contain at least one special character (@$!%*?&#)"
      ),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: "New password must be different from the current password",
    path: ["newPassword"],
  });

export const updateEmailSchema = z.object({
  email: z.string().email("Invalid email address"),
});