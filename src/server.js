import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";

import passport from "passport";

import backRouter from "./routers/backRouter.js";

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
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
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
    res.redirect("/success");
  }
);

app.use("/", backRouter);

app.listen(4000, () => console.log(`listening on port ${4000}!`));
