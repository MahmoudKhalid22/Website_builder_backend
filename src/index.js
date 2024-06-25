import express from "express";
import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import session from "express-session";
import path, { dirname } from "path";
import { connection } from "./db/dbConnection.js";
import { userRouter } from "./router/users.js";
import { pageRouter } from "./router/pages.js";
import { messageRouter } from "./router/message.js";
import { planRouter } from "./router/plan.js";

import { docs } from "./utils/swagger.js";
// import "./controller/OAUTH.js";
import { fileURLToPath } from "url";
import cors from "cors";
import hpp from "hpp";
// import MongoDBStore from "connect-mongodb-session";
import { limiter } from "./middleware/rateLimit.js"; // Adjust the import path as per your directory structure
import { hppMiddleware } from "./middleware/hpp.js"; // Adjust the import path as per your directory structure
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
app.use("/plan", planRouter);
// app.use("/admin", adminRouter , userRouter);
// Apply rate limiting middleware to all routes or specific routes
app.use("/api/", limiter); // Adjust the path as per your API routes

// Apply hppMiddleware to all routes or specific routes
app.use(hppMiddleware); // Protects against HTTP parameter pollution

const PORT = process.env.PORT;

docs(app);
connection();

app.get("/test", (req, res) => {
  res.json({ message: "test" });
});
app.get("*", (req, res) => {
  res.render("404");
});

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}/`)
);
