import express, { Express } from "express";
import { appRouter } from "./router";
import config from "./config";

export function startApp() {
  const app: Express = express();
  const port = config.app.port;

  app.use(appRouter);
  
  app.listen(port, () => {
    console.log(`❄⚡[server]: The Server is running at http://localhost:${port}`);
  });
}
