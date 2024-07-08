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
    
    // Parse techstack separately
    const techstackString = formData.get('techstack') as string;
    const techstack = techstackString ? JSON.parse(techstackString) : [];

    // Parse date
    const dateString = formData.get('date') as string;
    const date = dateString ? new Date(dateString) : undefined;

    // Merge parsed values
    const parsedValues = {
      ...values,
      techstack,
      date,
    };

    const validatedFields = companySchema.safeParse(parsedValues);

    if (!validatedFields.success) {
      console.error('Validation errors:', validatedFields.error.errors);
      return { error: "Invalid fields" };
    }

    const user = await currentUser();
    const userId = user?.id;
    const userName = user?.name || "";

    if (!userId) {
      return { error: "User not found" };
    }

    const {
      imageurl,
      name,
      website,
      size,
      industry,
      location,
      bio,
    } = validatedFields.data;

    if (user?.image) {
      await del(user?.image);
    }

    const slug = `${toSlug(userName)}-${nanoid(10)}`;
    let image: string | undefined = undefined;

    if (imageurl) {
      const blob = await put(
        `company_logo_img/${slug}${path.extname(imageurl.name)}`,
        imageurl,
        {
          access: "public",
          addRandomSuffix: false,
        }
      );
      image = blob.url;
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        image,
      },
    });

    await prisma.company.update({
      where: {
        userId: userId,
      },
      data: {
        website,
        size,
        industry,
        location,
        techStack: techstack,
        dateFounded: date,
        bio,
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
