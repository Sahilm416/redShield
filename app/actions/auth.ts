"use server";

export const LoginUser = async (data: {
  username: string;
  password: string;
}) => {
  try {
    const res = await fetch("https://redshield.vercel.app/api/service/login", {
     next:{revalidate:0},
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.RED_KEY!,
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
    });
    const response = await res.json();
    if(response.message === "Login Success"){
        return {
            success: true ,
            message: response.message
        };
    }
    return {
        success: false ,
        message: response.message
    };
  } catch (error) {
    console.log(error);
  }
};
