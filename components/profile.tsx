"use client"
import {
  LogOut,
  User,
  Menu,
  ScrollText
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut as LogUserOut } from "@/app/actions/auth";

export function Profile({logged}:{logged: boolean}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'} size={'icon'}>
           <Menu/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 sm:mr-0 mr-7">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem disabled={logged}>
            <User className="mr-2 h-4 w-4" />
            <span>dashboard</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem disabled={logged} onClick={async()=>{
              await LogUserOut();
              return window.location.reload();
          }}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator/>
        <DropdownMenuLabel>Resources</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <ScrollText className="mr-2 h-4 w-4"/>
            <span>docs</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}