import express from "express";
import passport from "passport"; 

const GithubRoute = express.Router();

GithubRoute.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

GithubRoute.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: `${process.env.CLIENT_URL}/login-failed`,
    successRedirect: process.env.CLIENT_URL,
  })
);

export default GithubRoute;
