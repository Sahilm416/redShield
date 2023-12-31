import { getAllUsers } from "@/app/actions/user";
import Link from "next/link";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Label } from "./ui/label";

export default async function Users() {
  const users = await getAllUsers() as [string];
  return (
    <div className="flex flex-col justify-center sm:items-start gap-5 items-center">
    <Label className="text-3xl pl-2 sm:text-start text-center">Users ({users.length}) </Label>
    <Table className="w-[90vw] max-w-[500px] border shadow-xl">
      <TableHeader>
        <TableRow>
        <TableHead className="w-[100px]">No.</TableHead>
          <TableHead className="w-[100px]">Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user ,i) => (
          <TableRow key={i}>
            <TableCell className="font-medium">{i+1}</TableCell>
            <TableCell className="font-medium">{user}</TableCell>
          </TableRow>
        ))}
      </TableBody>

    </Table>
    </div>
  );
}
