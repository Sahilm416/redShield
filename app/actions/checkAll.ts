const {checkPassword} = require("./RegCheck");

export const checkAllValues = async (data: {
    username: string;
    password: string;
    email: string;
    profile_picture?: string;
  }) => {
     
     const usernameRegex = /^(?=.*[a-z])[a-z0-9]{3,19}$/;
  
    if (!usernameRegex.test(data.username)) {
      return { status: false, message: "Username is not valid." };
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!emailRegex.test(data.email) || data.email.length >= 40) {
      return { status: false, message: "invalid email" };
    }
  
    const passCheck = await checkPassword({password: data.password});
    if(!passCheck.status){
     return passCheck;
    }
  
    return { status: true , message:"valid data"}
  };
  