"use server";
import path from "path";
import * as z from "zod";
import { nanoid } from "nanoid";
import { put, del } from "@vercel/blob";
import { toSlug } from "@/lib/utils";
import { currentUser } from "@/lib/auths";
import { companySchema } from "@/lib/validation/company-validation";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const UpdateCompanyDetails = async (formData: FormData) => {
  try {
    const values = Object.fromEntries(formData.entries());
    const validatedFields = companySchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const user = await currentUser();
    const userId = user?.id;
    const name = user?.name || "";

    if (!userId) {
      return { error: "User not found" };
    }

    const { imageurl } = validatedFields.data;

    if (user?.image) {
      await del(user?.image);
    }

    const slug = `${toSlug(name)}-${nanoid(10)}`;
    let image: string | undefined = undefined;

    if (imageurl) {
      const blob = await put(
        `company_logo_img/${slug}${path.extname(imageurl.name)}`,
        imageurl,
        {
          access: "public",
          addRandomSuffix: false,
        },
      );
      image = blob.url;
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        image
      },
    });

    revalidatePath("/company/settings");
    return { success: "Company details updated successfully" };
  } catch (error) {
    if (error instanceof Error) {
      return { error: "Unecpected error" };
    }
  }
  return { success: "Company details updated successfully" };
};
