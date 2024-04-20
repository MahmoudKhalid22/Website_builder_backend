import express from "express";
import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import session from "express-session";
import ejs from "ejs";
import path, { dirname } from "path";
import { connection } from "./db/dbConnection.js";
import { userRouter } from "./router/users.js";
import { adminRouter } from "./router/admin.js";
import { pageRouter } from "./router/pages.js";
import { messageRouter } from "./router/message.js";
import { docs } from "./utils/swagger.js";
// import "./controller/OAUTH.js";
import { fileURLToPath } from "url";
import { testReq, testReqDev, eduTestReq } from "./utils/testRequest.js";
import cors from "cors";
import hpp from "hpp";
// import MongoDBStore from "connect-mongodb-session";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(cors());
app.use(hpp());

// const store = new MongoDBStore({
//   uri: process.env.MONGODB_URL,
// });

app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    // store: store,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/user", userRouter);
app.use("/page", pageRouter);
app.use("/message", messageRouter);
// app.use("/admin", adminRouter , userRouter);

const PORT = process.env.PORT;

docs(app);
connection();
testReq();
testReqDev();
eduTestReq();

app.get("/test", (req, res) => {
  res.json({ message: "test" });
});
app.get("*", (req, res) => {
  res.render("404");
});

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}/`)
);
