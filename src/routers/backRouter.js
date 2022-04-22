import express from "express";
import {
  home,
  fail,
  success,
  logout,
  postEdit,
} from "../controllers/backController.js";
import { avatarUpload } from "../middleware.js";

const backRouter = express.Router();

backRouter.get("/", home);
backRouter.get("/fail", fail);
backRouter.get("/success", success);
backRouter.get("/logout", logout);

backRouter.route("/edit-profile").post(avatarUpload.single("avatar"), postEdit);

export default backRouter;
