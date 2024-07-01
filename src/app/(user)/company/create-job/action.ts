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
    categories,
    skills,
  } = validatedFields.data;
  const userId = user?.id;

  if (!userId) {
    return { error: "User not found" };
  }

  const slug = `${toSlug(title)}-${nanoid(10)}`;

  await prisma.job.create({
    data: {
      slug,
      title: title.trim(),
      type,
      locationType,
      location,
      description: description?.trim(),
      salary: parseInt(salary),
      categories,
      skills,
      userId,
    },
  });

  return { success: "created successfully!" };
  
}