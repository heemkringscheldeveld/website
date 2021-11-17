const nodemailer = require("nodemailer");

exports.handler = function (event, context) {
  console.log(event.body);
  const body = JSON.parse(event.body);
  const payload = body.payload;
  const transporter = getTransporter();

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  sendContactMail(transporter, payload.data);
};

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.PORT,
    secure: true,
    auth: {
      user: process.env.USERNAME,
      pass: process.env.PASSWORD,
    },
  });
}

function sendContactMail(transporter, data) {
  return transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: process.env.MAIL_TO,
    bcc: process.env.MAIL_BCC,
    replyTo: data.from,
    sender: data.from,
    subject: `${data.name} via website.`,
    text: data.text,
  });
}