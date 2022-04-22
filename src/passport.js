import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import dotenv from "dotenv";

dotenv.config();

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:4000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);
