import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import Googlerouter from "./routes/googleRoute.js";
import GithubRoute from "./routes/githubRoute.js";
import ZohoRoute from "./routes/zohoRoute.js";

import './config/passport.js'
import './config/githubPassport.js'

dotenv.config();

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Session configuration
app.use(
  session({
    secret: "your-session-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", Googlerouter);
app.use("/auth", GithubRoute);
app.use("/auth/zoho", ZohoRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
