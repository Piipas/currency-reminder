import express from "express";
import { apiEnv } from "@repo/envalid";
import { router } from "@/controllers/routes";

const port = apiEnv.PORT || 4000;
const app = express();

app.use(express.json());
app.use("/", router);

app.listen(port, () => console.log(`Server started at ${apiEnv.API_BASE_URL}`));
