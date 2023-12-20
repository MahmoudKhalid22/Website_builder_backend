/**
 * @swagger
 *  components:
 *   schemas:
 *      User:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: the name of the user
 *              email:
 *                  type: string
 *                  description: the email of the user must be the valid and true email
 *              password:
 *                  type: string
 *                  description: the password of the user the minimum characters must be 6
 *              verified:
 *                  type: boolean
 *                  description: the email of the user is true or not
 *              tokens:
 *                  type: array
 *                  description: tokens of the user
 *      Register:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: the name of the user
 *              email:
 *                  type: string
 *                  description: the email of the user must be the valid and true email
 *              password:
 *                  type: string
 *                  description: the password of the user the minimum characters must be 6
 *      Login:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *                  description: the email of the user that he registered
 *              password:
 *                  type: string
 *                  description: the password of the user
 */
/**
 * @swagger
 *  /user:
 *      post:
 *          tags:
 *              - Create a new user
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Register"
 *          responses:
 *              "201":
 *                 description: create user in database with not verified
 *                 content:
 *                      application/json:
 *                         schema:
 *                          type: string
 *                          example: check your email to verify your account
 */
/**
 * @swagger
 *  /user/login:
 *      post:
 *          tags:
 *              - login the user
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Login"
 *          responses:
 *              "200":
 *                 description: response of login
 *                 content:
 *                      application/json:
 *                         schema:
 *                          $ref: '#/components/schemas/User'
 */
/**
 * @swagger
 *  /user/delete:
 *      delete:
 *          tags:
 *              - delete the user account
 *          parameters:
 *                - in: header
 *                  name: Authorization
 *                  schema:
 *                   type: string
 *                  required: true
 *                  description: Bearer token for user authentication
 *                  example: "Bearer abcxyz123456"
 *          responses:
 *              "200":
 *                 description: response of deleting user
 *                 content:
 *                      application/json:
 *                         schema:
 *                          type: string
 *                          example: the user has been deleted
 */

import { Router } from "express";
const router = Router();
import {
  createUser,
  verifyEmail,
  loginUser,
  deleteUser,
  uploadUser,
} from "../controller/user.js";
import { auth } from "../middleware/auth.js";
import multer from "multer";

router.post("/user", createUser);
router.get("/verify/:token", verifyEmail);

router.post("/user/login", loginUser);

router.delete("/user/delete", auth, deleteUser);

const upload = multer({
  limits: {
    fileSize: 1500000,
  },
  fileFilter(req, file, cb) {
    //		console.log(file.originalname,file.originalname.includes('.jpg'))
    if (!file.originalname.includes("png")) {
      if (!file.originalname.includes("jpg")) {
        if (!file.originalname.includes("jpeg")) {
          return cb(new Error("it must be an image"));
        }
      }
    }
    cb(undefined, true);
  },
});

router.post(
  "/upload",
  auth,
  upload.single("avatar"),
  uploadUser,
  (error, req, res, next) => res.status(500).json({ error: error.message })
);

export { router as userRouter };
