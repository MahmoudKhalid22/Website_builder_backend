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

    res.json({ message: "Page deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
const updatePage = async (req, res) => {
  try {
    // Validate pageId, userId, and request body data
    // const { error } = validateUpdateRequest(req.body);
    // if (error) return res.status(400).json({ error: error.message });

    const { pageId } = req.params;
    const userId = req.user._id;

    const updateObject = { $set: {} };
    const fieldsToUpdate = [
      'navBar',
      'hero',
      'services',
      'feature',
      'testimonial',
      'logos',
      'projects',
      'statistic',
      'items',
      'team',
      'pricing',
      'cta',
      'footer'];

    fieldsToUpdate.forEach(field => {
      if (req.body.hasOwnProperty(field)) {
        updateObject.$set[field] = sanitizeData(req.body[field]); // Clean user-provided data
      }
    });

    const updatedPage = await Page.findOneAndUpdate(
      { _id: pageId, owner: userId },
      updateObject,
      { new: true }
    );

    if (!updatedPage) {
      return res.status(404).json({ error: 'Page not found or unauthorized access' });
    }

    res.json({ message: 'Page updated successfully', updatedPage });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// // Implement validation function (replace with your validation logic)
// function validateUpdateRequest(requestBody) {
//   // ... validation logic ...
// }

// Implement data sanitization function (replace with your sanitization logic)
function sanitizeData(data) {
  // ... data cleaning logic ...
}


const deleteUserPages = async (userId, res) => {
  try {
    await Page.deleteMany({ owner: userId });
    console.log("User's pages deleted successfully");
    res.json({ message: "User's pages deleted successfully" });
  } catch (err) {
    console.error("Error deleting user's pages:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export { newPage, getPages, getPage , updatePage, deletePage, deleteUserPages };
