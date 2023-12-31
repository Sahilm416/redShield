const { NextResponse } = require("next/server");
const { db } = require("@/utils/database/db");


export const GET = async (request: Request) => {

  const key = request.headers.get("authorization") as string;
  const { project_id } = await db.get("API_KEY:" + key);

  if (!project_id) {
    return NextResponse.json({ message: "Unauthorized key" }, { status: 401 });
  } else {
    try {
        const allUsers = await db.keys(project_id+":*:user") as [string];
        const users = allUsers.map((user)=>{
          const temp =user.split(":");
          return temp[1];
        })

      return NextResponse.json({users}, { status: 200 });
    } catch (err) {
      console.log("something went wrong", err);
      return NextResponse.json(
        { message: "database call failed" },
        { status: 404 }
      );
    }
  }
};
