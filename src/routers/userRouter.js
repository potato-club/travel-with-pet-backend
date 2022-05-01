import express from "express";
import {
  success,
  logout,
  fail,
  postEdit,
  allSee,
} from "../controllers/userController.js";
import { avatarUpload } from "../middleware.js";

const userRouter = express.Router();

userRouter.get("/login/success", success);
userRouter.get("/login/fail", fail);
userRouter.get("/logout", logout);
userRouter.route("/profile").post(avatarUpload.single("avatar"), postEdit);
userRouter.get("/:id([0-9a-f]{24})", allSee);

export default userRouter;
