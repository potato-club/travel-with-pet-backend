import express from "express";
import {
  // home,
  dailymyComment,
  createComment,
  infoDeleteComment,
  storyDeleteComment,
  infomyComment,
  myInfoHeart,
  myStoryHeart,
  clickHeart,
} from "../controllers/commentController.js";

const commentRouter = express.Router();

// commentRouter.get("/", home);

commentRouter.post("/:id([0-9a-f]{24})", createComment);
commentRouter.delete("/infocomment/:id([0-9a-f]{24})", infoDeleteComment);
commentRouter.delete("/dailycomment/:id([0-9a-f]{24})", storyDeleteComment);

commentRouter.get("/infocomment", infomyComment);
commentRouter.get("/dailycomment", dailymyComment);

commentRouter.get("/dailyheart", myStoryHeart);

commentRouter.get("/clickheart", clickHeart);

commentRouter.get("/infoheart", myInfoHeart);
commentRouter.get("/dailyheart", myStoryHeart);

// backRouter.get("writing/:id([0-9a-f]{24})", see);
//backRouter.get("user/:id([0-9a-f]{24})", allSee);

// backRouter.get("/infoSearch", infoSearch);
// backRouter.get("/storySearch", storySearch);
// backRouter.post("/infoUpload", infoPostUpload);
// backRouter.post("/stroyUpload", storyPostUpload);

// backRouter.get("/sortRecent", sortRecent);
// backRouter.get("/sortHeart", sortHeart);

// backRouter.get("/travelMore", travelMore);
// backRouter.get("/etcMore", etcMore);
// backRouter.get("/placeMore", placeMore);
// backRouter.get("/storeMore", storeMore);
// backRouter.get("/hearttravelMore", hearttravelMore);
// backRouter.get("/heartetcMore", heartetcMore);
// backRouter.get("/heartplaceMore", heartplaceMore);
// backRouter.get("/heartstoreMore", heartstoreMore);

// backRouter.get("/storyShow", storyShow);

export default commentRouter;
