export const checkPassword = async (data: { password: string }) => {
  // Check for at least one special character
  if (!/(?=.*[!@#$%^&*])/.test(data.password)) {
    return { status: false, message: "must contain one special character" };
  }

  //check for special characters
  if (!/(?=.*[0-9])/.test(data.password)) {
    return {
      status: false,
      message: "Password must contain at least one number.",
    };
  }

  // Check for minimum length of 8 characters
  if (data.password.length < 8) {
    return {
      status: false,
      message: "Password must be at least 8 characters long.",
    };
  }
  if (data.password.length > 20) {
    return { status: false, message: "too long password" };
  }
  // If all conditions pass, consider the password valid
  return { status: true, message: "Valid password" };
};
