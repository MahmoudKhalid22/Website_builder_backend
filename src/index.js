import express from "express";
import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import session from "express-session";
import ejs from "ejs";
import path, { dirname } from "path";
import { connection } from "./db/dbConnection.js";
import { userRouter } from "./router/users.js";
import { pageRouter } from "./router/pages.js";
import { docs } from "./utils/swagger.js";
import "./controller/OAUTH.js";
import { fileURLToPath } from "url";
import { testReq } from "./utils/testRequest.js";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(cors());
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
testReq();

app.get("/test", (req, res) => {
  res.json({ message: "test" });
});
app.get("*", (req, res) => {
  res.render("404");
});

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}/`)
);
