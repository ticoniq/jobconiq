"use client";
import { usePathname } from "next/navigation";
import {
  MessageSquareText,
  LayoutDashboard,
  Settings,
  CircleHelp,
} from "lucide-react"
import Link from "next/link";

const navigation = [
  { name: "Dashboard", href: "/developer/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
  { name: "Messages", href: "/developer/message", icon: <MessageSquareText className="h-4 w-4" /> },
];
const settings = [
  { name: "Settings", href: "/developer/settings", icon: <Settings className="h-4 w-4" /> },
  { name: "Help", href: "/developer/help", icon: <CircleHelp className="h-4 w-4" /> },
];

export function SideBar() {
  const pathname = usePathname();
  
  return (
    <nav className="w-full grid items-start space-y-2 text-sm font-medium">
      {navigation.map((item) => (
        <div key={item.name} className="flex justify-start items-center group/item">
          <p className={`border-r-[3.5px] h-[28px] border-brand-primary group/edt 
                      ${pathname === item.href ? 'visible' : 'invisible group-hover/item:visible'}`} />
          <Link
            href={item.href}
            className={`w-full mx-2 flex items-center justify-start px-5 gap-3 rounded-lg py-2 transition-all hover:text-brand-primary hover:bg-blue-100
                    ${pathname === item.href ? "bg-blue-100 text-brand-primary" : ""}`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        </div>
      ))}
      <div className="py-6">
        <span className="border-t border-primary block" />
      </div>
      <p className="px-8 font-semibold text-sm">SETTINGS</p>
      {settings.map((item) => (
        <div key={item.name} className="flex justify-start items-center group/item">
          <p className={`border-r-[3.5px] h-[28px] border-brand-primary group/edt 
                      ${pathname === item.href ? 'visible' : 'invisible group-hover/item:visible'}`} />
          <Link
            href={item.href}
            className={`w-full mx-2 flex items-center font-medium justify-start px-5 gap-3 rounded-lg py-2 transition-all hover:text-brand-primary hover:bg-blue-100
                    ${pathname === item.href ? "bg-blue-100 text-brand-primary" : ""}`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        </div>
      ))}
    </nav>
  )
}