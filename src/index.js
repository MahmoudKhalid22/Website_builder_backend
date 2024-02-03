import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connection } from "./db/dbConnection.js";
// import { router as pageRouter } from "./router/pages.js";
import { userRouter } from "./router/users.js";
import { pageRouter } from "./router/pages.js";
import { docs } from "./utils/swagger.js";
import  passport from "passport";
// import { oauth } from "./controller/OAUTH.js";

const app = express();
app.use(express.json());
import Session from 'express-session';

app.use(Session({
  secret: process.env.EXPRESS_SESSION_SECRET_KEY,
  resave: true,
  saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(userRouter);
app.use(pageRouter);

const PORT = 5000;

docs(app);
connection();

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}/`)
);
