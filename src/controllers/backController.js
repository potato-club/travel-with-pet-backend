import User from "../models/User.js";

export const home = (req, res) => {
  return res.send("Home");
};
export const success = async (req, res) => {
  const { email, name, picture } = req.user._json;

  res.locals.photos = picture;
  res.locals.name = name;

  let user = await User.findOne({ email });
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
