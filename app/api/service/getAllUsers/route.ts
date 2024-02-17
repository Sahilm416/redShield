const { NextResponse } = require("next/server");
const { db } = require("@/utils/database/db");

export const GET = async (request: Request) => {
  const key = request.headers.get("authorization") as string;
  const pipeline = db.pipeline();
  const { project_id } = await db.get("API_KEY:" + key);

  if (!project_id) {
    return NextResponse.json({ message: "Unauthorized key" }, { status: 401 });
  } else {
    try {
      const allUsers = (await db.keys(project_id + ":*:user")) as [string];
      if (allUsers) {
         for(let user in allUsers) {
            pipeline.get(allUsers[user]);
         }

         const result = await pipeline.exec();
         return NextResponse.json({users: result},{status: 200})
      } else {
        return NextResponse.json({ users: [] }, { status: 200 });
      }
    } catch (err) {
      console.log("something went wrong", err);
      return NextResponse.json(
        { message: "database call failed" },
        { status: 404 }
      );
    }
  }
};
