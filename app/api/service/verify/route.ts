import { ValidateAuthToken } from "@/app/actions/auth";


const { NextResponse } = require("next/server");
const { db } = require("@/utils/database/db");

export const POST = async (request: Request)=>{
     const data : {token: string | undefined} = await request.json();
     const res = await ValidateAuthToken(data.token);
     return NextResponse.json(res);
}