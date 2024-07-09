import jwt from "jsonwebtoken";
import { User } from "../model/userModel.js";
import { tokenValidation } from "./user.model.validation.js";

const authRefreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.header("Authorization").replace("Bearer ", "");

    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY
    );

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.refreshToken": refreshToken,
    });

    if (!user) throw new Error();

    req.refreshToken = refreshToken;
    req.user = user;

    next();
  } catch (e) {
    res.status(401).send({ error: e.message });
  }
};

export { authRefreshToken };





// import { OAuth2Client } from 'google-auth-library';

// const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
// const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
// const REDIRECT_URI = "https://websitebuilderbackend-production-716e.up.railway.app/user/auth/google/callback";

// const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// async function refreshGoogleToken(user) {
//   try {
//     oAuth2Client.setCredentials({
//       refresh_token: user.tokens.refreshToken,
//     });
    
//     const res = await oAuth2Client.refreshAccessToken();
//     const newAccessToken = res.credentials.access_token;
//     const newRefreshToken = res.credentials.refresh_token || user.tokens.refreshToken; // If a new refresh token is provided, use it

//     // Update user tokens in the database
//     user.tokens = {
//       accessToken: newAccessToken,
//       refreshToken: newRefreshToken,
//     };
//     await user.save();

//     return newAccessToken;
//   } catch (error) {
//     console.error('Error refreshing Google access token:', error);
//     throw new Error('Unable to refresh Google access token');
//   }
// }

// export { refreshGoogleToken };





