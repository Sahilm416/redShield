export const valToken = async (cookie: string) => {
  try {
    const res = await fetch("https://redshield.vercel.app/api/service/verify", {
      cache: "no-store",
      next: { revalidate: 0 },
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: cookie,
      }),
    });
    
    const response = await res.json();
    return response
  } catch (error) {
    console.log(error);
    return {
        status: false,
        message: "some error occurred"
    }
  }
  
};
