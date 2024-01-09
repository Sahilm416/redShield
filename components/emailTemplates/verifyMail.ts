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
    .content {
      max-width: 400px;
      height: 700px;
      padding: 20px;
      font-family: Sans-serif;
      background-color: #f3f4f6;
      display:flex;
      flex-direction: column;
      justify-content:center;
      align-items:start;
      
    }
    .project {
      color: #475569;
    }

    .sub{
      color:#475569;
    }

    .warning{
color:#475569;
    }
    .footer {
      color:#64748b;
      font-size: 12px;
      line-height: 20px;
    }
    .footer > b {
        color: #1e293b;
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
    <p class="footer"><b>Didn't request this?</b><br/>This code was requested from <b>1.1.1.1</b>, <b>Mumbai, IN</b>, at <b>12 August 2023</b>, <b>12:46 UTC</b>. If you didn't make this request, you can safely ignore this email.</p>
  </div>
</body>
</html>
    `;
};
