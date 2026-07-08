export type HomepageData = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryButtonText: string;
    secondaryButtonText: string;
  };

  introduction: {
    title: string;
    text: string;
  };

  staysSection: {
    eyebrow: string;
    title: string;
    description: string;
    buttonText: string;
  };

  experienceSection: {
    eyebrow: string;
    title: string;
    pillars: {
      title: string;
      text: string;
    }[];
    buttonText: string;
  };

  destinationsSection: {
    eyebrow: string;
    title: string;
  };

  conciergeSection: {
    enabled: boolean;
    eyebrow: string;
    title: string;
    text: string;
    image?: unknown;
  };

  instagramSection: {
    eyebrow: string;
    title: string;
    text: string;
    images: unknown[];
  };

  bookingCta: {
    title: string;
    text: string;
    staysButtonText: string;
  };
};

export const fallbackHomepage: HomepageData = {
  hero: {
    eyebrow: "LIVORAA STAYS",
    title: "Stay, thoughtfully.",
    description:
      "Boutique stays shaped by thoughtful spaces, soulful details and experiences worth remembering.",
    primaryButtonText: "Explore Our Stays",
    secondaryButtonText: "Discover Livoraa",
  },

  introduction: {
    title: "More than a place to stay.",
    text:
      "Livoraa creates thoughtfully designed stays that feel personal, considered and connected to the character of each destination.",
  },

  staysSection: {
    eyebrow: "OUR STAYS",
    title: "Spaces with a sense of place.",
    description:
      "Discover distinctive stays designed around comfort, character and thoughtful hospitality.",
    buttonText: "View All Stays",
  },

  experienceSection: {
    eyebrow: "THE LIVORAA EXPERIENCE",
    title: "Thoughtful hospitality, in every detail.",

    pillars: [
      {
        title: "Thoughtful Spaces",
        text:
          "Every Livoraa stay is shaped with intention, balancing comfort, character and a strong sense of place.",
      },
      {
        title: "Personal Hospitality",
        text:
          "Warm, attentive and uncomplicated hospitality designed to make every stay feel effortless.",
      },
      {
        title: "Local Connection",
        text:
          "Experiences and recommendations that help guests discover the spirit and culture of each destination.",
      },
    ],

    buttonText: "Our Experience",
  },

  destinationsSection: {
    eyebrow: "DESTINATIONS",
    title: "Places worth discovering.",
  },

  conciergeSection: {
    enabled: true,
    eyebrow: "LIVORAA CONCIERGE",
    title: "Your stay, thoughtfully arranged.",
    text:
      "From local recommendations to special requests, our concierge approach helps make every journey more personal and effortless.",
  },

  instagramSection: {
    eyebrow: "FOLLOW THE JOURNEY",
    title: "Life at Livoraa.",
    text:
      "Stories, spaces and moments from our stays and the destinations around them.",
    images: [],
  },

  bookingCta: {
    title: "Find your next stay.",
    text:
      "Discover thoughtfully designed spaces and memorable experiences with Livoraa.",
    staysButtonText: "Explore Our Stays",
  },
};