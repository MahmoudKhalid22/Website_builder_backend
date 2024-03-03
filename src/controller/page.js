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

const updatePage = async (req, res) => {
  try {
    const { pageId } = req.params;
    const userId = req.user._id;

    const fieldsToUpdate = [
      'navBar', 'hero', 'services', 'feature', 'testimonial', 'logos', 
      'projects', 'statistic', 'items', 'team', 'pricing', 'cta', 'footer'
    ];

    const updateObject = {};
    fieldsToUpdate.forEach(field => {
      if (req.body.hasOwnProperty(field)) {
        updateObject[field] = req.body[field];
      }
    });

    console.log(updateObject);

    const updatedPage = await Page.updateOne(
      { _id: pageId, owner: userId }, 
      {$set:{updateObject}}, 
      { new: true }
    );

    if (!updatedPage) {
      return res.status(404).json({ error: 'Page not found or unauthorized access' });
    }
    
    res.json({ message: 'Page updated successfully', updatedPage });
    console.log(updatedPage);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export { newPage, getPages, getPage , updatePage };
