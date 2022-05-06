import User from "../models/User.js";
import InfoWriting from "../models/InfoWriting.js";
import StoryWriting from "../models/StoryWriting.js";
import Comment from "../models/Comment.js";
import { reset } from "nodemon";

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

export const allSee = async (req, res) => {
  const { _id } = req.session;
  const infoWriting = await InfoWriting.find(_id);
  const storyWriting = await StoryWriting.find(_id);

  return res.send(infoWriting, storyWriting);
};
