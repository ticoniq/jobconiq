"use server";
import path from "path";
import { nanoid } from "nanoid";
import prisma from "@/lib/prisma";
import { toSlug } from "@/lib/utils";
import { put, del } from "@vercel/blob";
import { currentUser } from "@/lib/auths";
import { revalidatePath } from "next/cache";
import { professionalSchema } from "@/lib/validation/developer-validation";

export const UpdateProfessionDetails = async (formData: FormData) => {
  try {
    const user = await currentUser();
    if (!user?.id) {
      return { error: "User not authenticated" };
    }

    const values = Object.fromEntries(formData.entries());
    const techSkillString = formData.get('skills') as string;
    const languageString = formData.get('languages') as string;

    const parsedValues = {
      ...values,
      skills: techSkillString ? JSON.parse(techSkillString) : [],
      languages: languageString ? JSON.parse(languageString) : [],
      resumeAttachmentUrl: formData.get('resumeAttachmentUrl') as File | null,
    };

    const validationResult = professionalSchema.safeParse(parsedValues);

    if (!validationResult.success) {
      return { error: "Invalid fields", details: validationResult.error.errors };
    }

    const {
      resumeAttachmentUrl,
      experience,
      qualification,
      skills,
      languages,
    } = validationResult.data;

    let resumeUrl: string | undefined = undefined;

    if (resumeAttachmentUrl instanceof File) {
      const slug = `${toSlug(user.name || "")}-${nanoid(10)}`;
      const blob = await put(
        `resume/${slug}${path.extname(resumeAttachmentUrl.name)}`,
        resumeAttachmentUrl,
        {
          access: "public",
          addRandomSuffix: false,
        }
      );
      resumeUrl = blob.url;

      // Delete old resume if it exists
      const currentDeveloper = await prisma.developer.findUnique({
        where: { userId: user.id },
        select: { resumeUrl: true },
      });
      if (currentDeveloper?.resumeUrl) {
        await del(currentDeveloper.resumeUrl).catch(console.error);
      }
    }

    await prisma.developer.update({
      where: { userId: user.id },
      data: {
        experience,
        qualification,
        skills,
        languages,
        resumeUrl,
      },
    });

    revalidatePath("/developer/settings");
    return { success: "Developer details updated successfully" };
  } catch (error) {
    console.error("Error updating developer details:", error);
    return { error: "Unexpected error occurred" };
  }
};