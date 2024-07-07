import mongoose from "mongoose";

const pageSchema = new mongoose.Schema({
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
    imgUrl: String,
    email: String,
    buttonText: String,
    icon: String,
    searchIcon: String,
    shoppingIcon: String,
    title: String,
    subtitle: String,
    description: String,
    icons: Array,
    links: [
      {
        title: String,
        url: String,
        imgUrl: String,
      },
    ],
    dropDown: [
      {
        title: String,
        url: String,
      },
    ],
  },
  hero: {
    title: String,
    description: String,
    subtitle: String,
    text: String,
    imgUrl: String,
    imageUrl: String,
    videoUrl: String,
    icon: String,
    buttonText: String,
    buttonIcon: String,
    linkText: String,
    duration: String,
    inputPlaceholder: String,
    jop: String,
    icons: Array,
    imgs: Array,
    buttons: [
      {
        buttonText: String,
        url: String,
      },
    ],
    heros: [
      {
        title: String,
        description: String,
        subtitle: String,
        imgUrl: String,
        icon: String,
        start: String,
        end: String,
        count: String,
      },
    ],
  },
  services: {
    title: String,
    subtitle: String,
    description: String,
    buttonText: String,
    imgUrl: String,
    icon: String,
    services: [
      {
        title: String,
        description: String,
        icon: String,
        linkText: String,
        buttonText: String,
        imgUrl: String,
        value: String,
        price: Number,
        items: Array,
      },
    ],
  },
  features: {
    title: String,
    subtitle: String,
    description: String,
    text: String,
    imgUrl: String,
    buttonText: String,
    phone: String,
    discount: String,
    percentage: String,
    date: String,
    icons: Array,
    imgs: Array,
    features: [
      {
        title: String,
        description: String,
        icon: String,
        imgUrl: String,
        number: String,
        date: String,
        name: String,
      },
    ],
  },
  testimonials: {
    title: String,
    description: String,
    subtitle: String,
    imgUrl: String,
    buttonText: String,
    imgs: Array,
    icons: Array,
    testimonials: [
      {
        name: String,
        location: String,
        imgUrl: String,
        opinion: String,
        title: String,
        role: String,
        description: String,
        subtitle: String,
        star: String,
      },
    ],
  },
  logos: {
    companies: [
      {
        imgUrl: String,
        url: String,
        title: String,
      },
    ],
  },
  projects: {
    title: String,
    description: String,
    subtitle: String,
    imgUrl: String,
    icon: String,
    buttonText: String,
    linkText: String,
    categories: Array,
    projects: [
      {
        title: String,
        description: String,
        subtitle: String,
        imgUrl: String,
        icon: String,
        name: String,
        price: String,
        buttonText: String,
        space: String,
        category: String,
        url: String,
        link: String,
        icons: [
          {
            icon: String,
            title: String,
          },
        ],
      },
    ],
  },
  statistics: {
    statistics: [
      {
        title: String,
        value: String,
        imgUrl: String,
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
    title: String,
    subtitle: String,
    description: String,
    buttonText: String,
    members: [
      {
        memberId: String,
        name: String,
        jop: String,
        email: String,
        location: String,
        imgUrl: String,
        destinationImage: String,
        travelerImage: String,
        rating: String,
        icon: String,
        socialLink: String,
        medias: [
          {
            icon: String,
            url: String,
          },
        ],
      },
    ],
  },
  pricing: {
    title: String,
    subtitle: String,
    text: String,
    description: String,
    buttonText: String,
    imgUrl: String,
    imgs: Array,
    plans: [
      {
        title: String,
        subtitle: String,
        description: String,
        price: String,
        currencySymbol: String,
        timeUnit: String,
        buttonText: String,
        icon: String,
        features: Array,
      },
    ],
  },

  cta: {
    title: String,
    subtitle: String,
    description: String,
    text: String,
    email: String,
    buttonText: String,
    icon: String,
    inputPlaceholder: String,
    googleButton: {
      buttonText: String,
      buttonIcon: String,
    },
    appleButton: {
      buttonText: String,
      buttonIcon: String,
    },
    imgs: Array,
    educations: [
      {
        imgUrl: String,
        title: String,
        description: String,
        year: String,
      },
    ],
    experiences: [
      {
        imgUrl: String,
        title: String,
        description: String,
        year: String,
      },
    ],
    items: [
      {
        title: String,
        subtitle: String,
        date: String,
        description: String,
        category: String,
      },
    ],
  },
  contact: {
    title: String,
    subtitle: String,
    description: String,
    email: String,
    phone: String,
    imgUrl: String,
    icon: String,
    buttonText: String,
    linkText: String,
    name: String,
    address: String,
    subject: String,
    message: String,
    contacts: [
      {
        type: String,
        phone: String,
        address: String,
        email: String,
        buttonText: String,
        imgUrl: String,
      },
    ],
  },
  blogs: {
    title: String,
    description: String,
    subtitle: String,
    imgUrl: String,
    buttonText: String,
    linkText: String,
    blogs: [
      {
        title: String,
        description: String,
        subtitle: String,
        imgUrl: String,
        date: String,
      },
    ],
  },

  header: {
    imgUrl: String,
    buttonText: String,
  },

  reservation: {
    title: String,
    buttonText: String,
    imgUrl: String,
    shape: String,
  },

  about: {
    title: String,
    subtitle: String,
    description: String,
    buttonText: String,
    buttonIcon: String,
    linkText: String,
    imgUrl: String,
    icon: String,
    imgs: Array,
    details: Array,
    abouts: [
      {
        title: String,
        value: Number,
      },
    ],
    buttons: [
      {
        buttonText: String,
        icon: String,
        url: String,
      },
    ],
  },

  gallery: {
    gallery: [
      {
        imgUrl: String,
        title: String,
      },
    ],
  },

  offers: {
    title: String,
    buttonText: String,
    offers: [
      {
        title: String,
        description: String,
        discount: String,
        imgUrl: String,
      },
    ],
  },

  reviews: {
    title: String,
    description: String,
    subtitle: String,
    imgUrl: String,
    icon: String,
    reviews: Array,
    logos: Array,
  },

  products: {
    title: String,
    subtitle: String,
    icon: String,
    rateIcon: String,
    products: [
      {
        title: String,
        items: [
          {
            itemId: String,
            title: String,
            price: String,
            imgUrl: String,
          },
        ],
      },
    ],
  },

  footer: {
    imgUrl: String,
    description: String,
    title: String,
    subtitle: String,
    icon: String,
    links: Array,
    medias: [
      {
        icon: String,
        url: String,
      },
    ],
    footerSections: [
      {
        title: String,
        url: String,
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
        title: String,
        value: String,
        icon: String,
        url: String,
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

const Page = new mongoose.model("Page", pageSchema);

export { Page };
