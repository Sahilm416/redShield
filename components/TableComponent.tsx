"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import { MailIcon } from "lucide-react";
import { useState } from "react";
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
  const [showUser, setShowUser] = useState<boolean>(false);
  const handleClick = (e: any, email: string) => {
    e.preventDefault();
    setShowUser(true);
  };
  return (
    <>
      <TableRow
        onClick={(e) => handleClick(e, user.email)}
        className={`${
          user.isAdmin &&
          "bg-yellow-500 dark:bg-yellow-700 hover:bg-yellow-400 dark:hover:bg-yellow-600"
        } border-[#EBEBEB] dark:border-[#1F1F1F]`}
      >
        <TableCell>{srNo}</TableCell>
        <TableCell className=" cursor-pointer">{user.email}</TableCell>
        <TableCell className=" cursor-pointer">
          {user.first_name || "NA"}
        </TableCell>
        <TableCell className=" cursor-pointer">
          {user.isAdmin ? (
            <span className="text-green-700 px-2 py-1 bg-green-100 rounded-2xl border border-green-700">
              Admin
            </span>
          ) : (
            "User"
          )}
        </TableCell>
        <TableCell className=" cursor-pointer">{user.creation_date}</TableCell>
        <TableCell className=" cursor-pointer">{user.uid}</TableCell>
        <TableCell className=" cursor-pointer">
          <MailIcon className=" w-5" />
        </TableCell>
      </TableRow>
    
    </>
  );
}
