import { Page } from "../model/pageModel.js";

const newPage = async (req, res) => {
  try {
    const page = new Page({ ...req.body, owner: req.user._id });
    const savedPage = await page.save();
    res.json({ message: "Page created successfully", savedPage });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getPage = async (req, res) => {
  const pageId = req.params.id;
  const userId = req.user;
  try {
    const page = await Page.findOne({ _id: pageId, owner: userId });
    res.send(page);
  } catch (err) {
    res.json({ error: err.message });
  }
};

const getPages = async (req, res) => {
  const userId = req.user;
  try {
    const { _id } = userId;
    const pages = await Page.find({ owner: _id });

    res.send(pages);
  } catch (err) {
    res.json({
      error: err.message,
    });
  }
};

export { newPage, getPages, getPage };
