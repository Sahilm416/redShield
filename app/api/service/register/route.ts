const { NextResponse } = require("next/server");
const { db } = require("@/utils/database/db");
const { checkValue } = require("@/utils/validation/val");

const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');

interface reqBody{
  username: string;
  password: string;
  email: string;
  profile_picture?: string;
}

export const POST = async (request: Request) => {
  const data : reqBody = await request.json();
  const key = request.headers.get("authorization") as string;
  const res = await db.get("API_KEY:"+key);

  if (!res) {
    return NextResponse.json({ message: "Unauthorized key" }, { status: 401 });
  } else {
    //check the passed data for registration
    const isDataValid = checkValue(data);
    
    //condition for the validated data passed
    if(!isDataValid.success) {
      return NextResponse.json(isDataValid , { status: 400 });
    }
  
    const searchKey = res.project_id + ":=>" + data.username;
    const checkKeyExists = await db.get(searchKey);
    //if user with passed username does not exist
    if (!checkKeyExists) {
      const hashed_password = await bcrypt.hash(data.password, 10);
      //create new user
      const user = await db.set(searchKey, {
        username: data.username,
        uid: uuidv4(),
        password: hashed_password, 
        email: data.email,
        isVerified: false,
        profile_picture: data.profile_picture,
        creation_date: new Date(),
      });
      const quickKey = await db.set(`${res.project_id +"->"+data.email}`,data.username)
      return NextResponse.json({ message: "user profile created" }, { status:200 });
    } else {
      //username already exists
      return NextResponse.json(
        { message: "Username alredy exists" },
        { status: 409 }
      );
    }
  }
};
