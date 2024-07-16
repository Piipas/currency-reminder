import nodemailer from "nodemailer";
import env from "./envalid-init";

export const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: Boolean(env.SMTP_SECURE), // Use `true` for port 465, `false` for all other ports
  from: env.SMTP_USER,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});
