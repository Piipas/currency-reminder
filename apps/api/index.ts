import express from "express";
import env from "@repo/envalid/src/api";
import { router } from "@/controllers/routes";

const port = env.PORT || 4000;
const app = express();

app.use(express.json());
app.use("/", router);

app.listen(port, () => console.log(`Server started at ${env.API_BASE_URL}`));
