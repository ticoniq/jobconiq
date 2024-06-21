import { RegisterForm } from "@/components/auth/registerForm";
import { Logo } from "@/components/logo";
import CustomLink from "@/components/ui/custom-link";

type LoginPageProps = {}

export default function LoginPage({ }: LoginPageProps) {
  return (
    <div className="lg:p-8 py-8 md:py-0">
      <div className="mx-auto flex h-screen w-full flex-col justify-center space-y-4 sm:w-[25.5rem] lg:h-full">
        <div className="flex items-center justify-center lg:hidden">
          <Logo />
        </div>
        <h1 className="text-center font-clash text-3xl font-semibold tracking-tight lg:text-4xl">
          Get more opportunities
        </h1>
        <RegisterForm />
        <p className="text-base text-muted-foreground">
          Already have an account?{" "}
          <CustomLink
            href="/login"
            className="text-brand-primary font-semibold"
            textarea={'Login'}
            divClassName="border-brand-primary border-b-2"
          />
        </p>
        <p className="text-sm text-muted-foreground">
          {"By clicking 'Continue', you acknowledge that you have read and accept the"}{" "}
          <CustomLink
            href="/terms"
            className="text-brand-primary font-base"
            textarea={'Terms of Service'}
            divClassName="border-brand-primary border-b-2"
          />{" "}
          and{" "}
          <CustomLink
            href="/privacy"
            className="text-brand-primary font-base"
            textarea={'Privacy Policy'}
            divClassName="border-brand-primary border-b-2"
          />
          .
        </p>
      </div>
    </div>
  )
}