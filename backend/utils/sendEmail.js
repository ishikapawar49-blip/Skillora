import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, html) => {
  try {
    console.log("📧 EMAIL START");
    console.log("ENV USER:", process.env.EMAIL_USER);
    console.log("ENV PASS:", process.env.EMAIL_PASS);

    // ✅ transporter INSIDE function
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"Skillora" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("✅ EMAIL SENT:", info.response);
  } catch (err) {
    console.log("❌ EMAIL ERROR FULL:", err);
  }
};