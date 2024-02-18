"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { Button } from "./ui/button";
import { changeUserRole, deleteUser } from "@/app/actions/user";
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

  const handleRoleChange = async (role: string) => {
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

  const hadleDeleteUser = async (email: string) => {
    toast.loading("Deleting user...");
    const res = await deleteUser({ email: email, secret: secret });
    if (res.status) {
      toast.success(res.message);
      router.refresh();
    } else {
      toast.error(res.message);
    }
  };
  return (
    <>
      <AlertDialog>
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
            {user.isAdmin ? (
              "NA"
            ) : (
              <AlertDialogTrigger>
                <Button
                  variant={"outline"}
                  className="border-red-700 hover:bg-transparent rounded-none"
                >
                  Delete
                </Button>
              </AlertDialogTrigger>
            )}
          </TableCell>
        </TableRow>
        <AlertDialogContent className="bg-[#ffffff] dark:bg-black border-[#EBEBEB] dark:border-[#1F1F1F]">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <p>
            This will permanently delete user{" "}
            <span className=" text-red-700">{user.email}</span> and they won't
            be able to access your application.
          </p>
          <AlertDialogFooter className="gap-5">
            <AlertDialogCancel
              className=" rounded-none border-[#EBEBEB] dark:border-[#1F1F1F]"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction  onClick={() => hadleDeleteUser(user.email)} className=" rounded-none bg-red-700 hover:bg-red-600 text-white">
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
