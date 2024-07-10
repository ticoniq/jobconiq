"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function incrementJobViewCount(slug: string) {
  const cookieStore = cookies();
  const viewedCookie = cookieStore.get(`viewed-job-${slug}`);

  // If the cookie exists, the user has already viewed this job
  if (viewedCookie) {
    return null; // Or you could return the existing view count
  }

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

    // Return an object indicating that a cookie should be set
    return {
      result,
      setCookie: {
        name: `viewed-job-${slug}`,
        value: 'true',
        options: {
          maxAge: 60 * 60 * 24, // 24 hours
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        }
      }
    };
  } catch (error) {
    console.error("Failed to increment view count:", error);
    throw error;
  }
}