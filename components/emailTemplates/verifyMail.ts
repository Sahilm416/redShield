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
    <title>Verification Code</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }

        .container {
            width: 100%;
            padding: 20px;
            box-sizing: border-box;
        }

        .title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
        }

        .content {
            font-size: 16px;
            margin-bottom: 10px;
        }

        .verification-code {
            font-size: 20px;
            font-weight: bold;
            color: #4A90E2;
            margin-bottom: 10px;
        }

        .note {
            font-size: 14px;
            color: #888;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="title">${project} Verification Code</div>
        <div class="content">
            Enter the following verification code when prompted:
        </div>
        <div class="verification-code">${code}</div>
        <div class="content">
            To protect your account, do not share this code.
        </div>
        <div class="content">
            Didn't request this? This code was requested from 45.118.104.235, Mumbai, IN at 12 August 2023, 12:46 UTC. If you didn't make this request, you can safely ignore this email.
        </div>
    </div>
</body>
</html>  
    `;
};
