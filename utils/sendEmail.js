const nodemailer = require("nodemailer");
const { forgotPassword, verifyEmail } = require("./emailMessage");
const Mail = require("../models/mail.model");
const { generateUUID, generateOTPCode } = require("./generator");

// * options= { userId , to, subject, code }
const sendEmail = async (options) => {
  const token = generateUUID();
  const resetLink = `http://localhost:3000/resetpassword/?token=${token}`;
  // const resetLink = `https://sanpedro.uat.xyphersolutionsinc.com/resetpassword/?token=${token}`
  let otpCode;

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    secure: true,
    requireTLS: true,
    port: 465,
  });

  Date.prototype.addMinutes = function (min) {
    this.setTime(this.getTime() + min * 60 * 1000);
    return this;
  };

  let htmlMsg;
  let expireTime; // FP - 30min , CE - 1hr
  switch (options.code) {
    case "FP":
      htmlMsg = forgotPassword({ resetLink });
      expireTime = new Date().addMinutes(30);
      break;
    case "CE":
      otpCode = generateOTPCode();
      htmlMsg = verifyEmail(
        options.firstName,
        options.oldEmail,
        options.email,
        otpCode,
      );
      expireTime = new Date().addMinutes(60);
      break;
    default:
      htmlMsg = forgotPassword({ resetLink });
      expireTime = new Date().addMinutes(30);
      break;
  }

  const mailOptions = {
    from: `${process.env.APP_NAME} App Team <${process.env.EMAIL_USERNAME}>`,
    to: options.to,
    subject: options.subject,
    html: htmlMsg,
  };

  return transporter
    .sendMail(mailOptions)
    .then((info) => {
      Date.prototype.addMinutes = function (min) {
        this.setTime(this.getTime() + min * 60 * 1000);
        return this;
      };
      // * addmin min per num
      const receipt = {
        token,
        userId: options.userId,
        to: options.to,
        subject: options.subject,
        code: options.code,
        expires: expireTime,
        otpCode,
      };
      Mail.create(receipt);
      return { success: true, data: info };
    })
    .catch((err) => {
      return { success: false, data: err };
    });
};

const verifyMail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      secure: true,
      requireTLS: true,
      port: 465,
    });

    const htmlMsg = verifyEmail(
      options.firstName,
      options.oldEmail,
      options.email,
      options.url,
    );

    await transporter.sendMail({
      from: process.env.EMAIL_USERNAME,
      to: options.email,
      subject: options.subject,
      html: htmlMsg,
    });
    console.log("email sent successfully");
  } catch (error) {
    console.log("email not sent!");
    console.log(error);
    return error;
  }
};

module.exports = { sendEmail, verifyMail };
