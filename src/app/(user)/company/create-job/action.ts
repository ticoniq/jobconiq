"use server";
import * as z from "zod";
import { toSlug } from "@/lib/utils";
import { currentUser } from "@/lib/auths";
import { createJobSchema } from "@/lib/validation/Job-validation";
import { redirect } from "next/navigation";
import { nanoid } from "nanoid";
import prisma from "@/lib/prisma";

export const createJobPosting = async (values: z.infer<typeof createJobSchema>) => {
  const user = await currentUser();
  const validatedFields = createJobSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const {
    title,
    type,
    locationType,
    location,
    description,
    salary,
  } = createJobSchema.parse(values);
  const userId = user?.id;
  const companyName = user?.name ?? "Unknown Company";

  if (!userId) {
    return { error: "User not found" };
  }

  const slug = `${toSlug(title)}-${nanoid(10)}`;

  await prisma.job.create({
    data: {
      slug,
      title: title.trim(),
      type,
      companyName,
      locationType,
      location,
      description: description?.trim(),
      salary: parseInt(salary),
      userId,
    },
  });

  return { success: "created successfully!" };
  
}