"use server";

import path from "path";
import { nanoid } from "nanoid";
import { put, del } from "@vercel/blob";
import { toSlug } from "@/lib/utils";
import { currentUser } from "@/lib/auths";
import { companySchema } from "@/lib/validation/company-validation";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const UpdateCompanyDetails = async (formData: FormData) => {
  try {
    const user = await currentUser();
    if (!user?.id) {
      return { error: "User not authenticated" };
    }

    const values = Object.fromEntries(formData.entries());
    const techstackString = formData.get('techstack') as string;
    const dateString = formData.get('date') as string;

    const parsedValues = {
      ...values,
      techstack: techstackString ? JSON.parse(techstackString) : [],
      date: dateString ? new Date(dateString) : undefined,
    };

    const validationResult = companySchema.safeParse(parsedValues);

    if (!validationResult.success) {
      return { error: "Invalid fields", details: validationResult.error.errors };
    }

    const {
      imageurl,
      name,
      website,
      size,
      industry,
      location,
      techstack,
      date,
      bio,
    } = validationResult.data;

    let imageUrl: string | undefined = undefined;

    if (imageurl instanceof File) {
      const slug = `${toSlug(user.name || "")}-${nanoid(10)}`;
      const blob = await put(
        `company_logo_img/${slug}${path.extname(imageurl.name)}`,
        imageurl,
        {
          access: "public",
          addRandomSuffix: false,
        }
      );
      imageUrl = blob.url;

      // Delete old image if it exists
      if (user.image) {
        // await del(user.image).catch(console.error);
        await del(user.image);
      }
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: {
          name,
          image: imageUrl,
        },
      }),
      prisma.company.update({
        where: { userId: user.id },
        data: {
          website,
          size,
          industry,
          location,
          techStack: techstack,
          dateFounded: date,
          bio,
        },
      }),
    ]);

    revalidatePath("/company/settings");
    return { success: "Company details updated successfully" };
  } catch (error) {
    return { error: "Unexpected error occurred" };
  }
};