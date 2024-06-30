import { Router } from "express";
import { sendMessage, getMessages } from "../controller/message.js";
import { auth, isAdmin } from "../middleware/index.js";
const router = Router();

// SEND MESSAGE FOR ALL USERS
router.post("/", sendMessage);

// GET MESSAGE FOR ADMIN
router.get("/admin", auth, isAdmin, getMessages);

export { router as messageRouter };
