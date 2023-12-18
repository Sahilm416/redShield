import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { valToken } from "./app/actions/validateToken";
export default async function middleWare(request: NextRequest) {
  const cookie = getCookie("_auth_token", { cookies }) as string;

 
  const response = await valToken(cookie);
  console.log("api response: ", response);
  if (request.url.includes("/Auth")) {
    if (response.status) {
      return NextResponse.redirect("https://redshield.vercel.app/Dashboard");
    } else {
      return NextResponse.next();
    }
  }
  if (request.url.includes("/Dashboard")) {
    if (response.status) {
      return NextResponse.next();
    } else {
        
      return NextResponse.redirect("https://redshield.vercel.app/Auth");
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/Auth", "/Dashboard"],
};
