"use server"
import {nanoid} from "nanoid";
import { db } from "@/utils/database/db";

export const sendResetPasswordLink = async ({email}:{email:string})=>{
    const generatedToken = nanoid(30);
    const res = await fetch("http://localhost:3000/api/service/verify", {
      next: { revalidate: 0 },
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": process.env.RED_KEY!,

      },
      body: JSON.stringify({
        token:"1234",
      }),
    });
    
   
}