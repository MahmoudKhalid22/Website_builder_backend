import { saveInDB, getAllMessages } from "../db/dbQuires.js";
import Message from "../model/message.js";

const sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).send({
        error:
          "please enter the requirements your email, your name, and the message",
      });
    }
    const msg = new Message(req.body);
    await saveInDB(msg);
    res.send({ message: "Your message has been sent successfully" });
  } catch (err) {
    res.status(500).send({ error: "internal server error" });
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await getAllMessages();

    if (!messages) {
      return res.status(200).send({ message: "there is no messages" });
    }
    messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.send({ messages });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

export { sendMessage, getMessages };
