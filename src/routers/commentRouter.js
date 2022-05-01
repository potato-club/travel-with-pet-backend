import express from "express";
import {
  home,
  myComment,
  createComment,
  infoDeleteComment,
  storyDeleteComment,
} from "../controllers/commentController";

const commentRouter = express.Router();

commentRouter.get("/", home);

commentRouter.post("/:id([0-9a-f]{24})", createComment);
commentRouter.delete("/info/:id([0-9a-f]{24})", infoDeleteComment);
commentRouter.delete("/daily/:id([0-9a-f]{24})", storyDeleteComment);

commentRouter.get("/my", myComment);

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
