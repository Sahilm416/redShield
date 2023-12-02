import { NextRequest,NextResponse } from "next/server"
import { db } from "@/utils/database/db"



export const POST = async (request : Request)=>{
       const key = request.headers.get("authorization") as string;
       const res = await db.get(key);
       if(!res){
              return NextResponse.json({ message: "Unauthorized key"} , {status: 401})
       }
      else {
             
      }
     
       return NextResponse.json({message: "Success"} , {status:200})
       

}