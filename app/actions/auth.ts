"use server";
import { setCookie,getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
const { sign, verify } = require("jsonwebtoken");

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
     //const verifyToken = verify(token.key, process.env.JWT_SECRET_KEY!);
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



 export const getJWT = ()=>{
     const key = process.env.JWT_SECRET_KEY!;
     return key;
 }


