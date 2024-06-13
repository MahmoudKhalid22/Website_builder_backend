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
  newPlan,
  getAllPlans,
  updatePlan,
  deletePlan,
  getAllMessages,
  getDailymessages,
} from "../controller/user.js";
import { auth, authRefreshToken, isAdmin } from "../middleware/auth.js";
import multer from "multer";

// GENERAL USER
router.post("/", createUser);
router.get("/verify/:token", verifyEmail);
router.post("/login", loginUser);
router.put("/update-username", auth, updateUser);
router.delete("/delete", auth, deleteUser);
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

router.get("/me", auth, getUser);

router.get("/logout-user", auth, logoutUser);

router.post("/update-password", auth, updatePassword);

router.post("/resend-email", resendEmail);

// UNDER TESTING

router.post("/forget-password", forgetPassword);

router.post("/reset-password/:token", resetPassword);
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

router.post("/update-email", auth, updateEmail);

router.get("/verify-new-email/:token", updateEmailAfterVerification);
// ----------------------------
//FOR ADMIN ONLY

router.get("/admin-users", auth, isAdmin, adminGetUsers);

router.post("/admin-create-user", auth, isAdmin, adminCreateUser);

router.get("/page/:pageId", isAdmin, adminGetPage);

router.put("/block/:userId", auth, isAdmin, adminBlockUser);

router.post("/send-message/:userId", auth, isAdmin, adminSendMsg);

router.post("/send-alert/:userId", auth, isAdmin, adminSendAlert);

//SUBSCIPTION PLAN

router.post("/new-plan", auth, isAdmin, newPlan);

router.get("/all-plans", getAllPlans);

router.patch("/:id", auth, isAdmin, updatePlan);

router.delete("/:id", auth, isAdmin, deletePlan);

//GET ALL MESSAGES

router.get("/all-users-messages", auth, isAdmin, getAllMessages);

router.get("/messages/daily", auth, isAdmin, getDailymessages);

export { router as userRouter };
