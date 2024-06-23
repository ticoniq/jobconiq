import { Resend } from "resend";
import emailConfirmation from "@/email/emailConfirmation";
import ResetPasswordEmail from "@/email/forgotPasswordMail";

const resend = new Resend(process.env.RESEND_API_KEY);
const websiteUrl = process.env.WEBSITE_URL;

export const sendVerificationEmail = async (email: string, token: string) => {
  const ConfirmLink = `${websiteUrl}/confirm?token=${token}`;
  await resend.emails.send({
    from: "Jobconiq <no-reply@jobconiq.live>",
    to: email,
    subject: "Confirm your email",
    react: emailConfirmation({ websiteUrl: websiteUrl, link: ConfirmLink }),
  });
};

export const sendForgotPasswordEmail = async (email: string, token: string) => {
  const ResetLink = `${websiteUrl}/new-password?token=${token}`;
  await resend.emails.send({
    from: `Jobconiq <no-reply@jobconiq.live>`,
    to: email,
    subject: "Reset your Password",
    react: ResetPasswordEmail({ websiteUrl: websiteUrl, resetPasswordLink: ResetLink }),
  });
};
