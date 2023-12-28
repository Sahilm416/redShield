import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { checkToken } from "./app/actions/auth";

export default async function middleWare(request: NextRequest) {
  const cookie = getCookie("_auth_token",{cookies}) as string ;

   const checkValidity = await checkToken({token:cookie});
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/Auth", "/Dashboard","/New"],
};