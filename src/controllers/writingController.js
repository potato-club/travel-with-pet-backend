import User from "../models/User.js";
import InfoWriting from "../models/InfoWriting.js";
import StoryWriting from "../models/StoryWriting.js";
import Comment from "../models/Comment.js";

export const infoPostUpload = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  //확인 필요
  const { title, contents, category, city, detailCity, tags } = req.body;
  try {
    const newWriting = await InfoWriting.create({
      title,
      category,
      contents,
      city,
      detailCity,
      tags,
      owner: _id,
    });
    // const user = await User.findById(_id);
    // user.infowWiting.push(newWriting._id);
    // user.save();
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    //작성하는 장소로 이동시켜야함!
    return res.status(400).redirect("/info");
  }
};

export const dailyPostUpload = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { title, tags, contents } = req.body;
  try {
    const newWriting = await StoryWriting.create({
      title,
      tags,
      contents,
      owner: _id,
    });
    const user = await User.findById(_id);
    user.storyWriting.push(newWriting._id);
    user.save();
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    //작성하는 장소로 이동시켜야함! (post말고!!)
    return res.status(400).redirect("/daily");
  }
};

export const infoSearch = async (req, res) => {
  const { key } = req.query;
  console.log(key);
  let list = [];
  if (key) {
    list = await InfoWriting.find({
      title: {
        $regex: new RegExp(`${key}$`, "i"),
      },
    }).populate("owner");
  }
  return res.send(list);
};

export const storySearch = async (req, res) => {
  const { key } = req.query;
  let list = [];
  if (key) {
    list = await InfoWriting.find({
      title: {
        $regex: new RegExp(`${key}$`, "i"),
      },
    }).populate("owner");
  }
  return res.send(list);
};

export const sortRecent = async (req, res) => {
  const travel = await InfoWriting.find({ category: "여행" }).limit(4);
  const store = await InfoWriting.find({ category: "음식점" }).limit(4);
  const place = await InfoWriting.find({ category: "숙소" }).limit(4);
  const etc = await InfoWriting.find({ category: "기타" }).limit(4);

  return req.send({ travel, store, place, etc });
};

export const sortHeart = async (req, res) => {
  const travel = await InfoWriting.find({ category: "여행" })
    .sort({ heart: "desc" })
    .limit(4);
  const store = await InfoWriting.find({ category: "음식점" })
    .sort({ heart: "desc" })
    .limit(4);
  const place = await InfoWriting.find({ category: "숙소" })
    .sort({ heart: "desc" })
    .limit(4);
  const etc = await InfoWriting.find({ category: "기타" })
    .sort({ heart: "desc" })
    .limit(4);

  return res.send({ travel, store, place, etc });
};

//정보 글 보여주기(더보기)("/foodMore")

export const travelMore = async (req, res) => {
  const travel = await InfoWriting.find({ category: "여행" });
  return res.send({ travel });
};
export const storeMore = async (req, res) => {
  const store = await InfoWriting.find({ category: "음식점" });
  return res.send({ store });
};
export const placeMore = async (req, res) => {
  const place = await InfoWriting.find({ category: "숙소" });
  return res.send({ place });
};
export const etcMore = async (req, res) => {
  const etc = await InfoWriting.find({ category: "기타" });
  return res.send({ etc });
};

export const hearttravelMore = async (req, res) => {
  const travel = await InfoWriting.find({ category: "여행" }).sort({
    heart: "desc",
  });
  return res.send({ travel });
};
export const heartstoreMore = async (req, res) => {
  const store = await InfoWriting.find({ category: "음식점" }).sort({
    heart: "desc",
  });
  return res.send({ store });
};
export const heartplaceMore = async (req, res) => {
  const place = await InfoWriting.find({ category: "숙소" }).sort({
    heart: "desc",
  });
  return res.send({ place });
};
export const heartetcMore = async (req, res) => {
  const etc = await InfoWriting.find({ category: "기타" }).sort({
    heart: "desc",
  });
  return res.send({ etc });
};

//일상글 보여주기
//글 번호, 제목, 태그, 댓글수, 작성자, 작성일

export const storyShow = async (req, res) => {
  const list = await StoryWriting.find().populate("owner");
  return res.send(list);
};

//글 상세페이지
export const infoSee = async (req, res) => {
  const { id } = req.params;
  const writing = await InfoWriting.findById(id)
    .populate("owner")
    .populate("comments");
  if (!writing) {
    return res.send("Nothing");
  }
  return res.send(writing);
};

export const dailySee = async (req, res) => {
  const { id } = req.params;
  const writing = await StoryWriting.findById(id)
    .populate("owner")
    .populate("comments");
  if (!writing) {
    return res.send("Nothing");
  }
  return res.send(writing);
};

//edit 만들기

export const postInfoEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const { title, contents, category, city, detailCity, tags } = req.body;
  const infoWriting = await InfoWriting.exists({ _id: id });
  if (!infoWriting) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(infoWriting.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await InfoWriting.findByIdAndUpdate(id, {
    title,
    contents,
    category,
    city,
    detailCity,
    tags,
  });
  return res.redirect(`/writing/${id}`);
};

export const postStoryEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const { title, tags, contents } = req.body;
  const storyWriting = await StoryWriting.exists({ _id: id });
  if (!storyWriting) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(storyWriting.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await StoryWriting.findByIdAndUpdate(id, {
    title,
    tags,
    contents,
  });
  return res.redirect(`/writing/${id}`);
};
