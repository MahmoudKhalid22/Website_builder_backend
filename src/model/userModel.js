import { mongoose, Schema, model } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Page } from "./pageModel.js";
// import { type } from "os";
// import { string } from "joi";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
    },
    email: {
      type: String,
      required: function () {
        return !this.facebookId;
      },
      unique: true,
      validate: {
        validator: function (value) {
          if (!validator.isEmail(value)) {
            throw new Error("email is not valid");
          }
        },
      },
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId && !this.facebookId;
      },
      min: 6,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin", "super-admin", "premium"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["blocked", "active"],
      default: "active",
    },
    googleId: {
      type: String,
    },
    facebookId: {
      type: String,
    },
    tokens: [
      {
        accessToken: {
          type: String,
          // required: true,
        },
        refreshToken: {
          type: String,
          // required: true,
        },
      },
    ],
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

userSchema.virtual("pages", {
  ref: "Page",
  localField: "_id",
  foreignField: "owner",
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.verified;
  delete userObject.__v;
  delete userObject.avatar;

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const accessToken = jwt.sign(
    { _id: user._id.toString() },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  user.tokens.push({ accessToken, refreshToken: null });
  await user.save();
  return accessToken;
};

userSchema.methods.generateRefreshToken = async function () {
  const user = this;
  const refreshToken = jwt.sign(
    { _id: user._id.toString() },
    process.env.REFRESH_TOKEN_SECRET_KEY,
    {
      expiresIn: "30d",
    }
  );
  // Find and update refreshToken
  const token = user.tokens.find((token) => token.refreshToken === null);
  if (token) {
    token.refreshToken = refreshToken;
  } else {
    user.tokens.push({ refreshToken });
  }
  await user.save();
  return refreshToken;
};

userSchema.methods.generateResetPasswordToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString() },
    process.env.PASSWORD_TOKEN,
    { expiresIn: "1h" }
  );
  user.resetPasswordToken = token;
  await user.save();
  return token;
};

userSchema.statics.findByEmail = async function ({ email }) {
  return this.findOne({ email });
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error("No valid credentials");
  if (!user.verified) throw new Error("You must verify your account");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("No valid credentials");
  return user;
};

// HASH PASSWORD BEFORE SAVING IT
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
    next();
  }
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.post("deleteOne", async function (next) {
  await Page.deleteMany({ ownerId: this._id });
});

const User = new mongoose.model("User", userSchema);

export { User };
