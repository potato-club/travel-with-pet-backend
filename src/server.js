import express from "express";
import dotenv from "dotenv";
import passport from "passport";

import backRouter from "./routers/backRouter.js";

import "./passport.js";
import "./db.js";

const app = express();

dotenv.config();

app.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/fail" }),
  function (req, res) {
    res.redirect("/success");
  }
);

app.use("/", backRouter);

app.listen(4000, () => console.log(`listening on port ${4000}!`));
