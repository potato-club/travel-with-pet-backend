import express from "express";
import {
  home,
  sortRecent,
  sortHeart,
  travelMore,
  storeMore,
  placeMore,
  etcMore,
  hearttravelMore,
  heartstoreMore,
  heartplaceMore,
  heartetcMore,
  storyShow,
  allSee,
  see,
  infoSearch,
  storySearch,
  myComment,
  fail,
  success,
  logout,
  postEdit,
  infoPostUpload,
  storyPostUpload,
  createComment,
  infoDeleteComment,
  storyDeleteComment,
} from "../controllers/backController.js";
import { avatarUpload } from "../middleware.js";

const backRouter = express.Router();

backRouter.get("/", home);
backRouter.get("/sortRecent", sortRecent);
backRouter.get("/sortHeart", sortHeart);

backRouter.get("/travelMore", travelMore);
backRouter.get("/etcMore", etcMore);
backRouter.get("/placeMore", placeMore);
backRouter.get("/storeMore", storeMore);
backRouter.get("/hearttravelMore", hearttravelMore);
backRouter.get("/heartetcMore", heartetcMore);
backRouter.get("/heartplaceMore", heartplaceMore);
backRouter.get("/heartstoreMore", heartstoreMore);

backRouter.get("/storyShow", storyShow);

backRouter.get("user/:id([0-9a-f]{24})", allSee);
backRouter.get("writing/:id([0-9a-f]{24})", see);

backRouter.post("/:id([0-9a-f]{24})/comment", createComment);
backRouter.delete("/:id([0-9a-f]{24})/infoDelete", infoDeleteComment);
backRouter.delete("/:id([0-9a-f]{24})/storyDelete", storyDeleteComment);

backRouter.get("/infoSearch", infoSearch);
backRouter.get("/storySearch", storySearch);

backRouter.get("/myComment", myComment);

backRouter.get("/fail", fail);
backRouter.get("/success", success);
backRouter.get("/logout", logout);
backRouter.route("/edit-profile").post(avatarUpload.single("avatar"), postEdit);

backRouter.post("/infoUpload", infoPostUpload);
backRouter.post("/stroyUpload", storyPostUpload);

export default backRouter;
