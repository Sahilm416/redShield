import { NextRequest, NextResponse } from "next/server";
import { getSession } from "redshield";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const session = await getSession();
  //if already authenticated then redirect back to desired page
  if (url.pathname === "/Auth") {
    if (session.status) {
      //add path where logged in user should be redirected
      url.pathname = "/";
      return NextResponse.redirect(url);
    } else {
      return NextResponse.next();
    }
  }
  //this redirects the users to auth page if not authenticated
  if (session.status) {
    return NextResponse.next();
  } else {
    url.pathname = "/Auth";
    return NextResponse.redirect(url);
  }
}
export const config = {
  //add routes in matcher array to protect them from unauthenticated users
  matcher: [
    "/Dashboard",
    "/Auth",
    "/Project/:path*",
    "/New",
    "/Edit/:path*",
  ],
};
