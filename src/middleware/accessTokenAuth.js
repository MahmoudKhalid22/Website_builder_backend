// import jwt from "jsonwebtoken";
// import { User } from "../model/userModel.js";
// import { tokenValidation } from "./user.model.validation.js";

// const auth = async (req, res, next) => {
//   try {
//     const accessToken = req.header("Authorization").replace("Bearer ", "");

//     const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
//     const user = await User.findOne({
//       _id: decoded._id,
//       "tokens.accessToken": accessToken,
//     });

//     if (!user) throw new Error();

//     req.accessToken = accessToken;
//     req.user = user;

//     next();
//   } catch (e) {
//     res.status(401).send({ error: "please Authenticate" });
//   }
// };
// export { auth };




import jwt from 'jsonwebtoken';
import { User } from '../model/userModel.js';
import axios from 'axios';
import { OAuth2Client } from 'google-auth-library';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = "https://websitebuilderbackend-production-716e.up.railway.app/user/auth/google/callback";

// Function to verify Google access token
async function verifyGoogleToken(accessToken) {
  try {
    const response = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`);
    return response.data;
  } catch (error) {
    throw new Error('Invalid Google access token');
  }
}

// Function to verify Facebook access token
async function verifyFacebookToken(accessToken) {
  try {
    const response = await axios.get(`https://graph.facebook.com/me?access_token=${accessToken}`);
    return response.data;
  } catch (error) {
    throw new Error('Invalid Facebook access token');
  }
}

const auth = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  try {
    let user;

    if (token.startsWith('ya29.')) { // Assuming Google access tokens start with 'ya29.'
      // Handle Google access token
      try {
        const googleUser = await verifyGoogleToken(token);
        user = await User.findOne({ googleId: googleUser.sub });

        if (!user) {
          throw new Error('User not found');
        }
      } catch (error) {
        // If Google access token is invalid, try to refresh it
        user = await User.findOne({ 'tokens.accessToken': token });

        if (!user) {
          throw new Error('User not found');
        }

        // Refresh the Google access token
        const newAccessToken = await refreshGoogleToken(user);
        req.token = newAccessToken;
      }
    } else if (token.startsWith('EA')) { // Assuming Facebook access tokens start with 'EA'
      // Handle Facebook access token
      try {
        const facebookUser = await verifyFacebookToken(token);
        user = await User.findOne({ facebookId: facebookUser.id });

        if (!user) {
          throw new Error('User not found');
        }
      } catch (error) {
        throw new Error('Invalid Facebook access token');
      }
    } else {
      // Handle your JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      user = await User.findOne({ _id: decoded._id, 'tokens.accessToken': token });

      if (!user) {
        throw new Error('User not found');
      }
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate' });
  }
};

export { auth };

