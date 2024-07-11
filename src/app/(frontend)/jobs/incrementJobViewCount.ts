"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function incrementJobViewCount(slug: string) {
  try {
    const result = await prisma.$transaction(async (tx) => {
      const job = await tx.job.findUnique({
        where: { slug },
        select: { id: true }
      });

      if (!job) {
        throw new Error("Job not found");
      }

      const viewCount = await tx.jobViewCount.create({
        data: {
          jobId: job.id
        }
      });

      // Update the job with the new view count
      await tx.job.update({
        where: { id: job.id },
        data: {
          viewCounts: {
            connect: { id: viewCount.id }
          }
        }
      });

      return viewCount;
    });

    // Revalidate the job page to reflect the updated view count
    revalidatePath(`/jobs/${slug}`);

    return result;
  } catch (error) {
    console.error("Failed to increment view count:", error);
    throw error; // Re-throw the error for the caller to handle
  }
}