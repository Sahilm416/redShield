const { NextResponse } = require("next/server");
const { db } = require("@/utils/database/db");


interface reqBody {
  username?: string;
  email: string; 
  url_endpoint: string;
}

export const POST = async (request: Request)=>{
  
  const key = request.headers.get("authorization") as string;
  const res = await db.get(key);

  if (!res) {
    return NextResponse.json({ message: "Unauthorized key" }, { status: 401 });
  } else {
       const data : reqBody = await request.json();

       const requestedUser = await db.get(`${res.project_id+"->"+data.email}`);
       if(!requestedUser){

        return NextResponse.json({ message:"No such user email registered " } , { status:401});
       }
       try {
       
          const ResetId = await db.set(`${res.project_id+":"+"Forgot:"+requestedUser}`, true ,{ex:600})
        //return NextResponse.json({sentData},{status:200})
      } catch (error) {
        return NextResponse.json({message:"error while sending mail"},{status:400})
      }
      return NextResponse.json(requestedUser);
  }
}