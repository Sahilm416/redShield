const { NextResponse } = require("next/server");
const { db } = require("@/utils/database/db");

interface reqBody {
  email: string;
}
export const GET = async (request: Request) => {
  const key = request.headers.get("authorization") as string;
  if (!key) {
    return NextResponse.json(
      { message: "provide authorization header" },
      { status: 401 }
    );
  }
  try {
    const { project_id, project_name } = await db.get("API_KEY:" + key);
    if (!project_id) {
      return NextResponse.json(
        { message: "Unauthorized key" },
        { status: 401 }
      );
    } else {
      return NextResponse.json({ project_id, project_name }, { status: 200 });
    }
  } catch (error) {
    console.log("something went wrong", error);
    return NextResponse.json(
      { message: "database call failed" },
      { status: 404 }
    );
  }
};
