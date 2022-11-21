const nodemailer = require("nodemailer");

const sendEmail = async (mailObj) => {
  const { from, recipients, subject, html } = mailObj;

  try {
    let transporter = nodemailer.createTransport({
      host: "smtp-relay.sendinblue.com",
      port: 587,
      auth: {
        user: "yasharth.cse@gmail.com",
        pass: process.env.SIB_PASSWORD,
      },
    });
    let mailStatus = await transporter.sendMail({
      from: from,
      to: recipients,
      subject: subject,
      html: html,
    });
    return `Message sent: ${mailStatus.messageId}`;
  } catch (error) {
    console.error(error);
    throw new Error(
      `Something went wrong in the sendmail method. Error: ${error.message}`
    );
  }
};

module.exports = sendEmail;
