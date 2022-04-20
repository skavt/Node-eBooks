const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_HOST_USER,
    pass: process.env.EMAIL_HOST_PASSWORD,
  },
});

const sendMail = (to, subject, textMsg, htmlMsg) => {
  return transporter.sendMail({
    from: process.env.EMAIL_ROBOT_EMAIL,
    to: to,
    subject: subject,
    text: textMsg,
    html: htmlMsg,
  });
}

module.exports = {
  sendMail,
}
