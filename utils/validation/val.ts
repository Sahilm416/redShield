interface Param {
  username: string;
  password: string;
  email: string;
  profile_picture: string;
}

export const checkValue = (data: Param) => {
  const errors: string[] = [];

  if (!data.username || !data.password || !data.email || !data.profile_picture) {
    errors.push("All fields are required");
  } else {
    const usernameRegex = /^[a-z0-9]+$/;
    if (!usernameRegex.test(data.username)) {
      errors.push("Username should only contain smallcase letters and numbers");
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(data.password)) {
      errors.push("Password should be at least 8 characters long and contain both letters and numbers");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.push("Enter a valid email address");
    }
  }

  return errors.length === 0
    ? { success: true }
    : { success: false, messages: errors };
};
