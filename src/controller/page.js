import { Page } from "../model/detailSchema.js";

const newContent = async (req, res) => {
  const content = new Page(req.body);
  try {
    await content.save();
    res.send(content);
  } catch (e) {
    res.json({
      error: e,
    });
  }
};

const page = async (req, res) => {
  try {
    const page = await Page.find({});
    res.send(page);
  } catch (err) {
    res.json({
      error: err,
    });
  }
};

export { page, newContent };
