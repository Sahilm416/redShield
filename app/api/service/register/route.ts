const { NextResponse } = require("next/server");
const { db } = require("@/utils/database/db");
const bcrypt = require("bcrypt");

export const POST = async (request: Request) => {
  const data = await request.json();
  const key = request.headers.get("authorization") as string;
  const res = await db.get(key);

  if (!res) {
    return NextResponse.json({ message: "Unauthorized key" }, { status: 401 });
  } else {
    const searchKey = res.project_id + ":=>" + data.username;
    const checkKeyExists = await db.get(searchKey);
    if (!checkKeyExists) {
      const hashed_password = await bcrypt.hash(data.password, 10);
      const user = await db.set(searchKey, {
        username: data.username,
        password: hashed_password, 
        email: data.email,
        profile_picture: data.profile_picture,
        creation_date: new Date(),
      });

      return NextResponse.json({ message: "user profile created" }, { status:200 });
    } else {
      return NextResponse.json(
        { message: "Username alredy exists" },
        { status: 409 }
      );
    }
  }

  return NextResponse.json({
    data: data,
  });
};
