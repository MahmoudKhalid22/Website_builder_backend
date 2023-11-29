import mongoose from "mongoose";

const pageSchema = new mongoose.Schema({
  navBar: {
    logo: {
      type: Buffer,
    },
    navLinks: {
      type: Array,
    },
  },
  heroSection: {
    background: {
      type: Buffer,
    },
    content: {
      type: Array,
    },
  },
  testimonial: {
    type: Array,
  },
  about: {
    contentAbout: {
      type: Array,
    },
    imgAbout: {
      type: Buffer,
    },
  },
});

const Page = new mongoose.model("Page", pageSchema);

export { Page };
