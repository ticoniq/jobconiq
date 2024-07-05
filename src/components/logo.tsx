import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logo.png";
import logoLight from "@/assets/images/logo-2.png";

interface LogoProps {
  link?: string;
}

export function Logo({ link = "/" }: LogoProps) {
  return (
    <Link href={link}>
      <span className="sr-only">JobConiq</span>
      <Image
        src={logo}
        alt="JobConiq Logo"
        width={160}
        height={32}
        priority={true}
        className="block dark:hidden"
      />
      <Image
        src={logoLight}
        alt="JobConiq Logo"
        width={160}
        height={32}
        priority={true}
        className="hidden dark:block"
      />
    </Link>
  )
}