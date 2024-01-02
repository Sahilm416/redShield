import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { checkToken } from "./app/actions/auth";


export default async function middleWare(request: NextRequest ,response:NextResponse) {
  const cookie = getCookie("_auth_token",{cookies}) as string ;
  const url = request.nextUrl.clone();
  const checkValidity = await checkToken({token:cookie});

  //if user is not authenticated then redirect to dashboard
  if(url.pathname === "/Auth"){
    if(checkValidity?.status) {
      url.pathname = "/Dashboard"
      return NextResponse.redirect(url);
    }else{
      return NextResponse.next();
    }
  }
  //protect dashboard from unauthorized users
  if(url.pathname === "/Dashboard"){
    if(checkValidity.status) {
      return NextResponse.next();
    }else{
      url.pathname = "/Auth"
      return NextResponse.redirect(url);
    }
  }
  
  //protect new route from unauthorized users
  if(url.pathname === "/New"){
    if(checkValidity.status) {
      return NextResponse.next();
    }else{
      url.pathname = "/Auth"
      return NextResponse.redirect(url);
    }
  }
  //project projec route from unauthorized users
  if(url.pathname.includes("/Project")){
    if(checkValidity.status) {
      return NextResponse.next();
    }else{
      url.pathname = "/Auth"
      return NextResponse.redirect(url);
    }
  }
  //protect edit path from unauthorized users
  if(url.pathname.includes("/Edit")){
    console.log("request to edit")
    if(checkValidity.status) {
      return NextResponse.next();
    }else{
      url.pathname = "/Auth"
      return NextResponse.redirect(url);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/Auth", "/Dashboard","/New" ,"/Project/:path*","/Edit/:path*"],
};