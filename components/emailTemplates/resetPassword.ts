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
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password</title>
    <style>
      body {
          height: 600px;
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
        font-size: 30px;
  
      }
      .header {
  
        font-size: 38px;
      }
  
      .code {
  
       font-size: 40px;
      }
      .footer {
  
        font-size: 12px;
        line-height: 20px;
      }
      a {
       padding:10px;
       font-size:25px;
        text-decoration: none;
        background-color: #16a34a;
        color: white;
      }
    </style>
  </head>
  <body>
    <div class="content">
      <h2 class="project">${project}</h2>
      <h1 class="header">Password Reset</h1>
      <p class="sub">Click the following link to<br/> reset password:</p>
      <a href=${link}>Reset now</a>
      <p class="warning">To protect your account, do not share this link.</p>
      <p class="footer"><b>Didn't request this?</b><br/>This link was requested at <b>${new Date()}</b>. If you didn't make this request, you can safely ignore this email.</p></br>
    </div>
  </body>
  </html>
  
    
    `;
};
