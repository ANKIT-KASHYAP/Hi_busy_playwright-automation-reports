//const nodemailer = require("nodemailer");
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

async function sendEmail() {

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ankit.kashyap@mail.busy.in",
      pass: 'jldyqumbjsvetwmc'
    }
  });

  let mailOptions = {
    from: "ankit.kashyap@mail.busy.in",
    to: "27ankitkashyap@gmail.com",
    subject: "Playwright Automation Execution Report",
   html: `
  <h3>Automation Execution Completed</h3>
  <p>Please check the report using below link:</p>

  <a href="https://ankit-kashyap.github.io/Hi_busy_playwright-automation-reports/"
     style="display:inline-block;
            padding:10px 20px;
            background-color:#0078D7;
            color:#ffffff;
            text-decoration:none;
            border-radius:5px;
            font-weight:bold;">
     View Automation Report
  </a>

  <br><br>
  Regards,<br>
  Ankit
`
  };

  await transporter.sendMail(mailOptions);
  console.log("Report link sent successfully!");
}

sendEmail();