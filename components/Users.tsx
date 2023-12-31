import { getAllUsers } from "@/app/actions/user";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "./ui/label";

export default async function Users({ key }: { key: string }) {
  const users = (await getAllUsers({ key: key })) as [string];
  return (
    <div className="flex flex-col justify-center sm:items-start gap-5 items-center">
      {users.length < 1 ? (
        <p className="text-center text-slate-500 text-xl p-5 w-[90vw] max-w-[500px] border bg-white dark:bg-gray-800/20 ">
          No Users
        </p>
      ) : (
        <>
          <Label className="text-3xl pl-2 sm:text-start text-center">
            Users ({users.length}){" "}
          </Label>
          <Table className="w-[90vw] max-w-[500px] border shadow-xl bg-white dark:bg-gray-800/20">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">No.</TableHead>
                <TableHead className="w-[100px]">Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{i + 1}</TableCell>
                  <TableCell className="font-medium">{user}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
}
