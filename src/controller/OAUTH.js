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
      callbackURL: "https://websitebuilderbackend-production-716e.up.railway.app/user/auth/google/callback",
      // callbackURL: "http://localhost:5000/user/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          user.tokens = [{ accessToken, refreshToken }];
          user.accessToken = accessToken;
          user.refreshToken = refreshToken;
          await user.save();
          return done(null, user );
        } else {
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            verified: true,
            tokens: [{ accessToken, refreshToken }],
          });
          user.accessToken = accessToken;
          user.refreshToken = refreshToken;
          await user.save();
          return done(null, user);
        }
      } catch (err) {
        done(err);
      }
    }
  )
);


//       try {
//         const existingUser = await User.findOne({ googleId: profile.id });
//         console.log(existingUser);
//         if (existingUser) {
//           const accessToken = await user.generateAuthToken();
//           const refreshToken = await user.generateRefreshToken();
//           return done(null,{ existingUser, accessToken, refreshToken});
//         }
//         const user = new User({
//           name: profile.displayName,
//           email: profile.emails[0].value,
//           googleId: profile.id,
//           // avatar: profile.photos[0].value, 
//           verified: true,
//         });
//         await user.save();
//         const accessToken = await user.generateAuthToken();
//         const refreshToken = await user.generateRefreshToken();  
//         console.log(user);
//         return done(null,{ existingUser, accessToken, refreshToken});
//       } catch (err) {
//         done(err);
//       }
//     }
//   )
// );


passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
      callbackURL: "https://websitebuilderbackend-production-716e.up.railway.app/user/auth/facebook/callback",
      // callbackURL: "http://localhost:5000/user/auth/facebook/callback",

      profileFields: ['id', 'emails', 'name', "picture"],
    },

    async function (accessToken, refreshToken, profile, done) {
      console.log(accessToken);
      try {
        let user = await User.findOne({ facebookId: profile.id });
        if (user) {
          user.tokens = [{ accessToken, refreshToken }];
          user.accessToken = accessToken;
          user.refreshToken = refreshToken;
          await user.save();
          return done(null, user);
        } else {
          user = new User({
            name: profile.name.givenName + " " + profile.name.familyName,
            email: profile.emails ? profile.emails[0].value : "",
            facebookId: profile.id,
            // avatar: profile.photos[0].value,
            verified: true,
            tokens: [{ accessToken, refreshToken }],
          });
          user.accessToken = accessToken;
          user.refreshToken = refreshToken;
          await user.save();
          return done(null, user);
        }
      } catch (err) {
        done(err);
      }
    }
  )
);






//     async function (accessToken, refreshToken, profile, cb) {
//       console.log(accessToken,refreshToken);
//       try {
//         const existingUser = await User.findOne({ facebookId: profile.id });
//         if (existingUser) {
//           const accessToken = await user.generateAuthToken();
//           const refreshToken = await user.generateRefreshToken();
//           console.log(accessToken,refreshToken);
//           return cb(null,{ existingUser, accessToken, refreshToken});
//         }
//         const user = new User({
//           name: profile.name.givenName + " " + profile.name.familyName,
//           email: profile.emails ? profile.emails[0].value : "",
//           facebookId: profile.id,
//           avatar: profile.photos[0].value, 
//           verified: true
//         });
//         await user.save();
//         const accessToken = await user.generateAuthToken();
//         const refreshToken = await user.generateRefreshToken();
//         return cb(null,{ existingUser, accessToken, refreshToken});
//       } catch (err) {
//         cb(err);
//       }
//       console.log(accessToken,refreshToken);
//     }
//   )
// );



passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});


// passport.serializeUser(function(user, callback) {
//   callback(null, user);
// });

// passport.deserializeUser(function(user, callback) {
//   callback(null, user);
// });

