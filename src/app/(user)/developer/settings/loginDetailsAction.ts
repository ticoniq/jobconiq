"use server";

import * as z from "zod";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import {
  ChangePasswordSchema,
  updateEmailSchema,
} from "@/lib/validation/developer-validation";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auths";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export async function updatePassword(
  values: z.infer<typeof ChangePasswordSchema>
) {
  try {
    const user = await currentUser();
    if (!user) return { error: "Unauthorized" };

    const existingUser = await getUserById(user.id!);

    if (!existingUser) {
      return { error: "User not found" };
    }

    if (!existingUser.password) {
      return { error: "User has no password set" };
    }

    // Verify the old password
    const isOldPasswordValid = await bcrypt.compare(
      values.oldPassword,
      existingUser.password
    );

    if (!isOldPasswordValid) {
      return { error: "Current password is incorrect" };
    }

    // Check if the new password is the same as the old password
    if (values.oldPassword === values.newPassword) {
      return {
        error: "New password must be different from the current password",
      };
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(values.newPassword, 10);

    // Update the password in the database
    await prisma.user.update({
      where: { id: user.id! },
      data: { password: hashedPassword },
    });

    return { success: "Password updated successfully" };
  } catch (error) {
    return { error: "An error occurred while updating the password" };
  }
}

export async function updateEmail(values: z.infer<typeof updateEmailSchema>) {
  try {
    // Validate input
    const validatedFields = updateEmailSchema.safeParse(values);
    if (!validatedFields.success) {
      throw new Error("Invalid fields");
    }
    const { email } = validatedFields.data;

    // Check current user
    const user = await currentUser();
    if (!user) {
      throw new Error("Unauthorized");
    }

    // Get existing user
    const existingUser = await getUserById(user.id!);
    if (!existingUser) {
      throw new Error("User not found");
    }

    // If email hasn't changed, no need to update
    if (email === existingUser.email) {
      return { success: "No changes made to email" };
    }

    // Check if new email already exists
    const emailExists = await getUserByEmail(email);
    if (emailExists) {
      throw new Error("Email already exists");
    }

    // Generate verification token
    const verificationToken = await generateVerificationToken(email);

    // Send verification email
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    // Update user with new unverified email
    await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        email: email,
        emailVerified: null, // Set email as unverified
      },
    });

    return { success: "Verification email sent!" };
  } catch (error) {
    console.error("Error updating email:", error);
    return {
      error:
        error instanceof Error
          ? error.message
          : "An error occurred while updating the email",
    };
  }
}
