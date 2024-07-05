import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    readed: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

messageSchema.methods.toJSON = function () {
  const message = this;
  const messageObj = message.toObject();

  delete messageObj.updatedAt;
  delete messageObj.__v;

  return messageObj;
};

const Message = mongoose.model("Message", messageSchema);
export default Message;
