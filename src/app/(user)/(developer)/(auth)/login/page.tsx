import { LoginForm } from "@/components/auth/loginForm";
import { Logo } from "@/components/logo";
import CustomLink from "@/components/ui/custom-link";

type LoginPageProps = {}

export default function LoginPage({ }: LoginPageProps) {
  return (
    <div className="lg:p-8 justify-self-center self-center">
      <div className="mx-auto flex h-screen w-full flex-col justify-center space-y-4 sm:w-[25.5rem] lg:h-full">
        <div className="self-center lg:hidden">
          <Logo />
        </div>
        <h1 className="text-center font-clash text-2xl font-semibold lg:text-3xl">
          Welcome Back, Dude
        </h1>
        <LoginForm />
        <p className="text-base text-muted-foreground">
          Don’t have an account?{" "}
          <CustomLink
            href="/register"
            className="text-brand-primary font-semibold"
            textarea={'Register'}
            divClassName="border-brand-primary border-b-2"
          />
        </p>
      </div>
    </div>
  )
}