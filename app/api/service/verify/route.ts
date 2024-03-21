const { verify } = require("jsonwebtoken");
const { db } = require("@/utils/database/db");
const { NextResponse } = require("next/server");

export const POST = async (request: Request) => {
  try {
    const { token , jwt_secret } = await request.json();

    if (!token) {
      return NextResponse.json({
        status: false,
        message: "token not found",
      });
    }
    const verifyToken = verify(token, jwt_secret);
    //get user from database
    const user = await db.get(
      `${verifyToken.project_id}:${verifyToken.email}:user`
    );
    //check password version
    if (user.pwd_version > verifyToken.pwd_version) {
      return NextResponse.json({
        status: false,
        message: "invalid token",
      });
    }

    return NextResponse.json({
      status: true,
      message: "token is valid",
      data: verifyToken,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: false,
      message: "error verifying token",
      error: error,
    });
  }
};
