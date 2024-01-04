import { ValidateAuthToken } from "@/app/actions/auth";


const { NextResponse } = require("next/server");
const { db } = require("@/utils/database/db");

export const POST = async (request: Request)=>{

     const ip = request.headers.get('x-forwarded-for');
     const userAgent = request.headers.get('user-agent');
     const platform = request.headers.get('platform');
     console.log("ip is ",ip)
     const data : {token: string } = await request.json();
     try {
          const res = await ValidateAuthToken({token: data.token});
          return NextResponse.json(res);
     } catch (error) {
          console.log(error)
          return {
               status: false,
               message: "some error occurred"
          }
     }
     
}