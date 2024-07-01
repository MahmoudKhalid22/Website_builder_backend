import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { User } from "../model/userModel.js";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID;
const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/user/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
          const accessToken = await existingUser.generateAuthToken();
          const refreshToken = await existingUser.generateRefreshToken();
          return done(null, { existingUser, accessToken, refreshToken });
        }
        const user = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
          verified: true,
        });
        await user.save();
        const accessToken = await user.generateAuthToken();
        const refreshToken = await user.generateRefreshToken();
        return done(null, { user, accessToken, refreshToken });
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/user/auth/facebook/callback",
      profileFields: ["id", "emails", "name"],
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        const existingUser = await User.findOne({ facebookId: profile.id });
        if (existingUser) {
          const accessToken = await existingUser.generateAuthToken();
          const refreshToken = await existingUser.generateRefreshToken();
          return cb(null, { existingUser, accessToken, refreshToken });
        }
        const user = new User({
          name: profile.name.givenName + " " + profile.name.familyName,
          facebookId: profile.id,
          verified: true,
        });
        await user.save();
        const accessToken = await user.generateAuthToken();
        const refreshToken = await user.generateRefreshToken();
        return cb(null, { user, accessToken, refreshToken });
      } catch (err) {
        cb(err);
      }
    }
  )
);

passport.serializeUser((user, callback) => {
  callback(null, user);
});

passport.deserializeUser((user, callback) => {
  callback(null, user);
});
