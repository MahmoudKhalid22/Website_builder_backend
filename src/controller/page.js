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
    res.json({ error: err.message });
  }
};

const deletePage = async (req, res) => {
  const pageId = req.params.id;
  const userId = req.user._id; 

  try {
    const deletedPage = await Page.findOneAndDelete({ _id: pageId, owner: userId });

    if (!deletedPage) {
      return res.status(404).json({ error: "Page not found or you are not authorized to delete it." });
    }

    res.json({ message: "Page deleted successfully", deletedPage });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const deleteUserPages = async (userId) => {
  try {
    await Page.deleteMany({ owner: userId });
    console.log("User's pages deleted successfully");
  } catch (err) {
    console.error("Error deleting user's pages:", err.message);
    throw err; 
  }
};

export { newPage, getPages, getPage, deletePage, deleteUserPages};
