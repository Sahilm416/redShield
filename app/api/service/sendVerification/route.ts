const { NextResponse } = require("next/server");
const { db } = require("@/utils/database/db");


interface reqBody {
  username: string;
  email: string;
  url_endpoint: string;
}
export const POST = async (request : Request)=>{
    
    const key = request.headers.get("authorization") as string;
    const res = await db.get("API_KEY:"+key);
    if (!res) {
        return NextResponse.json({ message: "Unauthorized key" }, { status: 401 });
      } else {
        const data : reqBody = await request.json();

        const requestedUser = await db.get(`${res.project_id+":=>"+data.username}`);
        if (!requestedUser) {
            return NextResponse.json({ message: "username doesnt exists" }, { status: 401 });
        }
        try {
            
          
          return NextResponse.json({message:"hiii"},{status:200})
        } catch (error) {
          console.log(error)
          return NextResponse.json({message:"error while sending mail"},{status:400})
        }
      }
   
}