import { ValidateAuthToken } from "@/app/actions/auth";

const { NextResponse } = require("next/server");

export const POST = async (request: Request) => {
  const data: { token: string } = await request.json();
  try {
    const res = await ValidateAuthToken({ token: data.token });
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "some error occurred",
    };
  }
};
