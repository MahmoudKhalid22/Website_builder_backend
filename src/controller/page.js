import { Page } from "../model/pageModel.js";

const newProject = async (req, res) => {
  const page = new Page({ ...req.body, owner: req.user._id });
  try {
    // if (req.files) {
    //   // Iterate over the fields containing images and update the document
    //   for (const field in req.files) {
    //     if (req.files.hasOwnProperty(field)) {
    //       const images = Array.isArray(req.files[field])
    //         ? req.files[field]
    //         : [req.files[field]];

    //       // Validate image size
    //       const validImages = images.filter((file) => file.size <= maxSize);

    //       if (validImages.length !== images.length) {
    //         return res
    //           .status(400)
    //           .json({ error: "Some images exceed the size limit" });
    //       }

    //       page[field] = validImages.map((file) => ({ buffer: file.buffer }));
    //     }
    //   }
    // }
    console.log(req.body);
    console.log(req.files);

    // Attach user information to the page document

    await page.save();

    res.json({ message: "Page created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
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

export { page, newProject };
