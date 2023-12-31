import { getAllUsers } from "@/app/actions/user"

export default async function Users(){

    const users = await getAllUsers();
    return (
        <div>
          
        </div>
    )
}