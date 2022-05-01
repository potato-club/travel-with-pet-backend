import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";

import passport from "passport";

import commentRouter from "./routers/commentRouter.js";
import userRouter from "./routers/userRouter.js";
import writingRouter from "./routers/writingRouter.js";

import { localsMiddleware } from "./middleware.js";
import "./passport.js";
import "./db.js";

const app = express();

dotenv.config();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);
app.use((req, res, next) => {
  res.header("Cross-Origin-Embedder-Policy", "credentialless");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  next();
});

app.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/fail" }),
  function (req, res) {
    res.redirect("/users/login/success");
  }
);

app.use("/", home);

const home = (req, res) => {
  console.log(req.session);
  return res.send(req.user.name);
};

app.use("/comment", commentRouter);
app.use("/users", userRouter);
app.use("/writing", writingRouter);

app.listen(4000, () => console.log(`listening on port ${4000}!`));
