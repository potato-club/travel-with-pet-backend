import express from "express";
import {
  infoPostUpload,
  dailyPostUpload,
  infoSearch,
  storySearch,
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
  infoSee,
  dailySee,
  postInfoEdit,
  postStoryEdit,
} from "../controllers/writingController.js";
const writingRouter = express.Router();

//ok
writingRouter.post("/info", infoPostUpload);
writingRouter.post("/daily", dailyPostUpload);

//ok
writingRouter.get("/search/info", infoSearch);
writingRouter.get("/search/daily", storySearch);

//ok
writingRouter.get("/sort/recent", sortRecent);

writingRouter.get("/sort/heart", sortHeart);

writingRouter.get("/all/daily", storyShow);

writingRouter.get("/all/recent/travel", travelMore);
writingRouter.get("/all/recent/etc", etcMore);
writingRouter.get("/all/recent/place", placeMore);
writingRouter.get("/all/recent/store", storeMore);
writingRouter.get("/all/heart/travel", hearttravelMore);
writingRouter.get("/all/heart/etc", heartetcMore);
writingRouter.get("/all/heart/place", heartplaceMore);
writingRouter.get("/all/heart/store", heartstoreMore);

writingRouter.get("/edit/info", postInfoEdit);
writingRouter.get("/edit/daily", postStoryEdit);

//ok
writingRouter.get("/info/:id([0-9a-f]{24})", infoSee);
writingRouter.get("/daily/:id([0-9a-f]{24})", dailySee);

export default writingRouter;
