import express from "express";
import env from "@repo/envalid/src/api";
import { router } from "@/controllers/routes";
import cors from "cors";

const port = env.PORT || 4000;
const app = express();

app.use(
  cors({
    origin: function (origin, callback) {
      if ("http://localhost:4000,http://localhost:5173".split(",").indexOf(origin as string) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
  }),
);
app.use(express.json());
app.use("/", router);

app.listen(port, () => console.log(`Server started at ${env.API_BASE_URL}`));
