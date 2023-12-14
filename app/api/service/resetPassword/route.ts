const { NextResponse } = require("next/server");
const { db } = require("@/utils/database/db");

interface reqBody {
    username: string;
}
export const POST = async (request : Request)=>{
    
    const key = request.headers.get("authorization") as string;
    const res = await db.get(key);
   

    if (!res) {
      return NextResponse.json({ message: "Unauthorized key" }, { status: 401 });
    } else{
       try { 
        const data : reqBody = await request.json();
        const checkToken = await db.get(`${res.project_id+":Forgot:"+data.username}`)

        if(!checkToken){
            return NextResponse.json({ success: false}, { status: 401 });
        }
        else{
            return NextResponse.json({ success: true }, { status:200});
        }
       } catch (error) {
           return NextResponse.json({ error: error ,success: false  }, { status:404});
       }
    }
}
