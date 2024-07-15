import express, { NextFunction, Request, Response } from "express";
import env from "@repo/envalid/src/api";
import { router } from "@/routes";
import cors from "cors";
import { Prisma } from "@prisma/client";

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

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return res.status(409).json({ message: "You are trying to insert an item with an existing unique value!" });
      case "P2025":
        return res.status(404).json({ message: "The item you are looking for, does not exist!" });
    }
  }
  res.status(500).json({ message: "Internal Server Error!" });
});

app.listen(port, () => console.log(`Server started at ${env.API_BASE_URL}`));
