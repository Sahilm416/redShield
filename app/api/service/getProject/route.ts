const { NextResponse } = require("next/server");
const { db } = require("@/utils/database/db");

export const GET = async (request: Request) => {
  const key = request.headers.get("authorization") as string;
  if (!key) {
    return NextResponse.json({
      status: false,
      message: "provide authorization header",
    });
  }
  try {
    const { project_id, project_name } = await db.get("API_KEY:" + key);
    if (!project_id) {
      return NextResponse.json({ status: false, message: "Unauthorized key" });
    } else {
      return NextResponse.json({ project_id, project_name, status: true });
    }
  } catch (error) {
    console.log("something went wrong", error);
    return NextResponse.json({
      status: false,
      message: "database call failed",
    });
  }
};
