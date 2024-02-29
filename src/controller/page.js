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

const updatePage =async (req, res) => {
  try {
      const { pageId } = req.params; // Assuming you have a ':pageId' parameter in the URL path
      const userId = req.user._id; // Extract user ID from authenticated user
      
      // Validate pageId and userId (add validation logic)
    const arr = [];
      const updateObject = {}; // Object to hold fields for update
      if (req.body.hasOwnProperty('navBar')) { 
          updateObject.navBar = req.body.navBar;
      }
      if (req.body.hasOwnProperty('hero')) { 
          updateObject.hero = req.body.hero;
      }
      
      if (req.body.hasOwnProperty('services')) { 
          updateObject.services = req.body.services;
      }
      
      if (req.body.hasOwnProperty('feature')) { 
          updateObject.feature = req.body.feature;
      }
      
      if (req.body.hasOwnProperty('testimonial')) { 
          updateObject.testimonial = req.body.testimonial;
      }
      
      if (req.body.hasOwnProperty('logos')) { 
          updateObject.logos = req.body.logos;
      }
      if (req.body.hasOwnProperty('projects')) { 
          updateObject.projects = req.body.projects;
      }
      if (req.body.hasOwnProperty('statistic')) { 
          updateObject.statistic = req.body.statistic;
      }
      if (req.body.hasOwnProperty('items')) { 
          updateObject.items = req.body.items;
      }
      if (req.body.hasOwnProperty('team')) { 
          updateObject.team = req.body.team;
      }
      if (req.body.hasOwnProperty('pricing')) { 
          updateObject.pricing = req.body.pricing;
      }
      if (req.body.hasOwnProperty('cta')) { 
          updateObject.cta = req.body.cta;
      }
      if (req.body.hasOwnProperty('footer')) { 
          updateObject.footer = req.body.footer;
      }
      

      // Update the page document with the filtered update object
      const updatedPage = await Page.findOneAndUpdate({ _id: pageId, owner: userId }, updateObject, { new: true });
console.log(updatedPage);
      if (!updatedPage) {
          return res.status(404).json({ error: 'Page not found or unauthorized access' });
      }

      res.json({ message: 'Page updated successfully', updatedPage });
  } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal Server Error' });
  }

};

export { newPage, getPages, getPage , updatePage };
