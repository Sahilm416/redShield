const { db } = require("@/utils/database/db");
const { NextResponse } = require("next/server");

export const POST = async (request: Request) => {
  const key = request.headers.get("authorization") as string;
  const isValidKey = (await db.get("API_KEY:" + key)) as { project_id: string };

  if (!isValidKey) {
    console.log("unauthorized key");
    return NextResponse.json({ message: "Unauthorized key" }, { status: 401 });
  }
  const { email, code } = (await request.json()) as {
    email: string;
    code: string;
  };
  const actualCode = await db.get(
    isValidKey.project_id + ":" + email + ":code"
  );
  if (actualCode == code) {
    return NextResponse.json({
      status: true,
      message: "verified the code successfully",
    });
  } else {
    return NextResponse.json({
      status: false,
      message: "invalid code",
    });
  }
};
