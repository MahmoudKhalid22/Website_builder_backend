import mongoose from "mongoose";

const websiteSchema = new mongoose.Schema({
  templateInfo: {
    id: Number,
    title: String,
    description: String,
    imgUrl: String,
    selectedSections: {
      navbarIndexSelected: Number,
      heroIndexSelected: Number,
      featuresIndexSelected: Number,
      projectsIndexSelected: Number,
      servicesIndexSelected: Number,
      contactIndexSelected: Number,
      teamIndexSelected: Number,
      testimonialsIndexSelected: Number,
      statisticsIndexSelected: Number,
      logosIndexSelected: Number,
      itemsIndexSelected: Number,
      pricingIndexSelected: Number,
      ctaIndexSelected: Number,
      footerIndexSelected: Number,
    },
  },

  navbar: {
    imgUrl: {
      type: String,
    },
    links: {
      type: [
        {
          title: String,
          url: String,
        },
        {
          title: String,
          url: String,
        },
        {
          title: String,
          url: String,
        },
        {
          title: String,
          url: String,
        },
        {
          title: String,
          url: String,
        },
        {
          title: String,
          url: String,
        },
      ],
    },
  },
  hero: {
    title: { type: String },
    description: { type: String },
    buttonText: { type: String },
    icon: { type: String },
    imgUrl: { type: String },
  },
  services: {
    services: [
      {
        title: { type: String },
        description: { type: String },
        icon: { type: String },
      },
      {
        icon: { type: String },
        title: { type: String },
        description: { type: String },
      },
      {
        icon: { type: String },
        title: { type: String },
        description: { type: String },
      },
    ],
  },
  features: {
    title: { type: String },
    description: { type: String },
    phone: { type: String },
    buttonText: { type: String },
    icons: {
      type: Array,
    },
    imgUrl: { type: String },
    number: String,
    date: String,
  },
  testimonials: {
    title: { type: String },
    testimonials: [
      {
        imgUrl: { type: String },
        name: { type: String },
        location: { type: String },
        opinion: { type: String },
      },
      {
        imgUrl: { type: String },
        name: { type: String },
        location: { type: String },
        opinion: { type: String },
      },
      {
        imgUrl: { type: String },
        name: { type: String },
        location: { type: String },
        opinion: { type: String },
      },
    ],
  },
  logos: {
    companies: [
      {
        imgUrl: { type: String },
        url: { type: String },
      },
      {
        imgUrl: { type: String },
        url: { type: String },
      },
      {
        imgUrl: { type: String },
        url: { type: String },
      },
      {
        imgUrl: { type: String },
        url: { type: String },
      },
      {
        imgUrl: { type: String },
        url: { type: String },
      },
    ],
  },
  projects: {
    title: { type: String },
    description: { type: String },
    projects: [
      {
        imgUrl: { type: String },
        title: { type: String },
        description: { type: String },
        icon: { type: String },
      },
      {
        imgUrl: { type: String },
        title: { type: String },
        description: { type: String },
        icon: { type: String },
      },
      {
        imgUrl: { type: String },
        title: { type: String },
        description: { type: String },
        icon: { type: String },
      },
      {
        imgUrl: { type: String },
        title: { type: String },
        description: { type: String },
        icon: { type: String },
      },
    ],
  },
  statistics: {
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
    items: [
      {
        title: { type: String },
        subtitle: { type: String },
        description: { type: String },
        imgUrl: { type: String },
        icon: { type: String },
        caption: { type: String },
      },
      {
        title: { type: String },
        subtitle: { type: String },
        description: { type: String },
        imgUrl: { type: String },
        icon: { type: String },
        caption: { type: String },
      },
      {
        title: { type: String },
        subtitle: { type: String },
        description: { type: String },
        imgUrl: { type: String },
        icon: { type: String },
        caption: { type: String },
      },
    ],
  },
  team: {
    title: { type: String },
    members: [
      {
        name: { type: String },
        email: { type: String },
        location: { type: String },
        imgUrl: { type: String },
        medias: [
          {
            icon: { type: String },
            url: { type: String },
          },
          {
            icon: { type: String },
            url: { type: String },
          },
          {
            icon: { type: String },
            url: { type: String },
          },
          {
            icon: { type: String },
            url: { type: String },
          },
        ],
        email: { type: String },
      },
      {
        name: { type: String },
        location: { type: String },
        imgUrl: { type: String },
        mediaIcons: [
          {
            icon: { type: String },
            url: { type: String },
          },
          {
            icon: { type: String },
            url: { type: String },
          },
          {
            icon: { type: String },
            url: { type: String },
          },
          {
            icon: { type: String },
            url: { type: String },
          },
        ],
        email: { type: String },
      },
      {
        name: { type: String },
        location: { type: String },
        imgUrl: { type: String },
        mediaIcons: [
          {
            icon: { type: String },
            url: { type: String },
          },
          {
            icon: { type: String },
            url: { type: String },
          },
          {
            icon: { type: String },
            url: { type: String },
          },
          {
            icon: { type: String },
            url: { type: String },
          },
        ],
        email: { type: String },
      },
      {
        name: { type: String },
        location: { type: String },
        imgUrl: { type: String },
        mediaIcons: [
          {
            icon: { type: String },
            url: { type: String },
          },
          {
            icon: { type: String },
            url: { type: String },
          },
          {
            icon: { type: String },
            url: { type: String },
          },
          {
            icon: { type: String },
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
    plans: [
      {
        title: { type: String },
        price: { type: Number },
        timeUnit: { type: String },
        moneyUnit: { type: String },
        features: { type: Array },
        buttonText: { type: String },
        icon: { type: String },
      },
      {
        plan: { type: String },
        price: { type: Number },
        timeUnit: { type: String },
        moneyUnit: { type: String },
        features: { type: Array },
        buttonText: { type: String },
        icon: { type: String },
      },
      {
        plan: { type: String },
        price: { type: Number },
        timeUnit: { type: String },
        moneyUnit: { type: String },
        features: { type: Array },
        buttonText: { type: String },
        icon: { type: String },
      },
    ],
  },
  cta: {
    title: { type: String },
    description: { type: String },
    buttonText: { type: String },
    icon: { type: String },
  },
  footer: {
    imgUrl: { type: String },
    description: { type: String },

    medias: [
      {
        icon: { type: String },
        url: { type: String },
      },
      {
        icon: { type: String },
        url: { type: String },
      },
      {
        icon: { type: String },
        url: { type: String },
      },
      {
        icon: { type: String },
        url: { type: String },
      },
    ],
    footerSections: [
      {
        title: String,
        links: [
          {
            title: String,
            url: String,
          },
        ],
      },
    ],

    contacts: [
      {
        value: { type: String },
      },
      {
        value: { type: String },
      },
      {
        value: { type: String },
      },
    ],
  },
  colors: {
    templateColors: Array,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const WebSite = new mongoose.model("WebSite", websiteSchema);

export { WebSite };