import express from "express";
import serverless from "serverless-http";
import config from "config";
import * as dotenv from "dotenv";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connect, logger } from "./utils";
import lessonRoute from "./modules/lessons/lesson.route";
import orderRoute from "./modules/orders/order.route";

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const {
  ORIGIN
} = process.env;

const port = config.get<number>("port");

const app = express();

app.use(cors({
  origin: ORIGIN,
  credentials: true
}))

app.use(express.json());

app.use(cookieParser());

app.use("/api/lessons", lessonRoute);
app.use("/api/orders", orderRoute);

// app.listen(port, async () => {
//   logger.info(`App is running at localhost://${port}.`);

//   await connect();
// })

const lambda = serverless(app);

export async function handler(event: any, context: any) {
  await connect();
  return lambda(event, context);
}