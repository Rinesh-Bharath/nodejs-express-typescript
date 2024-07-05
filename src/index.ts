import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("NodeJS + Express + TypeScript Server");
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`[server]: Server is running at ${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);
});