"use server";
import path from "path";
import { nanoid } from "nanoid";
import prisma from "@/lib/prisma";
import { toSlug } from "@/lib/utils";
import { put, del } from "@vercel/blob";
import { currentUser } from "@/lib/auths";
import { revalidatePath } from "next/cache";
import { developerSchema } from "@/lib/validation/developer-validation";

export const UpdateDeveloperDetails = async (formData: FormData) => {
  try {
    const user = await currentUser();
    if (!user?.id) {
      return { error: "User not authenticated" };
    }

    const values = Object.fromEntries(formData.entries());
    // const techstackString = formData.get('techstack') as string;
    // const dateString = formData.get('date') as string;

    const parsedValues = {
      ...values,
      // techstack: techstackString ? JSON.parse(techstackString) : [],
      // date: dateString ? new Date(dateString) : undefined,
    };

    const validationResult = developerSchema.safeParse(parsedValues);

    if (!validationResult.success) {
      return { error: "Invalid fields", details: validationResult.error.errors };
    }

    const {
      imageurl,
    } = validationResult.data;

    let imageUrl: string | undefined = undefined;

    if (imageurl instanceof File) {
      const slug = `${toSlug(user.name || "")}-${nanoid(10)}`;
      const blob = await put(
        `developer_logo_img/${slug}${path.extname(imageurl.name)}`,
        imageurl,
        {
          access: "public",
          addRandomSuffix: false,
        }
      );
      imageUrl = blob.url;

      // Delete old image if it exists
      if (user.image) {
        await del(user.image);
      }
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: {
          image: imageUrl,
        },
      }),
      // prisma.company.update({
      //   where: { userId: user.id },
      //   data: {
      //     website,
      //     size,
      //     industry,
      //     location,
      //     techStack: techstack,
      //     dateFounded: date,
      //     bio,
      //   },
      // }),
    ]);

    revalidatePath("/company/settings");
    return { success: "Company details updated successfully" };
  } catch (error) {
    return { error: "Unexpected error occurred" };
  }
};