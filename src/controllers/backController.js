export const home = (req, res) => {
  return res.send("Home");
};
export const success = async (req, res) => {
  return res.send(`Hi ${req.user.displayName}`);
};
export const fail = (req, res) => {
  return res.send("You Failed to log in!");
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};
