import { Router } from "express";
const router = Router();
import { newContent, page } from "../controller/page.js";

router.post("/content", newContent);

router.get("/page", page);

export { router };
