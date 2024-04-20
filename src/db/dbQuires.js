import Message from "../model/message.js";

const saveInDB = async (item) => {
  await item.save();
  return item;
};

const getAllMessages = async () => {
  const messages = await Message.find({});
  return messages;
};

export { saveInDB, getAllMessages };
