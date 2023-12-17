import { mongoose, Schema, model } from "mongoose";
import validator from "validator";

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
      min: 5,
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

const User = new mongoose.model("User", userSchema);

export { User };
