import express from "express";
import dotenv from "dotenv";
import connection from "./db/dbConnection.js";
import { router as pageRouter } from "./router/pages.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(pageRouter);

const PORT = process.env.PORT;

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}/`)
);
