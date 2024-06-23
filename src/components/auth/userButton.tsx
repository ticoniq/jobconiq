"use server";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { currentUser } from "@/lib/auths";
import {
  Avatar,
  AvatarImage,
  AvatarFallback
} from "@/components/ui/avatar";
import LogoutButton from "@/components/auth/logoutButton";
import { ExternalLinkIcon } from "lucide-react";

async function UserButton() {
  const user = await currentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-1">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback>JC</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm text-start font-medium leading-none">
              {user?.name}
            </p>
            <p className="text-xs text-muted-foreground line">
              {user?.email}
            </p>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full" align="end">
        <LogoutButton>
          <DropdownMenuItem>
            <ExternalLinkIcon className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton