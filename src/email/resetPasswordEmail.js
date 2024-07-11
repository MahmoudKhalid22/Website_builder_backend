import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

async function sendResetPassworEmail(email, token, username) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const resetPasswordLink = `https://zagwebbuilder-git-main-m2001saids-projects.vercel.app/en/reset-password?token=${token}`;

  const msg = {
    to: email,
    from: "zagwebeasybuilder@gmail.com",
    subject: "( ZWEB ) Zagazig Website Easy Builder Password Reset Request",
    html: `
    <p style="font-size:1.75rem; font-weight:600;text-align:center;">Password Reset Request</p>
    <p style="font-size:1.25rem; font-weight:500;text-align:center;">Hello ${username},</p>    
    <p style="font-size:1rem;text-align:center;">We received a request to reset the password associated with your account at (Zag Web Builder). If you did not make this request, please disregard this email.</p>
    <a href="${resetPasswordLink}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; display: block; border-radius: 5px;text-align:center;width:fit-content;margin:0 auto;">Reset Password</a>
    <p style="font-size:1rem;text-align:center;">This link will expire in one hour. If you encounter any issues, please visit our support page at [Support URL].</p>
    <p style="font-size:1rem;text-align:center;">Thank you</p>
    <p style="font-size:1rem;text-align:center;">(Zag Web Builder) Team</p>
    `,
  };

  try {
    await sgMail.send(msg);
  } catch (err) {
    console.log(err.message);
  }
}

export { sendResetPassworEmail };
