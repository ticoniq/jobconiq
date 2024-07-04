"use server";
import path from "path";
import * as z from "zod";
import { nanoid } from "nanoid";
import { put } from "@vercel/blob";
import { toSlug } from "@/lib/utils";
import { currentUser } from "@/lib/auths";
import { JobApplicationSchema } from "@/lib/validation/Job-validation";
import prisma from "@/lib/prisma";
import { UserRole } from "@prisma/client";
import { sendJobApplicationEmail } from "@/lib/mail";
import { send } from "process";

export const jobApplication = async (formData: FormData) => {
  const values = Object.fromEntries(formData.entries());
  const validatedFields = JobApplicationSchema.safeParse(values);

  if (!validatedFields.success) {
    console.log("error");
    return { error: "Invalid fields" };
  }

  const user = await currentUser();
  const userId = user?.id;

  if (!userId || user?.role !== UserRole.DEVELOPER) {
    return { error: "User not found" };
  }

  const {
    fullName,
    emailAddress,
    phoneNumber,
    currentJobTitle,
    linkedInURL,
    portfolioURL,
    resumeAttachmentUrl,
    additionalInfo,
    jobId,
    status,
  } = validatedFields.data;

  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
    },
  });

  // Check if the user has already applied for the job
  const existingApplication = await prisma.jobApplication.findFirst({
    where: {
      jobId,
      userId,
    },
  });

  if (existingApplication) {
    return { error: "User has already applied for this position" };
  }

  const slug = `${toSlug(fullName)}-${nanoid(10)}`;
  let resumeAttachment: string | undefined = undefined;

  if (resumeAttachmentUrl) {
    const blob = await put(
      `applicant_resume/${slug}${path.extname(resumeAttachmentUrl.name)}`,
      resumeAttachmentUrl,
      {
        access: "public",
        addRandomSuffix: false,
      },
    );
    resumeAttachment = blob.url;
  }

  await prisma.jobApplication.create({
    data: {
      jobId,
      userId: userId!,
      fullName,
      emailAddress,
      phoneNumber,
      currentJobTitle,
      linkedInURL,
      portfolioURL,
      additionalInfo,
      resumeAttachment,
      status,
    },
  });

  sendJobApplicationEmail(emailAddress, fullName, job?.title || "", phoneNumber, resumeAttachment || "");

  return { success: `Applied successfully for the position of ${job?.title}` };
};