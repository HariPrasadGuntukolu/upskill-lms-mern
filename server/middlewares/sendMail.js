import { createTransport } from "nodemailer";

const frontendUrl = (
  process.env.frontendurl || "https://upskill-academy-lovat.vercel.app"
).replace(/\/$/, "");

const sendMail = async (email, subject, data) => {
  const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.Gmail,
      pass: process.env.password,
    },
  });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>OTP Verification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #121212;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      color: #e0e0e0;
    }
    .container {
      background-color: #1e1e2f;
      padding: 24px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.05);
      text-align: center;
    }
    h1 {
      color: #ff5252;
    }
    p {
      color: #bbbbbb;
    }
    .otp {
      font-size: 36px;
      color: #7b68ee;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>OTP Verification</h1>
    <p>Hello ${data.name}, your One-Time Password for account verification is:</p>
    <p class="otp">${data.otp}</p>
  </div>
</body>
</html>
`;

  await transport.sendMail({
    from: process.env.Gmail,
    to: email,
    subject,
    html,
  });
};

export default sendMail;

export const sendForgotMail = async (subject, data) => {
  const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.Gmail,
      pass: process.env.password,
    },
  });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Reset Your Password</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #1e1e1e;
      margin: 0;
      padding: 0;
      color: #e0e0e0;
    }
    .container {
      background-color: #1e1e2f;
      padding: 30px;
      margin: 30px auto;
      border-radius: 10px;
      box-shadow: 0 0 15px rgba(255, 255, 255, 0.05);
      max-width: 500px;
    }
    h1 {
      color: white;
    }
    p {
      color: #cccccc;
      line-height: 1.6;
    }
    .button {
      display: inline-block;
      padding: 12px 24px;
      margin: 24px 0;
      background-color: white;
      color: black;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
    }
    .footer {
      margin-top: 30px;
      color: #888888;
      text-align: center;
    }
    .footer a {
      color: #bb86fc;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Reset Your Password</h1>
    <p>Hello,</p>
    <p>You have requested to reset your password. Click the button below to continue.</p>
    <a href="${frontendUrl}/reset-password/${data.token}" class="button">Reset Password</a>
    <p>If you didn’t request this, just ignore this email.</p>
    <div class="footer">
      <p>Thank you,<br>UpSkill Team</p>
      <p><a href="${frontendUrl}">${frontendUrl}</a></p>
    </div>
  </div>
</body>
</html>
`;

  await transport.sendMail({
    from: process.env.Gmail,
    to: data.email,
    subject,
    html,
  });
};
