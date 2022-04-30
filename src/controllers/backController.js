import User from "../models/User.js";
import InfoWriting from "../models/InfoWriting.js";
import StoryWriting from "../models/StoryWriting.js";
import Comment from "../models/Comment.js";

//메인페이지("/")
//카테고리별로 (여행, 음식점, 숙소, 기타)
//->사진, 내용, 태그, 지역,, 작성자, 작성일, 하트수

export const home = (req, res) => {
  console.log(req.session);
  return res.send(req.user.name);
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

  return req.send({ travel, store, place, etc });
};

//정보 글 보여주기(더보기)("/foodMore")

export const travelMore = async (req, res) => {
  const travel = await InfoWriting.find({ category: "여행" });
  return req.send({ travel });
};
export const storeMore = async (req, res) => {
  const store = await InfoWriting.find({ category: "음식점" });
  return req.send({ store });
};
export const placeMore = async (req, res) => {
  const place = await InfoWriting.find({ category: "숙소" });
  return req.send({ place });
};
export const etcMore = async (req, res) => {
  const etc = await InfoWriting.find({ category: "기타" });
  return req.send({ etc });
};

export const hearttravelMore = async (req, res) => {
  const travel = await InfoWriting.find({ category: "여행" }).sort({
    heart: "desc",
  });
  return req.send({ travel });
};
export const heartstoreMore = async (req, res) => {
  const store = await InfoWriting.find({ category: "음식점" }).sort({
    heart: "desc",
  });
  return req.send({ store });
};
export const heartplaceMore = async (req, res) => {
  const place = await InfoWriting.find({ category: "숙소" }).sort({
    heart: "desc",
  });
  return req.send({ place });
};
export const heartetcMore = async (req, res) => {
  const etc = await InfoWriting.find({ category: "기타" }).sort({
    heart: "desc",
  });
  return req.send({ etc });
};

//일상글 보여주기
//글 번호, 제목, 태그, 댓글수, 작성자, 작성일

export const storyShow = async (req, res) => {
  const list = await StoryWriting.find();
  return res.send(list);
};

//각각의 글 보여주기
//본인아이디 -> 제목, 글 내용, 하트

export const see = async (req, res) => {
  const { id } = req.params;
  const writing = await StoryWriting.findById(id)
    .populate("owner")
    .populate("comments");
  if (!writing) {
    return res.send("Writing not found.");
  }
  return res.send(writing);
};

//comment
export const createComment = async (req, res) => {
  const {
    session: { user },
    body: { text },
    params: { id },
  } = req;

  const infoWriting = await InfoWriting.findById(id);
  const storyWriting = await StoryWriting.findById(id);

  if (!infoWriting) {
    const comment = await Comment.create({
      text,
      owner: user._id,
      writing: id,
    });
    storyWriting.comments.push(comment._id);
    storyWriting.save();
    //???
    return res.status(201).json({ newCommentId: comment._id });
  }
  const comment = await Comment.create({
    text,
    owner: user._id,
    writing: id,
  });
  infoWriting.comments.push(comment._id);
  infoWriting.save();
  return res.status(201).json({ newCommentId: comment._id });
};

export const infoDeleteComment = async (req, res) => {
  const {
    body: { Id },
    params: { id },
  } = req;

  const infoWriting = await InfoWriting.findById(id);
  const comment = await Comment.findById(Id);

  infoWriting.comments.remove(comment._id);
  infoWriting.save();
  await Comment.findByIdAndDelete(Id);

  return res.sendStatus(201);
};

export const storyDeleteComment = async (req, res) => {
  const {
    body: { Id },
    params: { id },
  } = req;

  const storyWriting = await StoryWriting.findById(id);
  const comment = await Comment.findById(Id);

  storyWriting.comments.remove(comment._id);
  storyWriting.save();
  await Comment.findByIdAndDelete(Id);

  return res.sendStatus(201);
};

//heart

//search

export const infoSearch = async (req, res) => {
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

export const success = async (req, res) => {
  const { email, name, picture } = req.user._json;

  res.locals.photos = picture;
  res.locals.name = name;

  let user = await User.findOne({ email });
  console.log(user);
  if (!user) {
    console.log("No user");
    user = await User.create({
      avatarUrl: picture,
      name,
      email,
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};
export const fail = (req, res) => {
  return res.send("You Failed to log in!");
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

export const postEdit = async (req, res) => {
  const {
    session: {
      user: { _id, avatarUrl },
    },
    body: { name, email },
    file,
  } = req;
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      avatarUrl: file ? file.location : avatarUrl,
      name,
      email,
    },
    { new: true }
  );
  req.session.user = updatedUser;
  return res.redirect("/profile");
};

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
    const user = await User.findById(_id);
    user.infowWiting.push(newWriting._id);
    user.save();
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    //작성하는 장소로 이동시켜야함!
    return res.status(400).redirect("/infoUpload");
  }
};
export const storyPostUpload = async (req, res) => {
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
    return res.status(400).redirect("/stroyUpload");
  }
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

//mypage의 내가쓴 댓글

export const myComment = async (req, res) => {
  const { _id } = req.session;
  const comment = await Comment.find(_id);

  return res.send(comment);
};

//나의 전체글 보기

export const allSee = async (req, res) => {
  const { _id } = req.session;
  const infoWriting = await InfoWriting.find(_id);
  const storyWriting = await StoryWriting.find(_id);

  return req.send(infoWriting, storyWriting);
};
