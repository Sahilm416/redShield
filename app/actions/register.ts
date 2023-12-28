"use server";
import { db } from "@/utils/database/db";


//send th code to email address
export const sendCode = async ({ email }: { email: string }) => {
  const code = Math.floor(100000 + Math.random() * 900000);


  const { project_id } = (await db.get("API_KEY:" + process.env.RED_KEY!)) as {
    project_id: string;
  };
  const checkAlreadyExists = await db.get(project_id+":"+email);
  if(checkAlreadyExists){
    return { status: false , message:"Email already exists"};
  }
  try {
    await db.set(project_id + ":" + email + ":code", code,{ex:300});
    const res = await fetch("http://localhost:3000/api/service/sendCode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.RED_KEY!,
      },
      body: JSON.stringify({
        email: email,
        code: code,
      }),
    });
  

    return {
      status: true,
      message: "email sent successfully",
    };
  } catch (error) {
    console.log("error", error);
    return {
      status: false,
      message: "error sending email",
    };
  }
};

//verify the sent code
export const verifyCode = async ({
  code,
  email,
}: {
  code: string;
  email: string;
}) => {
  const { project_id } = (await db.get("API_KEY:" + process.env.RED_KEY!)) as {
    project_id: string;
  };
  const actualCode = await db.get(project_id + ":" + email + ":code" );

  if (actualCode == code) {
    return {
      status: true,
      message: "verified the code successfully",
    };
  } else {
    return {
      status: false,
      message: "invalid code",
    };
  }
};

//register the new user to database
export const registerUser = async ({email,password,profile_picture}:{email: string , password: string , profile_picture?: string})=>{
    try {
        const res = await fetch("http://localhost:3000/api/service/register",{
            next:{revalidate:0},
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': process.env.RED_KEY!
            },
            body: JSON.stringify({
                email: email,
                password: password,
                profile_picture: profile_picture
            })
        });

        const response = await res.json();
        return response;
    } catch (error) {
        console.log("error registering", error);
        return {
            status: false,
            message:"something went wrong",
        }
    }
}