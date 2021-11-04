const nodemailer = require("nodemailer");

exports.handler = function (event, context) {
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

  console.log(`Sending ${payload.form_name} mail...`);

  if (payload.form_name == "contact") {
    sendContactMail(transporter, payload.data);
  }
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
    replyTo: data.email,
    sender: data.email,
    subject: `${data.subject} via website.`,
    text: data.message,
  });
}