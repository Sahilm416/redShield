"use client";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { CardHeader, Card } from "@/components/ui/card";
import { Button } from "./ui/button";
import { LogOut } from "@/app/actions/auth";
export default function Component({
  username,
  isVerified,
  profile_picture,
}: {
  username: string;
  isVerified: boolean;
  profile_picture?: string;
}) {
  return (
    <>
      <div className="w-full flex justify-between max-w-[750px] px-2 space-y-5 select-none">
        <Card className="w-full h-[70px] p-0 flex justify-start border-none shadow-none items-center">
          <CardHeader className="flex items-center p-0 justify-between">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center space-x-1 cursor-pointer">
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      alt="User Name"
                      src="https://github.com/shadcn.png"
                    />
                    <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <h2 className="text-lg font-semibold pl-1">{username}</h2>
                    <div className="flex items-center space-x-1">
                      {isVerified ? (
                        <Badge
                          className="bg-green-700 text-white hover:bg-green-800"
                          variant={"default"}
                        >
                          verified
                        </Badge>
                      ) : (
                        <Badge variant={"destructive"}>not verified</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-52 mt-3">
                <DropdownMenuLabel>User Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>Edit profile</DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={async () => {
                      await LogOut();
                      return window.location.reload();
                    }}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
        </Card>
        <div>
          <Button variant={"outline"}>Add new project</Button>
        </div>
      </div>
    </>
  );
}

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
