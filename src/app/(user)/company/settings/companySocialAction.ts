"use server";

import { z } from "zod";
import { currentUser } from "@/lib/auths";
import { companySocialSchema } from "@/lib/validation/company-validation";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const UpdateCompanySocials = async (value: z.infer<typeof companySocialSchema>) => {
  try {
    const user = await currentUser();
    if (!user?.id) {
      return { error: "User not authenticated" };
    }

    const validationResult = companySocialSchema.safeParse(value);

    if (!validationResult.success) {
      return { error: "Invalid fields", details: validationResult.error.errors };
    }

    const {
      instagram,
      twitter,
      facebook,
      linkedin,
      youtube,
    } = validationResult.data;

    await prisma.company.update({
      where: { userId: user.id },
      data: {
        instagram,
        twitter,
        facebook,
        linkedin,
        youtube,
      },
    });

    revalidatePath("/company/settings");
    return { success: "Company social links updated successfully" };
  } catch (error) {
    return { error: "Unexpected error occurred" };
  }
};