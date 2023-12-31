import { getAllUsers } from "@/app/actions/user";

import { Label } from "./ui/label";

import TableComponent from "./Table";

export default async function Users({ secret }: { secret: string }) {
  const users = (await getAllUsers({ key: secret })) as [string];
  return (
    <div className="flex flex-col justify-center gap-5 items-center w-[90vw] max-w-[500px]">
      {users.length < 1 ? (
        <p className="text-center text-slate-500 text-xl p-5 w-[90vw] max-w-[500px] border bg-white dark:bg-gray-800/20 ">
          No Users
        </p>
      ) : (
        <>
          <Label className="text-3xl pl-2 sm:text-start text-center">
            Users ({users.length}){" "}
          </Label>

          {users.map((user, i) => (
            <TableComponent key={i} email={user} i={i} secret={secret} />
          ))}
        </>
      )}
    </div>
  );
}
