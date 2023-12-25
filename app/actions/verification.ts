"use server";
//action to send email verification using resend
export const sendVerification = async ({
  username,
  email,
}: {
  username: string;
  email: string;
}) => {
  try {
    const res = await fetch(
      "https://redshield.vercel.app/api/service/sendVerification",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.RED_KEY!,
        },
        body: JSON.stringify({
          username: username,
          email: email,
          url_endpoint: "https://redshield.vercel.app/verify",
        }),
      }
    );
    const response = await res.json();
    if (response)
      return {
        status: true,
        message: "verification sent successfully",
      };
  } catch (error) {
    console.log("error sending verification", error);
    return null;
  }
};
