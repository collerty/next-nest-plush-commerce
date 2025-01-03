// "use client"
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard, LayoutDashboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react"

import {Button} from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image";
import Link from "next/link";
import {LogoutButton} from "@/components/auth/logout-button";
import {logout} from "@/lib/actions";
import {User as UserType} from "@/lib/types";

export function UserAccount({user}: { user: UserType }) {
  // console.log(user);
  return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className='relative aspect-square h-8 w-8 rounded-full overflow-hidden cursor-pointer'>
            <Image
                fill
                loader={() => user.profileIcon}
                src={user.profileIcon}
                alt='Profile picture'
                referrerPolicy='no-referrer'
                sizes='32'
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel>
            <div className="truncate">{user.username}</div>
            <div className="text-muted-foreground font-normal truncate">{user.email}</div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator/>
          <DropdownMenuGroup>
            <DropdownMenuItem disabled>
              <User/>
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={"/orders"}>
                <CreditCard/>
                <span>Orders</span>
                <DropdownMenuShortcut>⇧⌘O</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={"/dashboard"}>
                <LayoutDashboard/>
                <span>Dashboard</span>
                <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator/>
          <DropdownMenuItem asChild>
            <a href="https://github.com/sozuki/next-nest-plush-commerce" target="_blank">
              <Github/>
              <span>GitHub</span>
            </a>
          </DropdownMenuItem>
          <DropdownMenuSeparator/>
          <DropdownMenuItem onClick={() => logout()} asChild>
            <div>
              <LogOut className='mr-2 h-4 w-4' aria-hidden='true'/>
              Logout
            </div>
          </DropdownMenuItem>

        </DropdownMenuContent>
      </DropdownMenu>
  )
}
