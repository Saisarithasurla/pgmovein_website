export interface SharingTypes {
  single?: number;
  double?: number;
  triple?: number;
}

export interface FoodDetails {
  available: boolean;
  type: "Veg" | "NonVeg" | "Both";
  meals: string[];
}

export interface NearbyPlaces {
  companies: string[];
  colleges: string[];
  metro: string[];
}

export interface Property {
  id: string;
  name: string;
  area: string;
  city: string;
  gender: "Male" | "Female" | "Unisex";
  type: "PG" | "Hostel" | "Co-Living";
  sharingTypes: SharingTypes;
  startingRent: number;
  securityDeposit: number;
  amenities: string[];
  food: FoodDetails;
  houseRules: string[];
  images: string[];
  rating: number;
  reviews: number;
  availableFrom: string;
  availability: "Available" | "Limited" | "Full";
  featured: boolean;
  nearbyPlaces: NearbyPlaces;
  latitude: number;
  longitude: number;
  ownerName: string;
  verified: boolean;
  highlights: string[];
}

export const BANGALORE_AREAS = [
  "Koramangala",
  "Whitefield",
  "HSR Layout",
  "Marathahalli",
  "Indiranagar",
  "BTM Layout",
  "Electronic City",
  "Bellandur",
  "Hebbal",
  "Madhapur"
];

export const BUDGET_RANGES = [
  { label: "Under ₹5,000", value: "under-5000" },
  { label: "₹5,000 - ₹8,000", value: "5000-8000" },
  { label: "₹8,000 - ₹12,000", value: "8000-12000" },
  { label: "₹12,000 - ₹20,000", value: "12000-20000" },
  { label: "Above ₹20,000", value: "above-20000" }
];

export const mockProperties: Property[] = [
  {
    id: "pg-1",
    name: "Stanza Living Dublin House",
    area: "Koramangala",
    city: "Bangalore",
    gender: "Unisex",
    type: "Co-Living",
    sharingTypes: { single: 18000, double: 12000, triple: 9500 },
    startingRent: 9500,
    securityDeposit: 15000,
    amenities: ["Wifi", "AC", "Food", "Parking", "Gym", "CCTV", "Laundry", "TV", "PowerBackup", "Housekeeping", "HotWater"],
    food: {
      available: true,
      type: "Both",
      meals: ["Breakfast", "Lunch", "Dinner"],
    },
    houseRules: [
      "Gate closes at 11:30 PM",
      "No external visitors allowed overnight",
      "No smoking in common areas",
      "No pets allowed",
      "Keep noise levels low after 10 PM"
    ],
    images: [
      "https://picsum.photos/800/500?random=1",
      "https://picsum.photos/800/500?random=11",
      "https://picsum.photos/800/500?random=12",
      "https://picsum.photos/800/500?random=13",
      "https://picsum.photos/800/500?random=14"
    ],
    rating: 4.8,
    reviews: 142,
    availableFrom: "2026-07-10",
    availability: "Available",
    featured: true,
    nearbyPlaces: {
      companies: ["Wipro (1.5 km)", "Flipkart (2.3 km)", "Microsoft (3.0 km)"],
      colleges: ["Christ University (1.2 km)", "St. John's Medical College (0.8 km)"],
      metro: ["Koramangala Metro Station (Proposed) (0.5 km)", "Trinity Metro Station (4.2 km)"]
    },
    latitude: 12.9352,
    longitude: 77.6244,
    ownerName: "Stanza Operations Manager",
    verified: true,
    highlights: ["2 min from Sony World Junction", "Premium Gym Access", "Delicious Veg & Non-Veg Meals"]
  },
  {
    id: "pg-2",
    name: "Comfort Ladies PG",
    area: "HSR Layout",
    city: "Bangalore",
    gender: "Female",
    type: "PG",
    sharingTypes: { single: 12000, double: 7500, triple: 5500 },
    startingRent: 5500,
    securityDeposit: 10000,
    amenities: ["Wifi", "Food", "CCTV", "Laundry", "PowerBackup", "Housekeeping", "HotWater"],
    food: {
      available: true,
      type: "Veg",
      meals: ["Breakfast", "Dinner"],
    },
    houseRules: [
      "Gate closes at 10:00 PM",
      "Only female guests/parents allowed during daytime",
      "Strictly no smoking or drinking",
      "No pets allowed"
    ],
    images: [
      "https://picsum.photos/800/500?random=2",
      "https://picsum.photos/800/500?random=21",
      "https://picsum.photos/800/500?random=22",
      "https://picsum.photos/800/500?random=23"
    ],
    rating: 4.2,
    reviews: 64,
    availableFrom: "2026-07-05",
    availability: "Limited",
    featured: true,
    nearbyPlaces: {
      companies: ["Startups in HSR Sector 6 (0.8 km)", "TCS HSR Office (2.0 km)"],
      colleges: ["NIFT Bangalore (1.1 km)", "Oxford College of Science (2.5 km)"],
      metro: ["Silk Board Metro Station (1.5 km)", "HSR Layout Metro Station (1.2 km)"]
    },
    latitude: 12.9100,
    longitude: 77.6450,
    ownerName: "Mrs. Sarita Reddy",
    verified: true,
    highlights: ["Walking distance to NIFT", "Strict 3-Tier Security", "Homely South Indian Food"]
  },
  {
    id: "pg-3",
    name: "Sri Sai PG for Men",
    area: "Whitefield",
    city: "Bangalore",
    gender: "Male",
    type: "PG",
    sharingTypes: { single: 11000, double: 6500, triple: 4800 },
    startingRent: 4800,
    securityDeposit: 5000,
    amenities: ["Wifi", "Food", "Parking", "CCTV", "PowerBackup", "Housekeeping", "HotWater", "TV"],
    food: {
      available: true,
      type: "Both",
      meals: ["Breakfast", "Lunch", "Dinner"],
    },
    houseRules: [
      "No curfew timings",
      "No female guests inside rooms",
      "Alcohol strictly forbidden inside premises"
    ],
    images: [
      "https://picsum.photos/800/500?random=3",
      "https://picsum.photos/800/500?random=31",
      "https://picsum.photos/800/500?random=32"
    ],
    rating: 4.0,
    reviews: 88,
    availableFrom: "2026-07-02",
    availability: "Available",
    featured: false,
    nearbyPlaces: {
      companies: ["ITPL (1.2 km)", "Oracle (2.5 km)", "Sigma Tech Park (3.0 km)"],
      colleges: ["MVJ College of Engineering (3.5 km)", "Vydehi Institute (2.1 km)"],
      metro: ["ITPL Metro Station (1.0 km)", "Kadugodi Metro Station (2.0 km)"]
    },
    latitude: 12.9698,
    longitude: 77.7499,
    ownerName: "Mr. K. Venkatesh",
    verified: true,
    highlights: ["10 mins walk to ITPL", "No Curfew", "Biometric Entry System"]
  },
  {
    id: "pg-4",
    name: "Zolo Stay Coliving Zenith",
    area: "Marathahalli",
    city: "Bangalore",
    gender: "Unisex",
    type: "Co-Living",
    sharingTypes: { single: 15000, double: 9000, triple: 7000 },
    startingRent: 7000,
    securityDeposit: 12000,
    amenities: ["Wifi", "AC", "Food", "Parking", "Gym", "CCTV", "Laundry", "TV", "PowerBackup", "Housekeeping", "HotWater"],
    food: {
      available: true,
      type: "Both",
      meals: ["Breakfast", "Dinner"],
    },
    houseRules: [
      "Gate closes at 12:00 AM",
      "Guests allowed until 8:00 PM",
      "Maintain cleanliness in common kitchen"
    ],
    images: [
      "https://picsum.photos/800/500?random=4",
      "https://picsum.photos/800/500?random=41",
      "https://picsum.photos/800/500?random=42",
      "https://picsum.photos/800/500?random=43"
    ],
    rating: 4.6,
    reviews: 215,
    availableFrom: "2026-07-08",
    availability: "Limited",
    featured: true,
    nearbyPlaces: {
      companies: ["JPMorgan Chase (1.0 km)", "Intel (1.8 km)", "Cisco (2.5 km)"],
      colleges: ["New Horizon College of Engineering (2.0 km)"],
      metro: ["Kundanahalli Metro Station (1.5 km)", "Marathahalli Metro Station (0.8 km)"]
    },
    latitude: 12.9562,
    longitude: 77.7011,
    ownerName: "Zolo Property Manager",
    verified: true,
    highlights: ["Close to Outer Ring Road companies", "Professional Housekeeping", "PlayStation Zone in Lounge"]
  },
  {
    id: "pg-5",
    name: "Olive Suites Indiranagar",
    area: "Indiranagar",
    city: "Bangalore",
    gender: "Unisex",
    type: "Hostel",
    sharingTypes: { single: 22000, double: 14000 },
    startingRent: 14000,
    securityDeposit: 25000,
    amenities: ["Wifi", "AC", "Parking", "CCTV", "Laundry", "TV", "PowerBackup", "Housekeeping", "HotWater"],
    food: {
      available: false,
      type: "Both",
      meals: []
    },
    houseRules: [
      "No curfew",
      "Visitors allowed in rooms, overnight stay requires prior permission",
      "Pet friendly (on request)",
      "Strict waste segregation rules"
    ],
    images: [
      "https://picsum.photos/800/500?random=5",
      "https://picsum.photos/800/500?random=51",
      "https://picsum.photos/800/500?random=52"
    ],
    rating: 4.9,
    reviews: 57,
    availableFrom: "2026-07-15",
    availability: "Available",
    featured: true,
    nearbyPlaces: {
      companies: ["Microsoft Signature Office (2.1 km)", "Indiranagar Startups (0.5 km)"],
      colleges: ["Gitam University Bangalore Campus (9.0 km)"],
      metro: ["Indiranagar Metro Station (0.4 km)", "Halasuru Metro Station (1.8 km)"]
    },
    latitude: 12.9718,
    longitude: 77.6412,
    ownerName: "Olive Property Manager",
    verified: true,
    highlights: ["4 mins walk to Metro Station", "Surrounded by Cafes and Pubs", "Pet Friendly Rooms"]
  },
  {
    id: "pg-6",
    name: "Adarsh Men's Executive PG",
    area: "BTM Layout",
    city: "Bangalore",
    gender: "Male",
    type: "PG",
    sharingTypes: { single: 10000, double: 6000, triple: 4500 },
    startingRent: 4500,
    securityDeposit: 4000,
    amenities: ["Wifi", "Food", "Parking", "CCTV", "Laundry", "TV", "PowerBackup", "Housekeeping", "HotWater"],
    food: {
      available: true,
      type: "Both",
      meals: ["Breakfast", "Lunch", "Dinner"],
    },
    houseRules: [
      "Gate closes at 11:00 PM",
      "No external guests allowed inside rooms",
      "No smoking/alcohol inside PG premises"
    ],
    images: [
      "https://picsum.photos/800/500?random=6",
      "https://picsum.photos/800/500?random=61"
    ],
    rating: 4.1,
    reviews: 112,
    availableFrom: "2026-07-02",
    availability: "Available",
    featured: false,
    nearbyPlaces: {
      companies: ["Oracle BTM (1.5 km)", "Accenture Bannerghatta (3.0 km)"],
      colleges: ["Alliance Business Academy (2.2 km)", "Christ University (3.5 km)"],
      metro: ["BTM Layout Metro Station (0.8 km)", "Rashtreeya Vidyalaya Road Metro (2.8 km)"]
    },
    latitude: 12.9166,
    longitude: 77.6101,
    ownerName: "Mr. Ramesh Gowda",
    verified: false,
    highlights: ["Super affordable starting price", "Unlimited Wi-Fi", "3-time home style meals"]
  },
  {
    id: "pg-7",
    name: "Elite Co-Living Electronic City",
    area: "Electronic City",
    city: "Bangalore",
    gender: "Unisex",
    type: "Co-Living",
    sharingTypes: { single: 14000, double: 8000, triple: 6000 },
    startingRent: 6000,
    securityDeposit: 10000,
    amenities: ["Wifi", "AC", "Food", "Parking", "Gym", "CCTV", "Laundry", "TV", "PowerBackup", "Housekeeping", "HotWater"],
    food: {
      available: true,
      type: "Both",
      meals: ["Breakfast", "Dinner"]
    },
    houseRules: [
      "Gate closes at 12:00 AM",
      "Visitors allowed in common areas",
      "Keep common spaces tidy"
    ],
    images: [
      "https://picsum.photos/800/500?random=7",
      "https://picsum.photos/800/500?random=71",
      "https://picsum.photos/800/500?random=72"
    ],
    rating: 4.5,
    reviews: 95,
    availableFrom: "2026-07-01",
    availability: "Available",
    featured: false,
    nearbyPlaces: {
      companies: ["Infosys Gate 1 (0.8 km)", "Wipro Electronic City (1.2 km)", "HP (2.0 km)"],
      colleges: ["IIIT Bangalore (1.5 km)", "Symbiosis Institute (2.2 km)"],
      metro: ["Electronic City Metro Station (1.0 km)"]
    },
    latitude: 12.8452,
    longitude: 77.6635,
    ownerName: "Elite Coliving Hub",
    verified: true,
    highlights: ["Walking distance to Infosys", "Equipped Gym and Gaming lounge", "High speed fiber Wi-Fi"]
  },
  {
    id: "pg-8",
    name: "Nesta Ladies PG Bellandur",
    area: "Bellandur",
    city: "Bangalore",
    gender: "Female",
    type: "PG",
    sharingTypes: { single: 14500, double: 8500, triple: 6500 },
    startingRent: 6500,
    securityDeposit: 12000,
    amenities: ["Wifi", "Food", "CCTV", "Laundry", "TV", "PowerBackup", "Housekeeping", "HotWater"],
    food: {
      available: true,
      type: "Veg",
      meals: ["Breakfast", "Lunch", "Dinner"]
    },
    houseRules: [
      "Gate closes at 10:30 PM",
      "No male visitors inside rooms",
      "Inform warden if coming late"
    ],
    images: [
      "https://picsum.photos/800/500?random=8",
      "https://picsum.photos/800/500?random=81",
      "https://picsum.photos/800/500?random=82"
    ],
    rating: 4.4,
    reviews: 131,
    availableFrom: "2026-07-04",
    availability: "Limited",
    featured: true,
    nearbyPlaces: {
      companies: ["EcoSpace (0.6 km)", "Intel EcoWorld (1.2 km)", "Honeywell (2.0 km)"],
      colleges: ["Krupanidhi College (3.0 km)"],
      metro: ["Bellandur Metro Station (Under Construction) (0.5 km)"]
    },
    latitude: 12.9279,
    longitude: 77.6796,
    ownerName: "Nesta Hostel Warden",
    verified: true,
    highlights: ["Opposite EcoSpace Tech Park", "Highly Secured Women's Facility", "Nutritious North & South Indian meals"]
  }
];
