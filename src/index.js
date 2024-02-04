import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
dotenv.config();
import { connection } from "./db/dbConnection.js";
import { userRouter } from "./router/users.js";
import { pageRouter } from "./router/pages.js";
import { docs } from "./utils/swagger.js";
import "./controller/OAUTH.js";

const app = express();

app.use(express.json());
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET_KEY,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/user", userRouter);
app.use("/page", pageRouter);

const PORT = process.env.PORT;

docs(app);
connection();

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}/`)
);
