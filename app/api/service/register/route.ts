const { NextResponse } = require("next/server");
const { db } = require("@/utils/database/db");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

interface reqBody {
  email: string;
  password: string;
  profile_picture?: string;
}

export const POST = async (request: Request) => {
  try {
    const data: reqBody = await request.json();
    const key = request.headers.get("authorization") as string;
    const res = await db.get("API_KEY:" + key);

    if (!res) {
      return NextResponse.json({ message: "Unauthorized key" }, { status: 401 });
    }

    const searchKey = res.project_id + ":" + data.email+":user";
    const existingUser = await db.get(searchKey);
   
  
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const newUser = {
        uid: uuidv4(),
        password: hashedPassword,
        email: data.email,
        profile_picture:
          data.profile_picture ||
          "https://vercel.com/api/www/avatar/e4HZrj63hu6L3DgyuIE06nf7?&s=64",
        creation_date: new Date(),
      };

      // Set the new user data
        await db.set(searchKey, newUser);

        //Initialize empty project list
      await db.set(res.project_id + ":" + data.email + ":projects", []);

      return NextResponse.json({
        status: true,
        message: "Profile created successfully",
      });
    } else {
      // Username already exists
      return NextResponse.json({
        status: false,
        message: "User profile already exists",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
};
