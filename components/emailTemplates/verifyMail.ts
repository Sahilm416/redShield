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
      <title>Auth Verification Code</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f8f8f8;
          }
  
          .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
  
          .heading {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 20px;
              color: #000;
          }
  
          .subheading {
              font-size: 18px;
              margin-bottom: 20px;
              color: #666;
          }
  
          .code {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 20px;
              padding: 10px 20px;
              background-color: #f2f2f2;
              color: #333;
              border-radius: 5px;
              text-align: center;
          }
  
          .footer {
              font-size: 14px;
              color: #888;
              margin-top: 20px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="heading">${project} Verification Code</div>
          <div class="subheading">Enter the following verification code when prompted:</div>
          <div class="code">${code}</div>
          <div class="subheading">To protect your account, do not share this code.</div>
          <div class="footer">Didn't request this? This code was requested from 45.118.104.235, Mumbai, IN at 12 August 2023, 12:46 UTC. If you didn't make this request, you can safely ignore this email.</div>
      </div>
  </body>
  </html>
    `;
};
