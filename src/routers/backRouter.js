import express from "express";
import { home, fail, success, logout } from "../controllers/backController.js";

const backRouter = express.Router();

backRouter.get("/", home);
backRouter.get("/fail", fail);
backRouter.get("/success", success);
backRouter.get("/logout", logout);

export default backRouter;
