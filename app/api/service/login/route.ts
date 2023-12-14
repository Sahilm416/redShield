const { NextResponse } = require("next/server");
const { db } = require("@/utils/database/db");
const bcrypt = require("bcrypt");



interface reqBody {
   username: string;
   password: string;
}
export const POST = async (request: Request) => {

  const data: reqBody = await request.json();
  const key = request.headers.get("authorization") as string;
  const res = await db.get(key);

  if (!res) {
    return NextResponse.json({ message: "Unauthorized key" }, { status: 401 });
  } else {
    try {
      const searchKey = res.project_id + ":=>" + data.username;
      const user = await db.get(searchKey);
      if (user) {
        const isAuth = await bcrypt.compare(data.password, user.password);
        if (isAuth) {
          return NextResponse.json(
            { message: "Login Success"},
            { status: 200 }
          );
        }
      }
    } catch (error) {
      console.log(error)
      return NextResponse.json(
        { message: "something went wrong" },
        { status: 404 }
      );
    }
  }

  return NextResponse.json({ message: "Invalid Credentials" }, { status: 401 });
};
