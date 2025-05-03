import passport from "passport";
import { Strategy as TwitterStrategy } from "passport-twitter-oauth2";
import dotenv from "dotenv";

dotenv.config();

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user: Express.User, done) => done(null, user));

passport.use(
  new TwitterStrategy(
    {
      clientID: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
      callbackURL: process.env.TWITTER_CALLBACK_URL as string,
      scope: ["tweet.read", "users.read", "offline.access"],
    },
    (accessToken: string, refreshToken: string, profile: any, done: any) => {
      // Save or find the user in DB here
      return done(null, profile);
    }
  )
);

export default passport;
