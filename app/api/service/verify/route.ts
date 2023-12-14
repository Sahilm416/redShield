const { NextResponse } = require("next/server");
const { db } = require("@/utils/database/db");

export const POST = async ()=>{
     return NextResponse.json({
        message: "hello from api"
     }, {status: 200});
}