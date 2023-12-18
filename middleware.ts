import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export default async function middleWare(request: NextRequest) {
  const cookie = getCookie("_auth_token", { cookies });

 
  const res = await fetch("https://redshield.vercel.app/api/service/verify", {
    cache: 'no-store' ,
    next: {revalidate: 0},
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: cookie,
    }),
  });
  const response = await res.json();
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
  return NextResponse.next();
}

export const config = {
  matcher: ["/Auth", "/Dashboard"],
};
