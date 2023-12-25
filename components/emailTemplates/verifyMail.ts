export const emailTemplate = async ({ name, verificationLink,project }: { name: string; verificationLink: string ,project: string }) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>
      <style>
          body {
              font-family: 'Arial', sans-serif;
              background-color: #f5f5f5;
              color: #333;
              margin: 0;
              padding: 0;
          }

          .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #fff;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          header {
              background-color: #3498db;
              color: white;
              text-align: center;
              padding: 10px;
              border-radius: 8px 8px 0 0;
          }

          h1 {
              color: white;
              margin: 0;
          }

          p {
              margin-bottom: 20px;
              color: #555;
          }

          a {
              text-decoration: none;
              color: #3498db;
          }

          .name {
              font-weight: bold;
              border-bottom: 1px solid #3498db;
              padding-bottom: 2px;
              color: #3498db;
          }

          button {
              background-color: #3498db;
              color: white;
              border: none;
              padding: 10px 20px;
              text-align: center;
              text-decoration: none;
              display: inline-block;
              font-size: 16px;
              margin-top: 20px;
              cursor: pointer;
              border-radius: 4px;
              transition: background-color 0.3s;
          }

          button:hover {
              background-color: #2980b9;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <header>
              <h1>Email Verification</h1>
          </header>
          <p>Hello <span class="name">${name}</span>,</p>
          <p>Welcome to <span class="name">${project}</span> ! To complete your registration, please click the following link:</p>
          <a href="${verificationLink}" target="_blank">
              <button>Verify Email</button>
          </a>
          <p>If you didn't request this, please ignore this email.</p>
      </div>
  </body>
  </html>
  `;
};
