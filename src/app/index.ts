import express, { Express } from "express";
import dotenv from "dotenv";
import { appRouter } from "./router";

dotenv.config();

export function startApp() {
  const app: Express = express();
  const port = process.env.PORT;

  app.use(appRouter);
  
  app.listen(port, () => {
    console.log(`❄⚡[server]: The Server is running at http://localhost:${port}`);
  });
}
