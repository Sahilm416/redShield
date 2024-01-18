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
    const res = (await db.get("API_KEY:" + key)) as {
      project_id: string;
      project_name: string;
    };
    if (!res) {
      return NextResponse.json({ status: false, message: "Unauthorized key" });
    } else {
      return NextResponse.json({
        project_id: res.project_id,
        project_name: res.project_name,
        status: true,
      });
    }
  } catch (error) {
    console.log("something went wrong", error);
    return NextResponse.json({
      status: false,
      message: "database call failed",
    });
  }
};
