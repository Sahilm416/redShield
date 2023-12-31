import { getAllUsers } from "@/app/actions/user";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardTitle, CardHeader } from "./ui/card";
export default async function Users() {
  const users = await getAllUsers() as [string];
  return (
    <Card className="w-[90vw] max-w-[500px] shadow-lg bg-white dark:bg-gray-800/20">
      <CardHeader>
        <CardTitle>Users</CardTitle>
      </CardHeader>
      <CardContent>
        {users.map((user, i) => (
          <div key={i} className="pb-2">
            <Link href={"#"}>
              <span>{i + 1 + "] "}</span><span className="hover:underline">{user}</span>
            </Link><br />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
