export const passwordChangeTemplate = async ({
  link,
  email,
  project,
}: {
  link: string;
  email: string;
  project: string;
}) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset</title>
    </head>
    <body style="font-family: 'Arial', sans-serif; background-color: #fff;">
    
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 5px; background-color: white;">
        <h2 style="color: #333;">Password Reset for ${project}</h2>
        <p>Hello <b>${email}</b> ,</p>
        <p>We received a request to reset your password. If you did not make this request, please ignore this email.</p>
        <p>To reset your password, click on the link below:</p>
        <p><a href=${link} style="display: inline-block; padding: 10px 20px; background-color: #4caf50; color: #fff; text-decoration: none; border-radius: 0;">Reset Password</a></p>
        <p>this link is valid for only 3 minutes</p>
        <p>Thank you,</p>
        <p>${project}</p>
      </div>
    
    </body>
    </html>
    
    `;
};
