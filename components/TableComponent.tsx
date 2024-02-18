"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableCell, TableRow } from "@/components/ui/table";
import { MailIcon } from "lucide-react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

export default function TableComponent({
  user,
  srNo,
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
}) {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      <TableRow
        className={`${
          user.isAdmin &&
          "bg-yellow-500 dark:bg-yellow-700 hover:bg-yellow-400 dark:hover:bg-yellow-600"
        } border-[#EBEBEB] dark:border-[#1F1F1F]`}
      >
        <TableCell>{srNo}</TableCell>

        <TableCell>{user.email}</TableCell>

        <TableCell>{user.first_name || "NA"}</TableCell>

        <TableCell>
          <Drawer>
            <DrawerTrigger>
              {user.isAdmin ? (
                <span
                  title="click to set role"
                  className="text-blue-700 px-2 py-1 bg-blue-100 rounded-2xl border border-blue-700"
                >
                  Admin
                </span>
              ) : (
                <span
                  title="click to set role"
                  className="text-blue-700 px-2 py-1 bg-blue-100 rounded-2xl border border-blue-700"
                >
                  User
                </span>
              )}
            </DrawerTrigger>
            <DrawerContent className="dark:bg-black bg-[#ffffff]">
              <Card className=" rounded-none shadow-none border-0 min-w-[300px] sm:min-w-[400px] max-w-[500px] mx-auto">
                <CardHeader>
                  <CardTitle>User Setting</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <p className=" font-semibold">
                    Email : <span className="font-normal">{user.email}</span>
                  </p>
                  <p className="font-semibold">
                    Name :{" "}
                    <span className="font-normal">
                      {user.first_name || "NA"}
                    </span>
                  </p>
                  <div className="flex items-center gap-3">
                    <p className="font-semibold">Role : </p>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue
                          placeholder={user.isAdmin ? "Admin" : "user"}
                        />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-black">
                        <SelectGroup>
                          <SelectItem value="apple">Admin</SelectItem>
                          <SelectItem value="banana">User</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter className="flex-col gap-3">
                  <Button disabled={loading} className="rounded-none w-full">
                    Save
                  </Button>{" "}
                  <DrawerClose className="w-full">
                    <Button
                      variant={"outline"}
                      className=" border rounded-none w-full"
                    >
                      Cancel
                    </Button>
                  </DrawerClose>
                </CardFooter>
              </Card>
            </DrawerContent>
          </Drawer>
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
                <Button className="bg-red-700 hover:bg-red-500 text-white rounded-none">
                  Delete
                </Button>
              </DrawerTrigger>
            )}
            <DrawerContent className="dark:bg-black bg-[#ffffff]">
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
                <CardFooter className="flex-col gap-3">
                  <Button
                    disabled={loading}
                    className="rounded-none w-full bg-red-700 text-white hover:bg-red-500"
                  >
                    delete
                  </Button>{" "}
                  <DrawerClose className="w-full">
                    <Button
                      variant={"outline"}
                      className=" border rounded-none w-full"
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
