export interface ModifierOption {
  id: string;
  name: string;
  priceDeltaCents: number;
  isDefault?: boolean;
}

export interface ModifierGroup {
  id: string;
  name: string;
  minSelect: number;
  maxSelect: number;
  isRequired: boolean;
  options: ModifierOption[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  imageUrl: string;
  isAvailable: boolean;
  dietaryTags?: string[];
  allergens?: string[];
  modifierGroups?: ModifierGroup[];
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface RestaurantConfig {
  name: string;
  subtitle: string;
  address: string;
  phone: string;
  openingHours: string;
  deliveryRadius: string;
  ratingValue: number;
  reviewCount: number;
  minOrderCents: number;
  deliveryFeeCents: number;
  eta: string;
  logoUrl: string;
  heroVideoUrl: string;
  heroPosterUrl: string;
}

export const RESTAURANT_DATA: RestaurantConfig = {
  name: "Bosphorus Kebab",
  subtitle: "Hermannstraße 142 · Neukölln",
  address: "Hermannstraße 142, 12051 Berlin",
  phone: "+49 157 3689 1902",
  openingHours: "Daily 11:00 – 23:00",
  deliveryRadius: "4 km · Neukölln, Kreuzberg, Treptow",
  ratingValue: 4.8,
  reviewCount: 1247,
  minOrderCents: 1200,
  deliveryFeeCents: 290,
  eta: "25–35 min",
  logoUrl: "https://pub-a67e46c5141e43e695aa5c32f986002d.r2.dev/platform/stock/menu/logo.png",
  heroVideoUrl: "https://pub-a67e46c5141e43e695aa5c32f986002d.r2.dev/platform/stock/hero.mp4",
  heroPosterUrl: "https://pub-a67e46c5141e43e695aa5c32f986002d.r2.dev/platform/stock/hero-poster.jpg",
};

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "starters",
    name: "Starters",
    items: [
      {
        id: "hummus",
        name: "Hummus",
        description: "Creamy chickpea purée with olive oil, sumac and fresh bread",
        priceCents: 550,
        imageUrl: "https://pub-a67e46c5141e43e695aa5c32f986002d.r2.dev/platform/stock/menu/humus.jpg",
        isAvailable: true,
        dietaryTags: ["🌱 Vegan"],
        allergens: ["sesame"],
        modifierGroups: [
          {
            id: "spice",
            name: "Choose your spice",
            minSelect: 1,
            maxSelect: 1,
            isRequired: true,
            options: [
              { id: "mild", name: "Mild", priceDeltaCents: 0 },
              { id: "medium", name: "Medium", priceDeltaCents: 0, isDefault: true },
              { id: "hot", name: "Hot", priceDeltaCents: 0 },
            ],
          },
          {
            id: "extras",
            name: "Extras",
            minSelect: 0,
            maxSelect: 3,
            isRequired: false,
            options: [
              { id: "meat", name: "Extra meat", priceDeltaCents: 300 },
              { id: "cheese", name: "Extra cheese", priceDeltaCents: 150 },
              { id: "fries", name: "Fries", priceDeltaCents: 250 },
            ],
          },
        ],
      },
      {
        id: "sigara-borek",
        name: "Sigara Börek",
        description: "Four yufka rolls with feta, parsley and a yoghurt dip",
        priceCents: 480,
        imageUrl: "https://pub-a67e46c5141e43e695aa5c32f986002d.r2.dev/platform/stock/menu/borek.jpg",
        isAvailable: true,
        dietaryTags: [],
        allergens: ["gluten", "milk"],
        modifierGroups: [
          {
            id: "spice",
            name: "Choose your spice",
            minSelect: 1,
            maxSelect: 1,
            isRequired: true,
            options: [
              { id: "mild", name: "Mild", priceDeltaCents: 0 },
              { id: "medium", name: "Medium", priceDeltaCents: 0, isDefault: true },
              { id: "hot", name: "Hot", priceDeltaCents: 0 },
            ],
          },
          {
            id: "extras",
            name: "Extras",
            minSelect: 0,
            maxSelect: 3,
            isRequired: false,
            options: [
              { id: "meat", name: "Extra meat", priceDeltaCents: 300 },
              { id: "cheese", name: "Extra cheese", priceDeltaCents: 150 },
              { id: "fries", name: "Fries", priceDeltaCents: 250 },
            ],
          },
        ],
      },
      {
        id: "lentil-soup",
        name: "Lentil soup",
        description: "Homemade, with butter, lemon and pul biber",
        priceCents: 520,
        imageUrl: "https://pub-a67e46c5141e43e695aa5c32f986002d.r2.dev/platform/stock/menu/linsensuppe.webp",
        isAvailable: true,
        dietaryTags: ["🌶️"],
        allergens: ["milk"],
        modifierGroups: [
          {
            id: "spice",
            name: "Choose your spice",
            minSelect: 1,
            maxSelect: 1,
            isRequired: true,
            options: [
              { id: "mild", name: "Mild", priceDeltaCents: 0 },
              { id: "medium", name: "Medium", priceDeltaCents: 0, isDefault: true },
              { id: "hot", name: "Hot", priceDeltaCents: 0 },
            ],
          },
          {
            id: "extras",
            name: "Extras",
            minSelect: 0,
            maxSelect: 3,
            isRequired: false,
            options: [
              { id: "meat", name: "Extra meat", priceDeltaCents: 300 },
              { id: "cheese", name: "Extra cheese", priceDeltaCents: 150 },
              { id: "fries", name: "Fries", priceDeltaCents: 250 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "charcoal-grill",
    name: "From the charcoal grill",
    items: [
      {
        id: "adana-wrap",
        name: "Adana wrap",
        description: "House Adana, bulgur, sumac onions and yoghurt in yufka",
        priceCents: 890,
        imageUrl: "https://pub-a67e46c5141e43e695aa5c32f986002d.r2.dev/platform/stock/menu/adana.webp",
        isAvailable: true,
        dietaryTags: ["Beliebt"],
        allergens: ["gluten", "milk"],
        modifierGroups: [
          {
            id: "spice",
            name: "Choose your spice",
            minSelect: 1,
            maxSelect: 1,
            isRequired: true,
            options: [
              { id: "mild", name: "Mild", priceDeltaCents: 0 },
              { id: "medium", name: "Medium", priceDeltaCents: 0, isDefault: true },
              { id: "hot", name: "Hot", priceDeltaCents: 0 },
            ],
          },
          {
            id: "extras",
            name: "Extras",
            minSelect: 0,
            maxSelect: 3,
            isRequired: false,
            options: [
              { id: "meat", name: "Extra meat", priceDeltaCents: 300 },
              { id: "cheese", name: "Extra cheese", priceDeltaCents: 150 },
              { id: "fries", name: "Fries", priceDeltaCents: 250 },
            ],
          },
        ],
      },
      {
        id: "iskender-plate",
        name: "Iskender plate",
        description: "Doner on bread with yoghurt, tomato butter and salad",
        priceCents: 1450,
        imageUrl: "https://pub-a67e46c5141e43e695aa5c32f986002d.r2.dev/platform/stock/menu/iskender.webp",
        isAvailable: true,
        dietaryTags: ["Beliebt"],
        allergens: ["gluten", "milk"],
        modifierGroups: [
          {
            id: "spice",
            name: "Choose your spice",
            minSelect: 1,
            maxSelect: 1,
            isRequired: true,
            options: [
              { id: "mild", name: "Mild", priceDeltaCents: 0 },
              { id: "medium", name: "Medium", priceDeltaCents: 0, isDefault: true },
              { id: "hot", name: "Hot", priceDeltaCents: 0 },
            ],
          },
          {
            id: "extras",
            name: "Extras",
            minSelect: 0,
            maxSelect: 3,
            isRequired: false,
            options: [
              { id: "meat", name: "Extra meat", priceDeltaCents: 300 },
              { id: "cheese", name: "Extra cheese", priceDeltaCents: 150 },
              { id: "fries", name: "Fries", priceDeltaCents: 250 },
            ],
          },
        ],
      },
      {
        id: "mixed-grill",
        name: "Mixed grill plate",
        description: "Adana, köfte, chicken, rice, bulgur, salad and bread",
        priceCents: 1790,
        imageUrl: "https://pub-a67e46c5141e43e695aa5c32f986002d.r2.dev/platform/stock/menu/mixgrill.webp",
        isAvailable: true,
        dietaryTags: [],
        allergens: ["gluten"],
        modifierGroups: [
          {
            id: "spice",
            name: "Choose your spice",
            minSelect: 1,
            maxSelect: 1,
            isRequired: true,
            options: [
              { id: "mild", name: "Mild", priceDeltaCents: 0 },
              { id: "medium", name: "Medium", priceDeltaCents: 0, isDefault: true },
              { id: "hot", name: "Hot", priceDeltaCents: 0 },
            ],
          },
          {
            id: "extras",
            name: "Extras",
            minSelect: 0,
            maxSelect: 3,
            isRequired: false,
            options: [
              { id: "meat", name: "Extra meat", priceDeltaCents: 300 },
              { id: "cheese", name: "Extra cheese", priceDeltaCents: 150 },
              { id: "fries", name: "Fries", priceDeltaCents: 250 },
            ],
          },
        ],
      },
      {
        id: "doner-box",
        name: "Doner box",
        description: "Doner, fries, salad, sauce and cheese — all in one box",
        priceCents: 950,
        imageUrl: "https://pub-a67e46c5141e43e695aa5c32f986002d.r2.dev/platform/stock/menu/doner.jpg",
        isAvailable: true,
        dietaryTags: [],
        allergens: ["gluten", "milk"],
        modifierGroups: [
          {
            id: "spice",
            name: "Choose your spice",
            minSelect: 1,
            maxSelect: 1,
            isRequired: true,
            options: [
              { id: "mild", name: "Mild", priceDeltaCents: 0 },
              { id: "medium", name: "Medium", priceDeltaCents: 0, isDefault: true },
              { id: "hot", name: "Hot", priceDeltaCents: 0 },
            ],
          },
          {
            id: "extras",
            name: "Extras",
            minSelect: 0,
            maxSelect: 3,
            isRequired: false,
            options: [
              { id: "meat", name: "Extra meat", priceDeltaCents: 300 },
              { id: "cheese", name: "Extra cheese", priceDeltaCents: 150 },
              { id: "fries", name: "Fries", priceDeltaCents: 250 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "pide-lahmacun",
    name: "Pide & lahmacun",
    items: [
      {
        id: "lahmacun",
        name: "Lahmacun",
        description: "Thin dough with minced meat, parsley, onion and lemon",
        priceCents: 420,
        imageUrl: "https://pub-a67e46c5141e43e695aa5c32f986002d.r2.dev/platform/stock/menu/lahmacun.jpg",
        isAvailable: true,
        dietaryTags: [],
        allergens: ["gluten"],
        modifierGroups: [
          {
            id: "spice",
            name: "Choose your spice",
            minSelect: 1,
            maxSelect: 1,
            isRequired: true,
            options: [
              { id: "mild", name: "Mild", priceDeltaCents: 0 },
              { id: "medium", name: "Medium", priceDeltaCents: 0, isDefault: true },
              { id: "hot", name: "Hot", priceDeltaCents: 0 },
            ],
          },
          {
            id: "extras",
            name: "Extras",
            minSelect: 0,
            maxSelect: 3,
            isRequired: false,
            options: [
              { id: "meat", name: "Extra meat", priceDeltaCents: 300 },
              { id: "cheese", name: "Extra cheese", priceDeltaCents: 150 },
              { id: "fries", name: "Fries", priceDeltaCents: 250 },
            ],
          },
        ],
      },
      {
        id: "sucuk-pide",
        name: "Sucuk pide",
        description: "Turkish flatbread boat with sucuk, feta and a fried egg",
        priceCents: 950,
        imageUrl: "https://pub-a67e46c5141e43e695aa5c32f986002d.r2.dev/platform/stock/menu/pide.jpg",
        isAvailable: true,
        dietaryTags: [],
        allergens: ["gluten", "milk", "egg"],
        modifierGroups: [
          {
            id: "spice",
            name: "Choose your spice",
            minSelect: 1,
            maxSelect: 1,
            isRequired: true,
            options: [
              { id: "mild", name: "Mild", priceDeltaCents: 0 },
              { id: "medium", name: "Medium", priceDeltaCents: 0, isDefault: true },
              { id: "hot", name: "Hot", priceDeltaCents: 0 },
            ],
          },
          {
            id: "extras",
            name: "Extras",
            minSelect: 0,
            maxSelect: 3,
            isRequired: false,
            options: [
              { id: "meat", name: "Extra meat", priceDeltaCents: 300 },
              { id: "cheese", name: "Extra cheese", priceDeltaCents: 150 },
              { id: "fries", name: "Fries", priceDeltaCents: 250 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "sweets-drinks",
    name: "Sweets & drinks",
    items: [
      {
        id: "baklava",
        name: "Baklava",
        description: "3 pieces with pistachio from Gaziantep",
        priceCents: 550,
        imageUrl: "https://pub-a67e46c5141e43e695aa5c32f986002d.r2.dev/platform/stock/menu/kunefe.jpg",
        isAvailable: true,
        dietaryTags: [],
        allergens: ["gluten", "milk", "nuts"],
        modifierGroups: [
          {
            id: "extras",
            name: "Extras",
            minSelect: 0,
            maxSelect: 2,
            isRequired: false,
            options: [
              { id: "pistachio", name: "Extra pistachio", priceDeltaCents: 150 },
              { id: "icecream", name: "Vanilla ice cream scoop", priceDeltaCents: 200 },
            ],
          },
        ],
      },
      {
        id: "kunefe",
        name: "Künefe",
        description: "Served hot with pistachio and syrup",
        priceCents: 680,
        imageUrl: "https://pub-a67e46c5141e43e695aa5c32f986002d.r2.dev/platform/stock/menu/kunefe.jpg",
        isAvailable: true,
        dietaryTags: ["Heiß"],
        allergens: ["gluten", "milk", "nuts"],
        modifierGroups: [
          {
            id: "extras",
            name: "Extras",
            minSelect: 0,
            maxSelect: 2,
            isRequired: false,
            options: [
              { id: "pistachio", name: "Extra pistachio", priceDeltaCents: 150 },
              { id: "icecream", name: "Vanilla ice cream scoop", priceDeltaCents: 200 },
            ],
          },
        ],
      },
      {
        id: "ayran",
        name: "Ayran",
        description: "Homemade · 0.3 l",
        priceCents: 250,
        imageUrl: "https://pub-a67e46c5141e43e695aa5c32f986002d.r2.dev/platform/stock/menu/ayran.webp",
        isAvailable: true,
        dietaryTags: [],
        allergens: ["milk"],
      },
      {
        id: "turkish-cay",
        name: "Turkish çay",
        description: "From the samovar",
        priceCents: 180,
        imageUrl: "https://pub-a67e46c5141e43e695aa5c32f986002d.r2.dev/platform/stock/menu/cay.jpg",
        isAvailable: true,
        dietaryTags: [],
        allergens: [],
      },
    ],
  },
];

export const REVIEWS = [
  {
    author: "Anna K.",
    stars: 5,
    quote: "Best Adana in Neukölln. Full stop. Charcoal flavour, fresh bread, creamy yoghurt.",
    when: "2 days ago",
  },
  {
    author: "Tim M.",
    stars: 5,
    quote: "Delivery on time, food hot. The Iskender was perfect — they know their spit here.",
    when: "A week ago",
  },
  {
    author: "Sara B.",
    stars: 5,
    quote: "Finally a Turkish restaurant that isn't only döner. The pide was fluffy, the künefe a dream.",
    when: "3 days ago",
  },
];

export const VOUCHER_CODES: Record<string, { discountPercent?: number; discountCents?: number; description: string }> = {
  WELCOME10: { discountPercent: 10, description: "10% off your entire order" },
  NEUKOELLN5: { discountCents: 500, description: "€5.00 off order" },
};
