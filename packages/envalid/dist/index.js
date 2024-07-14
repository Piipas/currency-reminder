import { cleanEnv, num, str, url } from "envalid";
export const apiEnv = cleanEnv(process.env, {
    PORT: num(),
    API_BASE_URL: url(),
    EXCHANGE_RATES_API_KEY: str(),
});
