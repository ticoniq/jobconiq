import { Resend } from "resend";
import emailConfirmation from "@/email/emailConfirmation";
import ResetPasswordEmail from "@/email/forgotPasswordMail";

const resend = new Resend(process.env.RESEND_API_KEY);
const websiteUrl = process.env.WEBSITE_URL;
const websiteEmail = process.env.WEBSITE_EMAIL;

export const sendVerificationEmail = async (email: string, token: string) => {
  const ConfirmLink = `${websiteUrl}/confirm?token=${token}`;
  await resend.emails.send({
    from: `Jobconiq <${websiteEmail}>`,
    to: [email],
    subject: "Confirm your email",
    react: emailConfirmation({ websiteUrl: websiteUrl, link: ConfirmLink }),
    tags: [
      {
        name: 'email_type',
        value: 'confirm_email',
      },
    ],
  });
};

export const sendForgotPasswordEmail = async (email: string, token: string) => {
  const ResetLink = `${websiteUrl}/new-password?token=${token}`;
  await resend.emails.send({
    from: `Jobconiq <${websiteEmail}>`,
    to: email,
    subject: "Reset your Password",
    react: ResetPasswordEmail({ websiteUrl: websiteUrl, resetPasswordLink: ResetLink }),
  });
};
