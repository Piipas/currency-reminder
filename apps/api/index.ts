import express, { NextFunction, Request, Response } from "express";
import { router } from "@/routes";
import cors from "cors";
import env from "config/envalid-init";

const port = env.PORT || 4000;
const app = express();

app.use(
  cors({
    origin: function (origin, callback) {
      if (origin && (env.CORS_WHITELIST as string).split(",").includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    allowedHeaders: ["Content-Type"],
  }),
);
app.use(express.json());
app.use("/", router);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  res.status(500).json({ message: "Internal Server Error!" });
});

app.listen(port, () => console.log(`Server started at ${env.API_BASE_URL}`));
