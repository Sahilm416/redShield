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
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Email Code</title>
    <style>
      body {
          height: 600px;
         background-color: #0a0a0a;
        display:flex;
        justify-content:start;
        align-items:center;
      }
      .content {
        max-width: 400px;
       
        padding: 25px;
        font-family: Sans-serif;
        
      }
      .content >* {
          margin: 50px 0px;
      }
      .project {
        font-size: 35px;
        color: #e5e5e5;
      }
      .header {
        color:#fafafa;
        font-size: 45px;
      }
  
      .sub{
        color:#d4d4d4;
      }
      .code {
        color: #e5e5e5;
       font-size: 45px;
      }
  
      .warning{
  color:#d4d4d4;
      }
      .footer {
        color:#d4d4d4;
        font-size: 12px;
        line-height: 20px;
      }
  
    </style>
  </head>
  <body>
    <div class="content">
      <h2 class="project">${project}</h2>
      <h1 class="header">Verification Code</h1>
      <p class="sub">Enter the following verification code when<br/> prompted:</p>
      <h1 class="code">${code}</h1>
      <p class="warning">To protect your account, do not share this code.</p>
      <p class="footer"><b>Didn't request this?</b><br/>This code was requested from <b>1.1.1.1</b>, <b>Mumbai, IN</b>, at <b>12 August 2023</b>, <b>12:46 UTC</b>. If you didn't make this request, you can safely ignore this email.</p></br>
  
    </div>
  </body>
  </html>
  
    `;
};
