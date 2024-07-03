import { Router } from "express";
const router = Router();

import {
  getPage,
  getPages,
  newPage,
  updatePage,
  deletePage,
  deleteUserPages,
} from "../controller/page.js";
import { auth } from "../middleware/index.js";

// NEW PAGE
router.post("/", auth, newPage);

// GET USER PAGES
router.get("/pages", auth, getPages);

router.get("/:userId/:pageId", getPage);

router.delete("/:id", auth, deletePage);

router.patch("/update/:id", auth, updatePage);

router.delete("/delete/pages", auth, deleteUserPages);

export { router as pageRouter };
