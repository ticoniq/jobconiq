import prisma from "@/lib/prisma";

export const getForgotPasswordTokenByToken = async (token: string) => {
  try {
    const forgotPasswordToken = await prisma.passwordResetToken.findUnique({
      where: {
        token,
      },
    });

    return forgotPasswordToken;
  } catch {
    return null;
  }
};

export const getForgotPasswordTokenByEmail = async (email: string) => {
  try {
    const forgotPasswordToken = await prisma.passwordResetToken.findFirst({
      where: {
        email,
      },
    });

    return forgotPasswordToken;
  } catch {
    return null;
  }
};
