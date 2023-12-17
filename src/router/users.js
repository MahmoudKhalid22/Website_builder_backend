/**
 * @swagger
 *
 *
 *
 */
/**
 * @swagger
 *  /user:
 *      post:
 *          tag:
 *              - create a new usser
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#component/schemas/User"
 *
 *
 */

import { Router } from "express";
const router = Router();
import { createUser, verifyEmail } from "../controller/user.js";

router.post("/users", createUser);
router.get("/verify/:token", verifyEmail);

export { router as userRouter };
