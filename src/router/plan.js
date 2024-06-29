import { Router } from "express";
import {
  getAllPlans,
  newPlan,
  updatePlan,
  deletePlan,
} from "../controller/plan.js";
import { isAdmin, auth } from "../middleware/index.js";

const router = Router();

router.post("/new", auth, isAdmin, newPlan);

router.get("/", getAllPlans);

router.patch("/:id", auth, isAdmin, updatePlan);

router.delete("/:id", auth, isAdmin, deletePlan);

export { router as planRouter };
