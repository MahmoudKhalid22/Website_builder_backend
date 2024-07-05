import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

async function sendVerificationEmail(email, token) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const verificationLink = `https://websitebuilderbackend-production-716e.up.railway.app/user/verify/${token}`;

  const msg = {
    to: email,
    from: "zagwebeasybuilder@gmail.com",
    subject: "( ZWEB ) Zagazig Website Easy Builder Email Verification",
    html: `
    <p style="font-size:1.75rem; font-weight:600;text-align:center;">Welcome to ZWEB (Zagazig Website Easy Build)</p>
    <p style="font-size:1.25rem; font-weight:500;text-align:center;">To complete your registration and unlock the full benefits of our platform, please click the button below to verify your email address:</p>    
    <a href="${verificationLink}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; display: block; border-radius: 5px;text-align:center;width:fit-content;margin:0 auto;">Verify Email</a>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log("email sent");
  } catch (err) {
    // console.log(err.message);
    // throw new Error(err.message);
  }
}

export { sendVerificationEmail };
