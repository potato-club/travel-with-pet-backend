import User from "../models/User.js";
import InfoWriting from "../models/InfoWriting.js";
import StoryWriting from "../models/StoryWriting.js";
import Comment from "../models/Comment.js";

//메인페이지("/")
//카테고리별로 (여행, 음식점, 숙소, 기타)
//->사진, 내용, 태그, 지역,, 작성자, 작성일, 하트수

//comment
//ok
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
      dailywriting: id,
    });
    storyWriting.comments.push(comment._id);
    storyWriting.save();
    //???
    return res.status(201).json({ newCommentId: comment._id });
  }
  const comment = await Comment.create({
    text,
    owner: user._id,
    infowriting: id,
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

//mypage의 내가쓴 댓글
//ok
export const infomyComment = async (req, res) => {
  const { _id } = req.session;
  const comment = await Comment.find(_id).populate("infowriting");

  // const comment.infowriting

  return res.send(comment);
};
export const dailymyComment = async (req, res) => {
  const { _id } = req.session;
  const comment = await Comment.find(_id).populate("dailywriting");

  // const comment.infowriting

  return res.send(comment);
};
//heart 내가 좋아요한 글
export const myHeart = async (req, res) => {
  const { _id } = req.session;
  const comment = await Comment.find(_id);

  return res.send(comment);
};
