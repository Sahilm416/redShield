import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { ValidateAuthToken } from "./app/actions/auth";
//for some reason importing this causes error so instead of import we use require
const { sign, verify } = require("jsonwebtoken");
export const revalidate = 0;
export default async function middleWare(request: NextRequest) {
  const cookie = getCookie("_auth_token", { cookies });
  const res = await ValidateAuthToken(cookie);
  
  const url = request.nextUrl.clone();
  

   if(url.pathname === "/Auth"){
    if(res.status){
        
        url.pathname = "/Dashboard";
        return NextResponse.redirect(url);
    }else{
        return NextResponse.next();
    }
   }
   if(url.pathname === "/Dashboard"){
    if(res.status){
        console.log("request granted");
        return NextResponse.next();
    }else{
        url.pathname = "/Auth";
        return NextResponse.redirect(url);
    }
   }
   return NextResponse.next();
}

export const config = {
  match: ["/Auth", "/Dashboard"],
};
