// ./config/passport.js
import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import dotenv from "dotenv";

dotenv.config();

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj: Express.User, done) => done(null, obj));

// Check if required environment variables are set
if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
  console.error(
    "ERROR: Missing github OAuth credentials in environment variables!"
  );
  console.error(
    "Make sure github_CLIENT_ID and github_CLIENT_SECRET are set in your .env file"
  );
}

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      callbackURL: process.env.GITHUB_CALLBACK_URL as string,
    },
    (accessToken: any, refreshToken: any, profile: any, done: any) => {
      // Since we're not using a database, we'll just return the profile
      return done(null, profile);
    }
  )
);

export default passport;
