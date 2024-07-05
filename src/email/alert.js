import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

async function sendAlertEmail(email, username) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: email,
    from: "zagwebeasybuilder@gmail.com",
    subject: "Account Deletion Alert",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
        <h2 style="color: #333; text-align: center;">Important: Account Deletion Notice</h2>
        <p>Dear ${username},</p>
        <p>We hope this message finds you well. This is to inform you that your account on <strong>zweb zagagzig web builder</strong> is scheduled for deletion by an administrator.</p>
        <p>If you have any questions or believe this action is in error, please contact us immediately to resolve the issue.</p>
        <p>Best regards,</p>
        <p>The <strong>zweb zagagzig web builder</strong> Team</p>
        <div style="margin-top: 20px; text-align: center;">
          <a href="https://www.zwebzagagzig.com" style="background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Visit Our Website</a>
        </div>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log("email sent");
  } catch (err) {
    console.log(err.message);
  }
}

export { sendAlertEmail };
