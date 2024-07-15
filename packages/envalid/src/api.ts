import { cleanEnv, num, url } from "envalid";

const env = cleanEnv(process.env, {
  PORT: num(),
  API_BASE_URL: url(),
});

export default env;
