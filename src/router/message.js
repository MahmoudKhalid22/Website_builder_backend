import { Router } from "express";
import { sendMessage, getMessages } from "../controller/message.js";
import { auth } from "../middleware/auth.js";
const router = Router();

// SEND MESSAGE FOR ALL USERS
router.post("/", sendMessage);

// GET MESSAGE FOR ADMIN
router.get("/", auth, getMessages);

export { router as messageRouter };
