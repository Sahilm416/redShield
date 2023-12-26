import { db } from "@/utils/database/db"


export default async function AppUsers (){

    const res = await db.keys("3f6f7c04-1aef-4e15-a2b9-512c282a1a72"+":->*")
    console.log(res)
    return (
        <div>
           {res.map((r)=>(
            <p>{r}</p>
           ))}
        </div>
    )
}