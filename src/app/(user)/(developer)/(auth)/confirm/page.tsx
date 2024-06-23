import NewVerificationForm from "@/components/auth/NewVerificationForm";
import { Logo } from "@/components/logo";
import CustomLink from "@/components/ui/custom-link";

export default function confirmpage() {
  return (
    <div className="lg:p-8 justify-self-center self-center">
      <div className="mx-auto flex h-screen w-full flex-col justify-center space-y-10 sm:w-[30rem] lg:h-full">
        <div className="self-center lg:hidden">
          <Logo />
        </div>
        <h1 className="text-center font-clash text-2xl font-semibold lg:text-3xl">
          Confirm your email address
        </h1>
        <NewVerificationForm />
        <p className="text-base text-muted-foreground">
          {"Back to"}?{" "}
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