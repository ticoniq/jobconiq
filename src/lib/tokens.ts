import { v4 as uuidv4 } from "uuid";
import prisma from "@/lib/prisma";
import { getVerificationTokenByEmail } from "@/data/verificationToken";
// import { getForgotPasswordTokenByEmail } from "@/data/forgotPasswordToken";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expiresAt = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expiresAt,
    },
  });

  return verificationToken;
};

// export const generateforgotPasswordToken = async (email: string) => {
//   const token = uuidv4();
//   const expiresAt = new Date(new Date().getTime() + 3600 * 1000);

//   const existingToken = await getForgotPasswordTokenByEmail(email);
//   if (existingToken) {
//     await prisma.passwordResetToken.delete({
//       where: {
//         id: existingToken.id,
//       },
//     });
//   }

//   const forgotPasswordToken = await prisma.passwordResetToken.create({
//     data: {
//       email,
//       token,
//       expiresAt,
//     },
//   });

//   return forgotPasswordToken;
// }
