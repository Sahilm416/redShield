import { getAllUsers } from "@/app/actions/user";
import {MailIcon} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
export default async function Users({ secret }: { secret: string }) {
  const users = (await getAllUsers({ key: secret })) as [string];
  return (
    <div className="flex flex-col justify-center gap-5 items-center w-full max-w-[1500px] px-5 ">
      {users.length < 1 ? (
        <p className="text-center text-slate-500 text-xl p-5 w-full border bg-white dark:bg-gray-800/20 border-[#EBEBEB] dark:border-[#1F1F1F] ">
          No Users
        </p>
      ) : (
        <>
          <Card className="bg-zinc-50 dark:bg-zinc-950 rounded-md w-full border border-[#EBEBEB] dark:border-[#1F1F1F] my-5 ">
            <CardHeader className=" bg-zinc-100 dark:bg-zinc-900">
              <CardTitle className="text-4xl flex items-center gap-5">
                Users <Badge className="text-lg px-5">{users.length}</Badge>
              </CardTitle>
              
            </CardHeader>
            <CardContent className="px-0">
              <Table>
                <TableHeader>
                  <TableRow className=" border-y border-[#EBEBEB] dark:border-[#1F1F1F]">
                    <TableHead className="">Sr</TableHead>
                    <TableHead className="w-full">Mail</TableHead>
                    <TableHead className="w-full">Method</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user, i) => (
                    <TableRow key={i} className="border-[#EBEBEB] dark:border-[#1F1F1F]">
                      <TableCell className="font-medium">
                        {i + 1}
                      </TableCell>
                      <TableCell className="font-medium cursor-pointer">{user}</TableCell>
                      <TableCell className="font-medium cursor-pointer"><MailIcon/></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
