import { Router } from "express";
import passport, { Passport } from "passport";
const router = Router();
import {
  createUser,
  verifyEmail,
  loginUser,
  deleteUser,
  uploadUser,
  forgetPassword,
  resetPassword,
  updateUser,
  refreshToken,
  getUser,
  logoutUser,
  updatePassword,
  updateEmail,
  updateEmailAfterVerification,
  resendEmail,
  adminGetUsers,
  adminCreateUser,
  adminBlockUser,
  adminSendMsg,
  adminSendAlert,
  adminGetPage,
} from "../controller/user.js";
import { auth, authRefreshToken } from "../middleware/auth.js";
import multer from "multer";

router.post("/", createUser);
router.get("/verify/:token", verifyEmail);

router.post("/login", loginUser);
router.post("/forget-password", forgetPassword);

router.post("/reset-password/:token", resetPassword);

router.delete("/delete", auth, deleteUser);
router.put("/update-username", auth, updateUser);
router.get("/refresh-token", authRefreshToken, refreshToken);
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
// oauth with google
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get("/welcome", (req, res) => {
  res.send("your auth success");
});

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/user/welcome",
    failureRedirect: "/",
  })
);
router.get("/facebook", passport.authenticate("facebook"), (req, res) => {
  res.redirect("/user/welcome");
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/", (req, res) => {
  res.send(
    req.user ? req.user : "Not logged in, login with Google or facebook"
  );
});

router.get("/me", auth, getUser);

router.get("/logout-user", auth, logoutUser);

router.post("/update-password", auth, updatePassword);

router.post("/update-email", auth, updateEmail);

router.get("/verify-new-email/:token", updateEmailAfterVerification);

router.post("/resend-email", resendEmail);

router.get("/adminGetUsers" , auth, adminGetUsers);

router.post("/adminCreateUser", adminCreateUser);

router.get('/:userId/page', adminGetPage );

router.put('/:userId/block', adminBlockUser);

router.post('/:userId/send-message', adminSendMsg);

router.post('/:userId/send-alert', adminSendAlert);

export { router as userRouter };
