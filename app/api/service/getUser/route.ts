const { NextResponse } = require("next/server");
const { db } = require("@/utils/database/db");

interface reqBody {
  email: string;
}
export const POST = async (request: Request) => {
  const data: reqBody = await request.json();
  const key = request.headers.get("authorization") as string;
  const { project_id } = await db.get("API_KEY:" + key);

  if (!project_id) {
    return NextResponse.json({ message: "Unauthorized key" }, { status: 401 });
  } else {
    try {
      const user = await db.get(project_id + ":" + data.email);
      const projects = await db.get(
        project_id + ":" + data.email + ":projects"
      );

      return NextResponse.json({ user, projects }, { status: 200 });
    } catch (err) {
      console.log("something went wrong", err);
      return NextResponse.json(
        { message: "database call failed" },
        { status: 404 }
      );
    }
  }
};
