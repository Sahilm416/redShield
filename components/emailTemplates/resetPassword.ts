export const passwordChangeTemplate = async ({ code, name, project }: { code: string, name: string, project: string }) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Change Request</title>
        </head>
        <body style="font-family: 'Arial', sans-serif; padding: 20px;">
  
          <div style="max-width: 600px; margin: 0 auto; background-color: #f4f4f4; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <h2 style="color: #007bff;">Hello ${name},</h2>
            <p>We received a request to change your password for ${project}. Please use the following verification code to confirm the password change:</p>
             <h2 style="color: gray">Verification Code:</h2>
            <h1 style="background-color: #f8f9fa; padding: 10px; border-radius: 5px;">${code}</h1>
            <p>This code will expire in a limited time, so please change your password promptly.</p>
            <p>If you did not request this password change, please contact us immediately.</p>
            <p>Thank you for using ${project}!</p>
          </div>
  
        </body>
      </html>
    `;
  };
  