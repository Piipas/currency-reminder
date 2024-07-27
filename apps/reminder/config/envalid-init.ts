import { bool, cleanEnv, num, str, url } from "envalid";

const env = cleanEnv(process.env, {
  // Exchange rates api
  EXCHANGE_RATES_API_KEY: str(),
  // Nodemailer
  SMTP_HOST: str(),
  SMTP_PORT: num(),
  SMTP_SECURE: bool(),
  SMTP_USER: str(),
  SMTP_PASS: str(),

  CRONJOB_INTERVAL: str(),
});

export default env;
