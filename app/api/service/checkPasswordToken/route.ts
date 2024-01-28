const { db } = require("@/utils/database/db");
const { NextResponse } = require("next/server");

export const POST = async (request: Request) => {
  const key = request.headers.get("authorization") as string;
  const isValidKey = (await db.get("API_KEY:" + key)) as { project_id: string };

  if (!isValidKey) {
    return NextResponse.json({
      status: false,
      message: "Invalid authorization key",
    });
  }

  const { token } = (await request.json()) as {
    token: string;
  };
  try {
    const checktokenValidity = (await db.get(
      `${isValidKey.project_id}:${token}:forgotPass`
    )) as { email: string };

    if (!checktokenValidity) {
      return NextResponse.json({
        status: false,
        message: "invalid link to reset password",
      });
    }
    //token is valid
    return NextResponse.json({
      status: true,
      message: "valid link to reset password",
      data: checktokenValidity.email,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: false,
      message: "some error occurred",
    });
  }
};
