"use server";
import { setCookie,getCookie, deleteCookie } from 'cookies-next';
import { cookies } from 'next/headers';
const { sign, verify } = require("jsonwebtoken");
import { db } from '@/utils/database/db';
export const LoginUser = async (data: {
  username: string;
  password: string;
}) => {
  try {
    const res = await fetch("https://redshield.vercel.app/api/service/login", {
      next: { revalidate: 0 },
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.RED_KEY!,
      },
      body: JSON.stringify({
        username: data.username.toLowerCase(),
        password: data.password,
      }),
    });
    const response = await res.json();
    if (response.message === "Login Success") {
      return {
        success: true,
        message: response.message,
      };
    }
    return {
      success: false,
      message: response.message,
    };
  } catch (error) {
    console.log(error);
  }
};

export const registerUser = async (data: {
  username: string;
  password: string;
  email: string;
  profile_picture?: string;
}) => {
  try {
    const res = await fetch(
      "https://redshield.vercel.app/api/service/register",
      {
        next: { revalidate: 0 },
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.RED_KEY!,
        },
        body: JSON.stringify({
          username: data.username.toLowerCase(),
          password: data.password,
          email: data.email.toLowerCase(),
          profile_picture: data.profile_picture,
        }),
      }
    );
    const response = await res.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const LoginSuccess = async (data: {username: string , password: string }) => {

  try {
    const token = sign(
      { username: data.username , password: data.password },
      process.env.JWT_SECRET_KEY!
    );

    setCookie('_auth_token',token , {cookies});
    return {
      status: true,
      message: "cookies set successfully",
    };
  } catch (error) {
    console.log("Error setting token: " + error);
    return {
      status: false,
      message: "token not set during login " + error,
    }
  }
};


export const ValidateAuthToken = async (token: string | undefined)=>{
     
    if(!token){
     return {
       status: false,
       message: "session token not found"
     }
    }
 
    try {
     const verifyToken = verify(token, process.env.JWT_SECRET_KEY!);
     return {
       status: true,
       message: "token is valid"
     }
 
    } catch (error) {
     console.log("error verifying token: " + error);
 
     return {
       status: false,
       message: "token signature invalid"
     }
    }
 }

export const LogOut = async ()=>{
    const res = deleteCookie("_auth_token" , { cookies })
    return {
      status: true,
      message: "logged out successfully"
    }
}

//return the details of logged in user

export const LoggedUser = async ()=>{
  const token = getCookie("_auth_token" ,{cookies})
  if(!token){
   return {
     status: false,
     message: "session token not found",
     data: null
   }
  }

  try {
   const verifyToken = verify(token, process.env.JWT_SECRET_KEY!);
   const key = await db.get("API_KEY:" + process.env.RED_KEY!) as { project_id: string , project_name: string};
   const user = await db.get(key.project_id+":=>" + verifyToken.username) as {username: string , email: string , isVerified: boolean};

   return {
     status: true,
     message: "token is valid",
     data : {
      username: user.username,
      email: user.email,
      isVerified : user.isVerified
     }
   }

  } catch (error) {
   console.log("error verifying token: " + error);

   return {
     status: false,
     message: "token signature invalid",
     data: null
   }
  }
}
