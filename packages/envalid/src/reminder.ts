import { cleanEnv, num, str } from "envalid";

const env = cleanEnv(process.env, {
  EXCHANGE_RATES_API_KEY: str(),

  SMTP_HOST: str(),
  SMTP_PORT: num(),
  SMTP_SECURE: str(),
  SMTP_USER: str(),
  SMTP_PASS: str(),
});

export default env;
