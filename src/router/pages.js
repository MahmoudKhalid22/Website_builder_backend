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
import { auth } from "../middleware/auth.js";

router.post("/", auth, newPage);

router.get("/pages", auth, getPages);

router.get("/:id", auth, getPage);
router.delete("/:id", auth, deletePage);
router.delete("/:id", auth, deleteUserPages);

router.patch("/update/:id", auth, updatePage);

export { router as pageRouter };
