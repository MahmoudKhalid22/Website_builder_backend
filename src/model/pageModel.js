import mongoose from "mongoose";

const pageSchema = new mongoose.Schema({
  navBar: {
    imgUrl: {
      type: String,
    },
    links: {
      type: Array,
    },
  },
  hero: {
    title: { type: String },
    description: { type: String },
    icon: { type: Buffer },
    imgUrl: { type: String },
    buttonText: { type: String },
  },
  services: {
    blocks: [
      {
        icon: { type: Buffer },
        title: { type: String },
        description: { type: String },
      },
      {
        icon: { type: Buffer },
        title: { type: String },
        description: { type: String },
      },
      {
        icon: { type: Buffer },
        title: { type: String },
        description: { type: String },
      },
    ],
  },
  feature: {
    title: { type: String },
    description: { type: String },
    phone: { type: String },
    buttonText: { type: String },
    icons: [
      {
        icon: { type: Buffer },
      },
      {
        icon: { type: Buffer },
      },
    ],
    imgUrl: { type: String },
  },
  testimonial: {
    title: { type: String },
    cards: [
      {
        imgUrl: { type: Buffer },
        name: { type: String },
        location: { type: String },
        opinion: { type: String },
      },
      {
        imgUrl: { type: Buffer },
        name: { type: String },
        location: { type: String },
        opinion: { type: String },
      },
      {
        imgUrl: { type: Buffer },
        name: { type: String },
        location: { type: String },
        opinion: { type: String },
      },
    ],
  },
  logos: {
    companies: [
      {
        imgUrl: { type: Buffer },
      },
      {
        imgUrl: { type: Buffer },
      },
      {
        imgUrl: { type: Buffer },
      },
      {
        imgUrl: { type: Buffer },
      },
      {
        imgUrl: { type: Buffer },
      },
    ],
  },
  projects: {
    title: { type: String },
    description: { type: String },
    cards: [
      {
        imgUrl: { type: Buffer },
        title: { type: String },
        description: { type: String },
        icon: { type: Buffer },
      },
      {
        imgUrl: { type: Buffer },
        title: { type: String },
        description: { type: String },
        icon: { type: Buffer },
      },
      {
        imgUrl: { type: Buffer },
        title: { type: String },
        description: { type: String },
        icon: { type: Buffer },
      },
      {
        imgUrl: { type: Buffer },
        title: { type: String },
        description: { type: String },
        icon: { type: Buffer },
      },
    ],
  },
  statistic: {
    statistics: [
      {
        title: { type: String },
        value: { type: String },
      },
      {
        title: { type: String },
        value: { type: String },
      },
      {
        title: { type: String },
        value: { type: String },
      },
      {
        title: { type: String },
        value: { type: String },
      },
    ],
  },
  items: {
    title: { type: String },
    description: { type: String },
    cards: [
      {
        title: { type: String },
        description: { type: String },
        imgUrl: { type: Buffer },
        icon: { type: Buffer },
        caption: { type: String },
      },
      {
        title: { type: String },
        description: { type: String },
        imgUrl: { type: Buffer },
        icon: { type: Buffer },
        caption: { type: String },
      },
      {
        title: { type: String },
        description: { type: String },
        imgUrl: { type: Buffer },
        icon: { type: Buffer },
        caption: { type: String },
      },
    ],
  },
  team: {
    title: { type: String },
    cards: [
      {
        name: { type: String },
        location: { type: String },
        imgUrl: { type: Buffer },
        mediaIcons: [
          {
            icon: { type: Buffer },
            url: { type: String },
          },
          {
            icon: { type: Buffer },
            url: { type: String },
          },
          {
            icon: { type: Buffer },
            url: { type: String },
          },
          {
            icon: { type: Buffer },
            url: { type: String },
          },
        ],
        email: { type: String },
      },
      {
        name: { type: String },
        location: { type: String },
        imgUrl: { type: Buffer },
        mediaIcons: [
          {
            icon: { type: Buffer },
            url: { type: String },
          },
          {
            icon: { type: Buffer },
            url: { type: String },
          },
          {
            icon: { type: Buffer },
            url: { type: String },
          },
          {
            icon: { type: Buffer },
            url: { type: String },
          },
        ],
        email: { type: String },
      },
      {
        name: { type: String },
        location: { type: String },
        imgUrl: { type: Buffer },
        mediaIcons: [
          {
            icon: { type: Buffer },
            url: { type: String },
          },
          {
            icon: { type: Buffer },
            url: { type: String },
          },
          {
            icon: { type: Buffer },
            url: { type: String },
          },
          {
            icon: { type: Buffer },
            url: { type: String },
          },
        ],
        email: { type: String },
      },
      {
        name: { type: String },
        location: { type: String },
        imgUrl: { type: Buffer },
        mediaIcons: [
          {
            icon: { type: Buffer },
            url: { type: String },
          },
          {
            icon: { type: Buffer },
            url: { type: String },
          },
          {
            icon: { type: Buffer },
            url: { type: String },
          },
          {
            icon: { type: Buffer },
            url: { type: String },
          },
        ],
        email: { type: String },
      },
    ],
  },
  pricing: {
    title: { type: String },
    description: { type: String },
    blocks: [
      {
        plan: { type: String },
        price: { type: Number },
        timeUnit: { type: String },
        moneyUnit: { type: String },
        features: { type: Array },
        buttonText: { type: String },
        icon: { type: Buffer },
      },
      {
        plan: { type: String },
        price: { type: Number },
        timeUnit: { type: String },
        moneyUnit: { type: String },
        features: { type: Array },
        buttonText: { type: String },
        icon: { type: Buffer },
      },
      {
        plan: { type: String },
        price: { type: Number },
        timeUnit: { type: String },
        moneyUnit: { type: String },
        features: { type: Array },
        buttonText: { type: String },
        icon: { type: Buffer },
      },
    ],
  },
  cta: {
    title: { type: String },
    description: { type: String },
    buttonText: { type: String },
    icon: { type: Buffer },
  },
  footer: {
    imgUrl: { type: Buffer },
    description: { type: String },

    mediaIcons: [
      {
        icon: { type: Buffer },
        url: { type: String },
      },
      {
        icon: { type: Buffer },
        url: { type: String },
      },
      {
        icon: { type: Buffer },
        url: { type: String },
      },
      {
        icon: { type: Buffer },
        url: { type: String },
      },
    ],
    items: [
      {
        title: { type: String },
        links: { type: Array },
      },
      {
        title: { type: String },
        links: { type: Array },
      },
    ],
    contact: {
      title: { type: String },
      location: { type: String },
      email: { type: String },
      phone: { type: String },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Page = new mongoose.model("Page", pageSchema);

export { Page };
