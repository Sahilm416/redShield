import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { valToken } from "./app/actions/validateToken";
export default async function middleWare(request: NextRequest) {
  const cookie = getCookie("_auth_token", { cookies }) as string;

 
  try {
    const response = await valToken(cookie);
 
  if (request.url.includes("/Auth")) {
    if (response.status) {
      const redUrl = request.nextUrl.clone();
      redUrl.pathname = "/Dashboard"
      return NextResponse.redirect(redUrl);
    } else {
      return NextResponse.next();
    }
  }
  if (request.url.includes("/Dashboard")) {
    if (response.status) {
      return NextResponse.next();
    } else {
        const redUrl = request.nextUrl.clone();
      redUrl.pathname = "/Auth"
      return NextResponse.redirect(redUrl);
    }
  }
  } catch (error) {
    console.log(error);
    return NextResponse.next();
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/Auth", "/Dashboard"],
};
