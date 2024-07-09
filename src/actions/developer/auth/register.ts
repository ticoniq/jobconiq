"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { UserRole } from "@prisma/client";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { RegisterSchema } from "@/lib/validation/auth-validation";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const lowercaseEmail = email.toLowerCase();
  const existingUser = await getUserByEmail(lowercaseEmail);

  if (existingUser) {
    return { error: "Email already exists" };
  }

  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email: lowercaseEmail,
        password: hashedPassword,
        role: UserRole.DEVELOPER,
      },
    });

    // Create a corresponding entry in the developer table
    await prisma.developer.create({
      data: {
        userId: newUser.id,
      },
    });

    const verificationToken = await generateVerificationToken(lowercaseEmail);

    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return { success: "Confirmation email sent!" };
  } catch (error) {
    return { error: "An error occurred during registration" };
  }
};