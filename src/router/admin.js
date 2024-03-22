import { Router } from "express";
import passport, { Passport } from "passport";
const router = Router();
import {
    adminGetUsers,
    adminCreateUser,
    adminBlockUser,
    adminSendMsg,
    adminSendAlert,
    adminGetPage,
  } from "../controller/user.js";
  import { auth, authRefreshToken } from "../middleware/auth.js";





  export { router as adminRouter };