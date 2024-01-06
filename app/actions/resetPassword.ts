"use server"
import {nanoid} from "nanoid";
import { db } from "@/utils/database/db";

export const sendResetPasswordLink = async ({email}:{email:string})=>{
    const generatedToken = nanoid(30);
    console.log(generatedToken);
   
}