import { mongoose, Schema, model } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
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
      required: true,
      min: 6,
    },
    verified: {
      type: Boolean,
      default: false,
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
  }
);

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.verified;

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error("Email is not found");
  if (!user.verified) throw new Error("You must verify your account");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("No valid password");
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
