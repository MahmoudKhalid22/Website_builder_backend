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
    res
      .status(201)
      .send({ message: "Your message has been sent successfully" });
  } catch (err) {
    res.status(500).send({ error: "internal server error" });
  }
};

const getMessages = async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    if (limit && (limit < 1 || limit > 100)) {
      return res
        .status(400)
        .send({ error: "Invalid limit. Must be between 1 and 100." });
    }

    const messages = await getAllMessages();
    if (!messages) {
      return res.status(200).send({ message: "there is no messages" });
    }

    // SORT MESSAGES FROM LATEST TO OLDEST
    messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const startIndex = req.query.offset || 0; // Use offset for retrieving specific number of messages
    const endIndex = Number(startIndex) + Number(limit);
    const paginatedMessages = messages.slice(startIndex, endIndex);

    res.send({ messages: paginatedMessages, total: messages.length });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

export { sendMessage, getMessages };
