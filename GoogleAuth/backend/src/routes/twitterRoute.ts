import express from "express";
import passport from "passport";

const TwitterRoute = express.Router();

// Redirect to Twitter login
TwitterRoute.get("/login", passport.authenticate("twitter-oauth2"));

// Callback after Twitter login
TwitterRoute.get(
  "/callback",
  passport.authenticate("twitter-oauth2", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect("/profile");
  }
);

export default TwitterRoute;
