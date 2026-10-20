const https = require("https");
const nodemailer = require("nodemailer");

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return respond(405, "Method not allowed");
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch (error) {
    return respond(400, "Invalid body");
  }
  if (!body || typeof body !== "object") {
    return respond(400, "Invalid body");
  }

  // Honeypot: the hidden "hp_field" field is invisible to humans, bots tend to fill it in.
  if (body.hp_field) {
    console.log("Honeypot triggered, ignoring message.");
    return respond(200, "OK");
  }

  if (!isValid(body)) {
    return respond(400, "Invalid form data");
  }

  const ip = event.headers["x-nf-client-connection-ip"] || event.headers["client-ip"];
  if (!(await verifyCaptcha(body.captchaToken, ip))) {
    console.log("Captcha verification failed.");
    return respond(403, "Captcha verification failed");
  }

  try {
    await sendContactMail(getTransporter(), body);
    return respond(200, "OK");
  } catch (error) {
    console.log(error);
    return respond(500, "Failed to send mail");
  }
};

function isValid(data) {
  return typeof data.name === "string" && data.name.trim().length > 0 && data.name.length <= 100
    && typeof data.from === "string" && EMAIL_PATTERN.test(data.from)
    && typeof data.text === "string" && data.text.trim().length > 0 && data.text.length <= 10000;
}

async function verifyCaptcha(token, ip) {
  if (!process.env.TURNSTILE_SECRET) {
    console.error("TURNSTILE_SECRET environment variable is not set, rejecting message.");
    return false;
  }
  if (!token) {
    return false;
  }
  const params = new URLSearchParams({ secret: process.env.TURNSTILE_SECRET, response: token });
  if (ip) {
    params.append("remoteip", ip);
  }
  try {
    const result = await postForm(TURNSTILE_VERIFY_URL, params.toString());
    return result.success === true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

function postForm(url, body) {
  return new Promise((resolve, reject) => {
    const request = https.request(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(body),
      },
      timeout: 5000,
    }, response => {
      let data = "";
      response.on("data", chunk => data += chunk);
      response.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          reject(error);
        }
      });
    });
    request.on("timeout", () => request.destroy(new Error("Captcha verification timed out")));
    request.on("error", reject);
    request.end(body);
  });
}

function respond(statusCode, message) {
  return { statusCode, body: JSON.stringify({ message }) };
}

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
    subject: `${data.name.replace(/[\r\n]/g, " ")} via website.`,
    text: data.text,
  });
}
