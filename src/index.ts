import { connectToTheDatabase } from "./database/connection";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

export const app = express();
const port: number = Number(process.env.PORT) || 3000;

connectToTheDatabase();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log("Api listening on port " + port);
});
