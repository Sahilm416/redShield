export const verifyMail = async ({ code, name, project }: { code: string,name: string, project: string }) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
      </head>
      <body style="font-family: 'Arial', sans-serif; padding: 20px;">

        <div style="max-width: 600px; margin: 0 auto; background-color: #f4f4f4; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <h2 style="color: #007bff;">Hello ${name},</h2>
          <p>Thank you for choosing ${project}. Please use the following verification code to confirm your email address:</p>
           <h2 style="color:gray">code:</h2>
          <h1 style="background-color: #f8f9fa; padding: 10px; border-radius: 5px;">${code}</h1>
          <p>This code will expire in a limited time, so please verify your email promptly.</p>
          <p>Thank you for using ${project}!</p>
        </div>

      </body>
    </html>
    `;
  };
  