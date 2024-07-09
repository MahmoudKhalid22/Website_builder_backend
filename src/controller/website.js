import { WebSite } from "../model/website.js";

const newWebsite = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      return res
        .status(400)
        .send({ error: "admin is not authorized to create page" });
    }
    if (req.user.status === "blocked") {
      return res.status(400).send({ error: "user is blocked" });
    }
    const page = new WebSite({ ...req.body, owner: req.user._id });
    const savedPage = await page.save();
    res
      .status(201)
      .json({
        message: "Your website has been created successfully",
        savedPage,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getWebsite = async (req, res) => {
  const pageId = req.params.pageId;

  const userId = req.params.userId;
  try {
    const page = await WebSite.findOne({ _id: pageId, owner: userId });
    if (!page) {
      return res.status(404).send({ error: "the page isn't found" });
    }
    res.send(page);
  } catch (err) {
    res.json({ error: err.message });
  }
};

const getWebsites = async (req, res) => {
  const userId = req.user;
  try {
    const { _id } = userId;
    const pages = await WebSite.find({ owner: _id });
    const result = [];
    pages.map((page) =>
      result.push({
        _id: page._id,
        templateInfo: page.templateInfo,
      })
    );
    res.send({ pages: result });
  } catch (err) {
    res.json({ error: err.message });
  }
};

const deleteWebsite = async (req, res) => {
  const pageId = req.params.id;
  const userId = req.user._id;

  try {
    if (req.user.status === "blocked") {
      return res.status(400).send({ error: "user is blocked" });
    }
    const deletedPage = await WebSite.findOneAndDelete({
      _id: pageId,
      owner: userId,
    });

    if (!deletedPage) {
      return res.status(404).json({
        error: "Page not found or you are not authorized to delete it.",
      });
    }

    res.json({ message: "Page has been deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const updateWebsite = async (req, res) => {
  try {
    if (req.user.status === "blocked") {
      return res.status(400).send({ error: "user is blocked" });
    }
    const pageId = req.params.id;
    const userId = req.user._id;

    const updates = Object.keys(req.body);

    const fieldsToUpdate = [
      "templateInfo",
      "navbar",
      "hero",
      "services",
      "features",
      "testimonials",
      "logos",
      "projects",
      "statistics",
      "items",
      "team",
      "pricing",
      "cta",
      "contact",
      "blogs",
      "header",
      "reservation",
      "about",
      "gallery",
      "offers",
      "reviews",
      "products",
      "footer",
      "colors",
    ];

    const isValidUpdates = updates.every((update) =>
      fieldsToUpdate.includes(update)
    );

    if (!isValidUpdates) {
      return res.status(400).send({ error: "No valid updates" });
    }

    const page = await WebSite.findOne({
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

const deleteUserWebsite = async (req, res) => {
  try {
    const userId = req.params.userId;
    await WebSite.deleteMany({ owner: userId }, { new: true });
    res.json({ message: "User's pages have been deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export {
  newWebsite,
  getWebsites,
  getWebsite,
  updateWebsite,
  deleteWebsite,
  deleteUserWebsite,
};
