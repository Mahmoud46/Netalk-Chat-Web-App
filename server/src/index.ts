import express, { type Request, type Response } from "express";
import { ENV } from "./config/env.ts";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from TypeScript Express!");
});

app.listen(ENV.PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${ENV.PORT}`);
});
