import { mongoose, Schema, model } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Page } from "./pageModel.js";

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
      type: Buffer,
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
        token: {
          type: String,
          required: true,
        },
      },
    ],
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

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};
userSchema.methods.generateRefreshToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString() },
    process.env.REFRESH_TOKEN_SECRET_KEY,
    { expiresIn: "30d" }
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};
userSchema.methods.generateResetPasswordToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString() },
    process.env.PASSWORD_TOKEN,
    { expiresIn: "1h" }
  );
  user.tokens = user.tokens.concat({ token });
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

const User = new mongoose.model("User", userSchema);

export { User };
