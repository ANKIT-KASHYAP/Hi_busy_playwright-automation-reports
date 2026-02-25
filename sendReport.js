// import fs from 'fs';
// import path from 'path';
import nodemailer from 'nodemailer'
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

async function sendEmail() {

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
    subject: "Playwright Automation Test Report",
    text: "Hi Sir, Please find attached Playwright HTML and Allure reports.",
    attachments: [
      {
        filename: "PlaywrightReport.zip",
        path: "./playwright-report"
      },
      {
        filename: "AllureReport.zip",
        path: "./allure-report"
      }
    ]
  };

  await transporter.sendMail(mailOptions);
  console.log("Report sent successfully!");
}

sendEmail();