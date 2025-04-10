
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

// User serialization/deserialization (without a database)
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: Express.User, done) => {
  done(null, user);
});

// Set up Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
      // Since we're not using a database, we'll just return the profile
      return done(null, profile);
    }
  )
);
