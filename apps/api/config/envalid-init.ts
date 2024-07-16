import { cleanEnv, num, str, url } from "envalid";

const env = cleanEnv(process.env, {
  PORT: num(),
  API_BASE_URL: url(),
  NODE_ENV: str({ choices: ["production", "development"], default: "development" }),
  CORS_WHITELIST: str(),
});

export default env;
