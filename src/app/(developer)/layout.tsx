import {Logo } from "@/components/logo";

interface Props {
  children: React.ReactNode;
}

const Developerlayout = ({ children }: Props) => {
  return (
    <>
      <div className="container relative h-full flex-col items-center justify-center md:grid lg:h-screen lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 lg:flex">
          <div className="absolute inset-0" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Logo />
          </div>
        </div>
        {children}
      </div>
    </>
  );
};
export default Developerlayout;