import { getAllUsers } from "@/app/actions/user";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import TableComponent from "./TableComponent";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


export default async function Users({ secret }: { secret: string }) {
  const users = (await getAllUsers({ key: secret })) as [
    {
      email: string;
      creation_date: string;
      uid: string;
      first_name: string;
      last_name: string;
      isAdmin: boolean;
    }
  ];
  //show admins first then other users
  users.sort((a, b) => {
    if (a.isAdmin && !b.isAdmin) {
      return -1;
    } else if (!a.isAdmin && b.isAdmin) {
      return 1;
    } else {
      return 0;
    }
  });
 
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
              <CardTitle>
                Users{" "}
                <span className="text-lg font-normal">( {users.length} )</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <Table>
                <TableHeader>
                  <TableRow className=" w-full border-y border-[#EBEBEB] dark:border-[#1F1F1F]">
                    <TableHead className="">Sr</TableHead>
                    <TableHead className="">Mail</TableHead>
                    <TableHead className="">Name</TableHead>
                    <TableHead className="">Role</TableHead>
                    <TableHead className="">Created at</TableHead>
                    <TableHead className="">Uid</TableHead>
                    <TableHead className="">Method</TableHead>
                    <TableHead className="">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user, i) => (
                    <TableComponent key={i} srNo={i+1} user={user} secret={secret}/>
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
