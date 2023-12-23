const { NextResponse } = require("next/server");
const { db } = require("@/utils/database/db");

interface reqBody {
  username: string;
}
export const POST = async (request: Request) => {
  const data: reqBody = await request.json();
  const key = request.headers.get("authorization") as string;
  const res = await db.get("API_KEY:" + key);

  if (!res) {
    return NextResponse.json({ message: "Unauthorized key" }, { status: 401 });
  } else {
    const user = await db.get(res.project_id + ":=>" + data.username);
    return NextResponse.json(user);
  }
};
