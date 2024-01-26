const { db } = require("@/utils/database/db");
const { NextResponse } = require("next/server");

export const POST = async (request: Request) => {
  const key = request.headers.get("authorization") as string;
  const isValidKey = (await db.get("API_KEY:" + key)) as { project_id: string };

  if (!isValidKey) {
    return NextResponse.json({status:false , message: "Invalid authorization key"});
  }

  const { email } = (await request.json()) as {
    email: string;
  };
  try {
    const checkAlreadyExists = await db.get(
      `${isValidKey.project_id}:${email}:user`
    );
    if (checkAlreadyExists) {
      return NextResponse.json({
        status: false,
        message: " user already exists",
      });
    }

    return NextResponse.json({
      status: true,
      message: "new user",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: false,
      message: "some error occurred",
    });
  }
};
