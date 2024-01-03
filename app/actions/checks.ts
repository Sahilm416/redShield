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
  if (data.password.trim().length < 8) {
    return {
      status: false,
      message: "Password must be at least 8 characters long.",
    };
  }
  if (data.password.trim().length > 20) {
    return { status: false, message: "too long password" };
  }
  // If all conditions pass, consider the password valid
  return { status: true, message: "Valid password" };
};


//check for project data
export const validateInput = (name: string, description: string) => {
  if (name.trim().length < 3) {
    return { status: false, message: "Name should be at least 3 characters" };
  }

  if (name.trim().length > 35) {
    return { status: false, message: "Name should be at most 35 characters" };
  }

  if (description.trim().length < 5) {
    return {
      status: false,
      message: "Description should be at least 5 characters",
    };
  }

  if (description.trim().length > 100) {
    return {
      status: false,
      message: "Description should be at most 100 characters",
    };
  }

  return { status: true, message: "Validation successful" };
};