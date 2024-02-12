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
          return done(null, existingUser);
        }
        const user = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
          verified: true,
        });
        await user.save();
        done(null, user);
      } catch (err) {
        console.log(err);
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
      callbackURL: "/user/facebook",
      profileFields: ["name", "picture"],
    },
    async function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      try {
        const existingUser = await User.findOne({ facebookId: profile.id });
        if (existingUser) {
          return cb(null, existingUser);
        }
        const user = new User({
          name: profile.name.givenName + " " + profile.name.familyName,
          facebookId: profile.id,
          verified: true,
        });
        await user.save();
        cb(null, user);
      } catch (err) {
        console.log(err);
        cb(err);
      }
    }
  )
);


passport.serializeUser(function(user, callback) {
  callback(null, user);
});

passport.deserializeUser(function(user, callback) {
  callback(null, user);
});
