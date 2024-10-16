import nodemailer from "nodemailer";

const sentForgetPassLink = async (email : string, resetLink : string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "nahidulislam6181461814@gmail.com",
      pass: "xtyf tyzn sljo efie",
    },
  }); 

  await transporter.sendMail({
    from: "nahidulislam6181461814@gmail.com", // sender address
    to: email, // list of receivers
    subject: "RecipieNest Account password Resetlink ✔", // Subject line 
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f7;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #333;
      font-size: 24px;
      text-align: center;
    }
    p {
      font-size: 16px;
      color: #555;
      line-height: 1.6;
    }
    .button {
      display: inline-block;
      padding: 12px 24px;
      margin: 20px 0;
      background-color: #007bff;
      color: #fff;
      text-decoration: none;
      border-radius: 5px;
      font-size: 16px;
      text-align: center;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      color: #888;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Reset Your Password</h1>
    <p>Hello,</p>
    <p>You recently requested to reset your password for your account. Please click the button below to reset your password. This reset link is valid for the next <strong>5 minutes</strong>.</p>
    <p>If you did not request a password reset, please ignore this email or contact support if you have any questions.</p>
    <a href="${resetLink}" class="button">Reset Password</a>
    <p>Thank you,<br>The RecipieNest Team</p>
  </div>

  <div class="footer">
    <p>If the button doesn't work, copy and paste the following link into your browser:</p>
    <p>{{resetLink}}</p>
  </div>
</body>
</html>
`, // html body
  });
};

export default sentForgetPassLink;
