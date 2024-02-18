"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableCell, TableRow } from "@/components/ui/table";
import { MailIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { changeUserRole } from "@/app/actions/user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function TableComponent({
  user,
  srNo,
  secret,
}: {
  user: {
    email: string;
    creation_date: string;
    uid: string;
    first_name: string;
    last_name: string;
    isAdmin: boolean;
  };
  srNo: number;
  secret: string;
}) {
  const router = useRouter();
 
  const handleRoleChange = async (role:string) => {
    toast.loading("Updating user role...");

    const res = await changeUserRole({
      email: user.email,
      role: role,
      secret: secret,
    });
    if (res.status) {
      toast.success(res.message);
      window.location.reload();
    } else {
      toast.error(res.message);
    }
  };

  const fakeLoad = async () => {
    return;
  };
  return (
    <>
      <TableRow
        className={`${
          user.isAdmin && "bg-blue-600 hover:bg-blue-700 text-white"
        } border-[#EBEBEB] dark:border-[#1F1F1F]`}
      >
        <TableCell>{srNo}</TableCell>

        <TableCell>{user.email}</TableCell>

        <TableCell>{user.first_name || "NA"}</TableCell>

        <TableCell className="text-black dark:text-white">
          <Select
            name="SelectRole"
            defaultValue={user?.isAdmin ? "Admin" : "User"}
            onValueChange={(value) => {
               handleRoleChange(value);
            }}
          >
            <SelectTrigger
              className={`${
                user.isAdmin
                  ? "border-white"
                  : "border-[#EBEBEB] dark:border-[#1F1F1F]"
              } w-[180px] rounded-none`}
            >
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent className=" rounded-none dark:bg-black">
              <SelectGroup>
                <SelectItem value="Admin" className=" cursor-pointer">
                  Admin
                </SelectItem>
                <SelectItem value="User" className=" cursor-pointer">
                  User
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </TableCell>
        <TableCell>{user.creation_date}</TableCell>
        <TableCell>{user.uid}</TableCell>
        <TableCell>
          <MailIcon className=" w-5" />
        </TableCell>
        <TableCell>
          <Drawer>
            {user.isAdmin ? (
              "NA"
            ) : (
              <DrawerTrigger>
                <Button
                  variant={"outline"}
                  className="border-red-700 hover:bg-transparent rounded-none"
                >
                  Delete
                </Button>
              </DrawerTrigger>
            )}
            <DrawerContent className="dark:bg-black bg-[#ffffff] border-[#EBEBEB] dark:border-[#1F1F1F]">
              <Card className=" rounded-none shadow-none border-0 min-w-[300px] sm:min-w-[400px] max-w-[500px] mx-auto">
                <CardHeader>
                  <CardTitle>Are you sure ?</CardTitle>
                  <CardDescription>
                    This actions can't be undone
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    This will delete the user{" "}
                    <span className="font-semibold">{user.email}</span>{" "}
                    permenently from our servers and they won't be able to
                    access your application.
                  </p>
                </CardContent>
                <CardFooter className="flex-col gap-5">
                  <Button className="rounded-none w-full bg-red-700 text-white hover:bg-red-500">
                    delete
                  </Button>{" "}
                  <DrawerClose className="w-full">
                    <Button
                      variant={"outline"}
                      className=" border rounded-none w-full border-[#EBEBEB] dark:border-[#1F1F1F]"
                    >
                      Cancel
                    </Button>
                  </DrawerClose>
                </CardFooter>
              </Card>
            </DrawerContent>
          </Drawer>
        </TableCell>
      </TableRow>
    </>
  );
}
