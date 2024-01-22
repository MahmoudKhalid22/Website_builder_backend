import express from "express";
import dotenv from "dotenv";
import { connection } from "./db/dbConnection.js";
// import { router as pageRouter } from "./router/pages.js";
import { userRouter } from "./router/users.js";
import { pageRouter } from "./router/pages.js";
import { docs } from "./utils/swagger.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use(userRouter);
app.use(pageRouter);

const PORT = process.env.PORT;

docs(app);
connection();

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}/`)
);
