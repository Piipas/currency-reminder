import nodemailer from "nodemailer";
import env from "@repo/envalid/src/reminder";

export const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: Boolean(env.SMTP_SECURE), // Use `true` for port 465, `false` for all other ports
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});
