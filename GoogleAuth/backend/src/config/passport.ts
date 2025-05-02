import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";

dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: Express.User, done) => {
  done(null, user);
});

// Check if required environment variables are set
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.error(
    "ERROR: Missing Google OAuth credentials in environment variables!"
  );
  console.error(
    "Make sure GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are set in your .env file"
  );
}

// Set up Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.SERVER_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      // Since we're not using a database, we'll just return the profile
      return done(null, profile);
    }
  )
);
