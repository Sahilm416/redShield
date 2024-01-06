export const verifyMail = async ({
  code,
  email,
  project,
}: {
  code: string;
  email: string;
  project: string;
}) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
  </head>
  <body style="font-family: 'Arial', sans-serif; background-color: #fff;">
  
    <div style=" margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 5px; background-color: white;">
      <h2 style="color: #333;">Email Verification for ${project}</h2>
      <p>Hello <b>${email}</b>,</p>
      <p>Thank you for signing up with <b> ${project}</b> . To complete your registration, please use the following verification code:</p>
      <p style="font-size: 24px; color: #4caf50; padding: 10px; background-color: #f5f5f5; border-radius: 5px; text-align: center; margin: 20px 0;">${code}</p>
      <p>Please enter this code in the verification page</p>
  
      <p>This code will expire in 3 minutes.</p>
      <p>If you did not sign up for <b> ${project}</b> , please ignore this email.</p>
      <p>Thank you,</p>
      <p>${project}</p>
    </div>
  
  </body>
  </html>
  
    
    `;
};
