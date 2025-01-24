const nodemailer = require("nodemailer");
module.exports = async (email, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // Hoặc bạn có thể sử dụng host và port
    auth: {
      user: process.env.EMAIL_USER, // Thay đổi bằng email của bạn
      pass: process.env.EMAIL_PASS, // Thay đổi bằng mật khẩu của bạn
    },
  });

  // Ví dụ gửi email
  transporter.sendMail(
    {
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      html: html,
    },
    (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Email sent: " + info.response);
    }
  );
};
