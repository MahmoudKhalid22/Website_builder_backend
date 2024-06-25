import { Page } from "../model/pageModel.js";

const newPage = async (req, res) => {
  try {
    const page = new Page({ ...req.body, owner: req.user._id });
    const savedPage = await page.save();
    res.json({ message: "Page created successfully", savedPage });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    const result = [];
    pages.map((page) =>
      result.push({
        _id: page._id,
        title: page.title,
      })
    );
    res.send({ pages: result });
  } catch (err) {
    res.json({ error: err.message });
  }
};

const deletePage = async (req, res) => {
  const pageId = req.params.id;
  const userId = req.user._id;

  try {
    const deletedPage = await Page.findOneAndDelete({
      _id: pageId,
      owner: userId,
    });

    if (!deletedPage) {
      return res.status(404).json({
        error: "Page not found or you are not authorized to delete it.",
      });
    }

    res.json({ message: "Page deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const updatePage = async (req, res) => {
  try {
    const pageId = req.params.id;
    const userId = req.user._id;

    const updateObject = { $set: {} };
    const fieldsToUpdate = [
      "navBar",
      "hero",
      "services",
      "feature",
      "testimonials",
      "logos",
      "projects",
      "statistic",
      "items",
      "team",
      "pricing",
      "cta",
      "footer",
      "colors",
    ];

    const isValidUpdates = updates.every((update) =>
      fieldsToUpdate.includes(update)
    );

    if (!isValidUpdates) {
      res.status(400).send({ error: "No valid updates" });
    }

    const page = await Page.findOne({
      _id: pageId,
      owner: userId,
    });
    if (!page) {
      res.status(404).send({ error: "the page is not found" });
    }

    updates.forEach((update) => {
      page[update] = req.body[update];
    });
    await page.save();
    res.send({ message: "page has been updated sucessfully", page });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteUserPages = async (req, res) => {
  try {
    const userId = req.params.userId;
    await Page.deleteMany({ owner: userId }, { new: true });
    res.json({ message: "User's pages have been deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { newPage, getPages, getPage, updatePage, deletePage, deleteUserPages };
