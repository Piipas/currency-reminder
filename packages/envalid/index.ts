import { cleanEnv, num, url } from "envalid";

export const apiEnv = cleanEnv(process.env, {
  PORT: num(),
  API_BASE_URL: url(),
});
