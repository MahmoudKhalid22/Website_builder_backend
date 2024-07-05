import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { User } from "../model/userModel";

jest.mock("../model/userModel");

describe("Passport Strategies", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Google Strategy", () => {
    const googleStrategyOptions = {
      clientID: "google-client-id",
      clientSecret: "google-client-secret",
      callbackURL: "https://zweb.nqfq.onrender.com/user/auth/google/callback",
      passReqToCallback: true,
    };

    test("should create a new user if not found", async () => {
      const profile = {
        id: "google-user-id",
        displayName: "John Doe",
        emails: [{ value: "john@example.com" }],
      };

      User.findOne.mockResolvedValue(null);
      const mockSave = jest.fn().mockResolvedValueOnce();
      User.mockReturnValueOnce({ save: mockSave });

      const done = jest.fn((error, user) => {
        if (error) throw error;
        return user;
      });

      const googleStrategy = new GoogleStrategy(
        googleStrategyOptions,
        async (_, __, ___, profile, done) => {
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
      );

      await googleStrategy._verify(null, null, null, profile, done);
      const result = done.mock.calls[0][1];

      expect(result.user).toEqual(
        expect.objectContaining({
          name: "John Doe",
          email: "john@example.com",
          googleId: "google-user-id",
          verified: true,
        })
      );
      expect(result.accessToken).toBe("access-token");
      expect(result.refreshToken).toBe("refresh-token");
    });

    test("should return an existing user if found", async () => {
      const profile = {
        id: "google-user-id",
        displayName: "John Doe",
        emails: [{ value: "john@example.com" }],
      };

      const existingUser = {
        _id: "user-id",
        name: "John Doe",
        email: "john@example.com",
        googleId: "google-user-id",
        verified: true,
        generateAuthToken: jest.fn().mockResolvedValue("access-token"),
        generateRefreshToken: jest.fn().mockResolvedValue("refresh-token"),
      };
      User.findOne.mockResolvedValue(existingUser);

      const done = jest.fn((error, user) => {
        if (error) throw error;
        return user;
      });

      const googleStrategy = new GoogleStrategy(
        googleStrategyOptions,
        async (_, __, ___, profile, done) => {
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
      );

      await googleStrategy._verify(null, null, null, profile, done);
      const result = done.mock.calls[0][1];

      expect(result.existingUser).toEqual(
        expect.objectContaining(existingUser)
      );
      expect(result.accessToken).toBe("access-token");
      expect(result.refreshToken).toBe("refresh-token");
    });
  });

  describe("Facebook Strategy", () => {
    const facebookStrategyOptions = {
      clientID: "facebook-client-id",
      clientSecret: "facebook-client-secret",
      callbackURL: "/user/facebook",
      profileFields: ["name", "picture"],
    };

    test("should create a new user if not found", async () => {
      const profile = {
        id: "facebook-user-id",
        name: {
          givenName: "John",
          familyName: "Doe",
        },
      };

      User.findOne.mockResolvedValue(null);
      const mockSave = jest.fn().mockResolvedValueOnce();
      User.mockReturnValueOnce({ save: mockSave });

      const done = jest.fn((error, user) => {
        if (error) throw error;
        return user;
      });
      const facebookStrategy = new FacebookStrategy(
        facebookStrategyOptions,
        async (_, __, profile, done) => {
          try {
            const existingUser = await User.findOne({ facebookId: profile.id });
            if (existingUser) {
              const accessToken = await existingUser.generateAuthToken();
              const refreshToken = await existingUser.generateRefreshToken();
              return done(null, { existingUser, accessToken, refreshToken });
            }
            const user = new User({
              name: profile.name.givenName + " " + profile.name.familyName,
              facebookId: profile.id,
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
      );

      await facebookStrategy._verify(null, null, profile, done);
      const result = done.mock.calls[0][1];

      expect(result.user).toEqual(
        expect.objectContaining({
          name: "John Doe",
          facebookId: "facebook-user-id",
          verified: true,
        })
      );
      expect(result.accessToken).toBe("access-token");
      expect(result.refreshToken).toBe("refresh-token");
    });

    test("should return an existing user if found", async () => {
      const profile = {
        id: "facebook-user-id",
        name: {
          givenName: "John",
          familyName: "Doe",
        },
      };

      const existingUser = {
        _id: "user-id",
        name: "John Doe",
        facebookId: "facebook-user-id",
        verified: true,
        generateAuthToken: jest.fn().mockResolvedValue("access-token"),
        generateRefreshToken: jest.fn().mockResolvedValue("refresh-token"),
      };
      User.findOne.mockResolvedValue(existingUser);

      const done = jest.fn((error, user) => {
        if (error) throw error;
        return user;
      });

      const facebookStrategy = new FacebookStrategy(
        facebookStrategyOptions,
        async (_, __, profile, done) => {
          try {
            const existingUser = await User.findOne({ facebookId: profile.id });
            if (existingUser) {
              const accessToken = await existingUser.generateAuthToken();
              const refreshToken = await existingUser.generateRefreshToken();
              return done(null, { existingUser, accessToken, refreshToken });
            }
            const user = new User({
              name: profile.name.givenName + " " + profile.name.familyName,
              facebookId: profile.id,
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
      );

      await facebookStrategy._verify(null, null, profile, done);
      const result = done.mock.calls[0][1];

      expect(result.existingUser).toEqual(
        expect.objectContaining(existingUser)
      );
      expect(result.accessToken).toBe("access-token");
      expect(result.refreshToken).toBe("refresh-token");
    });
  });
});
