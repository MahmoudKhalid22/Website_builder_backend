import { Router } from "express";
const router = Router();
import {
  createUser,
  verifyEmail,
  loginUser,
  deleteUser,
  uploadUser,
  updateUser,
  forgetPassword,
  resetPassword,
} from "../controller/user.js";
import { auth } from "../middleware/auth.js";
import multer from "multer";

router.post("/user", createUser);
router.get("/verify/:token", verifyEmail);

router.post("/user/login", loginUser);
router.post("/user/forget-password", forgetPassword);

router.post("/user/reset-password/:token", resetPassword);

router.delete("/user/delete", auth, deleteUser);
router.patch("/user/:id", updateUser);

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
