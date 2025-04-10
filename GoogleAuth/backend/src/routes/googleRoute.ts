import express from "express";
import passport from "passport"; 

const Googlerouter = express.Router();

Googlerouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

Googlerouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}/login-failed`,
    successRedirect: process.env.CLIENT_URL,
  })
);

export default Googlerouter;
