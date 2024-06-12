import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { User } from "../model/userModel.js";

jest.mock("passport");
jest.mock("../model/userModel.js");

describe("Passport Strategies", () => {
    const mockGoogleProfile = {
        id: "google123",
        displayName: "Google User",
        emails: [{ value: "googleuser@example.com" }],
    };

    const mockFacebookProfile = {
        id: "facebook123",
        name: { givenName: "Facebook", familyName: "User" },
    };

    beforeAll(() => {
        passport.use = jest.fn();
        passport.serializeUser = jest.fn();
        passport.deserializeUser = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("Google Strategy", () => {
        it("should authenticate with Google and return user with tokens", async () => {
            User.findOne.mockResolvedValueOnce(null);
            const mockSave = jest.fn().mockResolvedValueOnce({
                generateAuthToken: jest.fn().mockResolvedValueOnce("accessToken123"),
                generateRefreshToken: jest.fn().mockResolvedValueOnce("refreshToken123"),
            });
            User.mockImplementation(() => ({
                save: mockSave,
            }));

            const done = jest.fn();
            const strategy = new GoogleStrategy(
                {
                    clientID: "GOOGLE_CLIENT_ID",
                    clientSecret: "GOOGLE_CLIENT_SECRET",
                    callbackURL: "https://zweb.nqfq.onrender.com/user/auth/google/callback",
                    passReqToCallback: true,
                },
                async (request, accessToken, refreshToken, profile, done) => {
                    try {
                        const existingUser = await User.findOne({ googleId: profile.id });
                        if (existingUser) {
                            const accessToken = await user.generateAuthToken();
                            const refreshToken = await user.generateRefreshToken();
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
                        return done(null, { existingUser, accessToken, refreshToken });
                    } catch (err) {
                        done(err);
                    }
                }
            );

            await strategy._verify(null, null, null, mockGoogleProfile, done);
            expect(done).toHaveBeenCalledWith(null, {
                existingUser: undefined,
                accessToken: "accessToken123",
                refreshToken: "refreshToken123",
            });
        });
    });

    describe("Facebook Strategy", () => {
        it("should authenticate with Facebook and return user with tokens", async () => {
            User.findOne.mockResolvedValueOnce(null);
            const mockSave = jest.fn().mockResolvedValueOnce({
                generateAuthToken: jest.fn().mockResolvedValueOnce("accessToken123"),
                generateRefreshToken: jest.fn().mockResolvedValueOnce("refreshToken123"),
            });
            User.mockImplementation(() => ({
                save: mockSave,
            }));

            const cb = jest.fn();
            const strategy = new FacebookStrategy(
                {
                    clientID: "FACEBOOK_CLIENT_ID",
                    clientSecret: "FACEBOOK_CLIENT_SECRET",
                    callbackURL: "/user/facebook",
                    profileFields: ["name", "picture"],
                },
                async (accessToken, refreshToken, profile, cb) => {
                    try {
                        const existingUser = await User.findOne({ facebookId: profile.id });
                        if (existingUser) {
                            const accessToken = await user.generateAuthToken();
                            const refreshToken = await user.generateRefreshToken();
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
                        return cb(null, { existingUser, accessToken, refreshToken });
                    } catch (err) {
                        cb(err);
                    }
                }
            );

            await strategy._verify(null, null, null, mockFacebookProfile, cb);
            expect(cb).toHaveBeenCalledWith(null, {
                existingUser: undefined,
                accessToken: "accessToken123",
                refreshToken: "refreshToken123",
            });
        });
    });
});
