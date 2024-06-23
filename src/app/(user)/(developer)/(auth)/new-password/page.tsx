import { NewPasswordForm } from "@/components/auth/newPasswordForm";
import { Logo } from "@/components/logo";
import CustomLink from "@/components/ui/custom-link";

function newPasswordPage() {
  return (
    <div className="lg:p-8 justify-self-center self-center">
      <div className="mx-auto flex h-screen w-full flex-col justify-center space-y-4 sm:w-[25.5rem] lg:h-full">
        <div className="self-center lg:hidden">
          <Logo />
        </div>
        <h1 className="text-center font-clash text-2xl font-semibold lg:text-3xl">
          Enter a new password
        </h1>
        <NewPasswordForm />
        <p className="text-base text-muted-foreground">
          Return back to?{" "}
          <CustomLink
            href="/login"
            className="text-brand-primary font-semibold"
            textarea={'Login'}
            divClassName="border-brand-primary border-b-2"
          />
        </p>
      </div>
    </div>
  )
}

export default newPasswordPage