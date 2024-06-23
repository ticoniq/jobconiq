"use server";
import * as z from "zod";
import { getUserByEmail } from "@/data/user";
import { ResetPasswordSchema } from "@/lib/validation/auth-validation";
import { sendForgotPasswordEmail } from "@/lib/mail";
import { generateforgotPasswordToken } from "@/lib/tokens";

export const forgotPassword = async (
  value: z.infer<typeof ResetPasswordSchema>
) => {
  const validatedFields = ResetPasswordSchema.safeParse(value);

  if (!validatedFields.success) {
    return { error: "Invalid email!" };
  }

  const { email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email not found!" };
  }

  const forgotPasswordToken = await generateforgotPasswordToken(email);
  await sendForgotPasswordEmail(
    forgotPasswordToken.email,
    forgotPasswordToken.token
  );

  return { success: "Password reset link sent to your email" };
};
