import { Resend } from "resend";
import emailConfirmation from "@/email/emailConfirmation";
// import ResetPasswordEmail from "@/components/EmailTemplate/forgotPasswordMail";
// import TwoFactorMail from "@/components/EmailTemplate/twoFactorMail";

const resend = new Resend(process.env.RESEND_API_KEY);
const websiteUrl = process.env.WEBSITE_URL;

export const sendVerificationEmail = async (email: string, token: string) => {
  const ConfirmLink = `${websiteUrl}/auth/confirm?token=${token}`;
  await resend.emails.send({
    from: "Jobconiq <noreply@jobconiq.live>",
    to: email,
    subject: "Confirm your email",
    react: emailConfirmation({ link: ConfirmLink }),
  });
};

// export const sendForgotPasswordEmail = async (email: string, token: string) => {
//   const ResetLink = `${websiteUrl}/auth/new-password?token=${token}`;
//   await resend.emails.send({
//     from: `Jobconiq <noreply@jobconiq.live>`,
//     to: email,
//     subject: "Reset your Password",
//     react: ResetPasswordEmail({ resetPasswordLink: ResetLink }),
//   });
// };

// export const sendTwoFactorEmail = async (email: string, token: string) => {
//   await resend.emails.send({
//     from: "Jobconiq <noreply@jobconiq.live>",
//     to: email,
//     subject: "2FA Confirmation Code",
//     react: TwoFactorMail({ validationCode: token }),
//   });
// };
