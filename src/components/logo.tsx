import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logo.png";
import logoLight from "@/assets/images/logo-2.png";

export function Logo() {
  return (
    <Link href="/">
      <span className="sr-only">JobConiq</span>
      <Image
        src={logo}
        alt="JobConiq Logo"
        width={160}
        height={32}
        priority
        className="block dark:hidden"
      />
      <Image
        src={logoLight}
        alt="JobConiq Logo"
        width={160}
        height={32}
        priority
        className="hidden dark:block"
      />
    </Link>
  )
}