const { NextResponse } = require("next/server");
const { db } = require("@/utils/database/db");
const { checkAllValues } = require("../../../actions/checkAll");

const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

interface reqBody {
  email: string;
  password: string;
  profile_picture?: string;
}

export const POST = async (request: Request) => {
  const data: reqBody = await request.json();
  const key = request.headers.get("authorization") as string;
  const res = await db.get("API_KEY:" + key);

  if (!res) {
    return NextResponse.json({ message: "Unauthorized key" }, { status: 401 });
  } else {
    //check the passed data for registration
   // const isDataValid = await checkAllValues(data);

    //condition for the validated data passed

  

    const searchKey = res.project_id + ":" + data.email;
    const checkKeyExists = await db.get(searchKey);
    //if user with passed username does not exist
    if (!checkKeyExists) {
      const hashed_password = await bcrypt.hash(data.password, 10);
      //create new user
      const user = await db.set(searchKey, {
        uid: uuidv4(),
        password: hashed_password,
        email: data.email,
        profile_picture: data.profile_picture || "https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Transparent-Free-PNG-Clip-Art.png",
        creation_date: new Date(),
      });

      //for quick search key

      //initialize emoty project list
      await db.set(res.project_id + ":" + data.email + ":projects", []);

      return NextResponse.json({
        status: true,
        message: "profile created successfully",
      });
    } else {
      //username already exists
      return NextResponse.json({
        status: false,
        message: "User profile already exists",
      });
    }
  }
};
