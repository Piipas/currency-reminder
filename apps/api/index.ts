import express from "express";
import { apiEnv } from "@repo/envalid";

const port = apiEnv.PORT || 4000;
const app = express();

app.listen(port, () => console.log(`Server started at ${apiEnv.API_BASE_URL}`));
