import { Router } from "express";
const router = Router();

import {
  deleteUserWebsite,
  deleteWebsite,
  getWebsite,
  getWebsites,
  newWebsite,
  updateWebsite,
} from "../controller/website.js";
import { auth } from "../middleware/index.js";

// NEW PAGE
router.post("/", auth, newWebsite);

// GET USER PAGES
router.get("/websites", auth, getWebsites);

router.get("/:userId/:pageId", getWebsite);

router.delete("/:id", auth, deleteWebsite);

router.patch("/update/:id", auth, updateWebsite);

router.delete("/delete/websites", auth, deleteUserWebsite);

export { router as websiteRouter };
