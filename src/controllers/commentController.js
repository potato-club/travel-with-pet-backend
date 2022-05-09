import User from "../models/User.js";
import InfoWriting from "../models/InfoWriting.js";
import StoryWriting from "../models/StoryWriting.js";
import StoryComment from "../models/StoryComment.js";
import InfoComment from "../models/InfoComment.js";
import InfoHeart from "../models/InfoHeart.js";
import StoryHeart from "../models/StoryHeart.js";

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
    let storycomment = storyWriting.commentCount;
    console.log(storycomment);

    const updatedCount = await StoryWriting.findByIdAndUpdate(
      id,
      {
        commentCount: storycomment + 1,
      },
      { new: true }
    );

    const comment = await StoryComment.create({
      text,
      owner: user._id,
      writingId: id,
    });
    storyWriting.comments.push(comment._id);
    storyWriting.save();
    //???
    return res.status(201).json({ newCommentId: comment._id });
  }
  let infocomment = infoWriting.commentCount;

  const updatedCount = await InfoWriting.findByIdAndUpdate(
    id,
    {
      commentCount: infocomment + 1,
    },
    { new: true }
  );
  const comment = await InfoComment.create({
    text,
    owner: user._id,
    writingId: id,
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
  let infocomment = infoWriting.commentCount;
  const comment = await InfoComment.findById(Id);

  const updatedCount = await InfoWriting.findByIdAndUpdate(
    id,
    {
      commentCount: infocomment - 1,
    },
    { new: true }
  );
  infoWriting.comments.remove(comment._id);
  infoWriting.save();
  await InfoComment.findByIdAndDelete(Id);

  return res.sendStatus(201);
};

export const storyDeleteComment = async (req, res) => {
  const {
    body: { Id },
    params: { id },
  } = req;

  const storyWriting = await StoryWriting.findById(id);
  let storycomment = storyWriting.commentCount;
  const comment = await StoryComment.findById(Id);

  const updatedCount = await InfoWriting.findByIdAndUpdate(
    id,
    {
      commentCount: storycomment - 1,
    },
    { new: true }
  );
  storyWriting.comments.remove(comment._id);
  storyWriting.save();
  await StoryComment.findByIdAndDelete(Id);

  return res.sendStatus(201);
};

//mypage의 내가쓴 댓글
//ok
export const infomyComment = async (req, res) => {
  const { _id } = req.session;
  const comment = await InfoComment.find(_id).populate("writingId");

  // const comment.infowriting

  return res.send(comment);
};
export const dailymyComment = async (req, res) => {
  const { _id } = req.session;
  const comment = await StoryComment.find(_id).populate("writingId");

  // const comment.infowriting

  return res.send(comment);
};

//heart 내가 좋아요한 글
export const myInfoHeart = async (req, res) => {
  const { _id } = req.session;

  const heartWriting = await InfoHeart.find()
    .in("owner", ["테스트", "ㅇ"])
    .populate("writingId");

  return res.send(heartWriting);
};
export const myStoryHeart = async (req, res) => {
  const { _id } = req.session;

  const heartWriting = await StoryHeart.find({ owner: _id }).populate(
    "writingId"
  );

  return res.send(heartWriting);
};
export const clickHeart = async (req, res) => {
  const {
    session: { user },
    params: { id },
  } = req;

  const infoWriting = await InfoWriting.findById(id);
  const storyWriting = await StoryWriting.findById(id);

  let createstoryheart;
  let createinfoheart;

  if (!infoWriting) {
    let storyheart = storyWriting.heart;
    const updatedcount = await StoryWriting.findByIdAndUpdate(
      id,
      {
        heart: storyheart + 1,
      },
      { new: true }
    );
    if (storyWriting.heart === 0) {
      createstoryheart = await StoryHeart.create({
        owner: user._id,
        writingId: id,
      });
      const updateHeart = await StoryHeart.findByIdAndUpdate(
        createstoryheart._id,
        {
          count: 1,
        }
      );
    } else {
      createstoryheart = await StoryHeart.find({ writingId: id });
      const updateHeart = await StoryHeart.findByIdAndUpdate(
        createstoryheart._id,
        {
          count: storyheart + 1,
        }
      );

      // createstoryheart.owner.push(user._id);
    }

    return res.redirect(`/writing/daily/${id}`);
  }
  let infoheart = infoWriting.heart;

  createinfoheart = await InfoHeart.find({ writingId: id });
  console.log(createinfoheart);
  console.log(createinfoheart[0]._id);

  console.log(`before ${createinfoheart.count}`);
  createinfoheart.count = infoheart + 1;
  console.log(`after ${createinfoheart.count}`);

  const updatedcount = await InfoWriting.findByIdAndUpdate(
    id,
    {
      heart: infoheart + 1,
    },
    { new: true }
  );

  console.log(createinfoheart[0].onwer == undefined);
  console.log(createinfoheart[0].onwer === undefined);

  if (createinfoheart[0].owner === undefined) {
    const updateHeart = await InfoHeart.findByIdAndUpdate(
      createinfoheart[0]._id,
      {
        owner: user._id,
      }
    );
    console.log(`undefined ${createinfoheart}`);
  } else {
    if (user._id in createinfoheart[0].onwer) {
    } else {
      createinfoheart[0].owner.push(user._id);
      createinfoheart.save();
    }
  }

  return res.redirect(`/writing/info/${id}`);
};
