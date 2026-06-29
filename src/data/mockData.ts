export type PropertyType = "PG" | "Flat" | "Hostel" | "CoLiving" | "Room";

export type Property = {
  id: string;
  name: string;
  type: PropertyType;
  area: string;
  city: string;
  rent: number;
  images: string[];
  amenities: string[];
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  isFeatured: boolean;
  owner: { name: string; phone: string };
};

export type Area = {
  name: string;
  city: string;
  slug: string;
  propertyCount: number;
  pgCount: number;
  flatCount: number;
  hostelCount: number;
  startingRent: number;
  gradient: string;
};

export type CityGuide = {
  summary: string;
  bestFor: string[];
  commute: string[];
  averageRent: {
    pg: number;
    flat: number;
    hostel: number;
  };
  highlights: string[];
};

export const cities = ["hyderabad", "bangalore", "mumbai", "pune", "chennai"];

export const cityGuides: Record<string, CityGuide> = {
  hyderabad: {
    summary: "Hyderabad is strong for tech tenants, students, and working professionals who want roomy rentals near office corridors.",
    bestFor: ["IT professionals", "Students", "Shared flats", "Budget PGs"],
    commute: ["Metro access around Ameerpet and Hitech City", "Good cab availability near Madhapur and Gachibowli", "Outer Ring Road helps longer office commutes"],
    averageRent: { pg: 8500, flat: 18000, hostel: 7200 },
    highlights: ["Madhapur and Gachibowli for tech offices", "Kukatpally and Miyapur for lower rent", "Ameerpet and SR Nagar for coaching hubs"],
  },
  bangalore: {
    summary: "Bangalore has the widest rental mix, from managed co-living to family flats near major business parks.",
    bestFor: ["Startup employees", "Remote workers", "Co-living", "Family flats"],
    commute: ["Metro helps in central and eastern corridors", "Whitefield and Electronic City work best when you stay close to office", "Two-wheelers are common for short commutes"],
    averageRent: { pg: 10500, flat: 22000, hostel: 8500 },
    highlights: ["Koramangala and HSR for social life", "Whitefield for IT parks", "Indiranagar for premium shared flats"],
  },
  mumbai: {
    summary: "Mumbai rewards location-first searching because commute time matters as much as rent.",
    bestFor: ["Students", "Working professionals", "Compact studios", "Hostels"],
    commute: ["Local trains are the main connector", "Metro links are improving western suburbs", "Staying near work saves major travel time"],
    averageRent: { pg: 13000, flat: 30000, hostel: 11000 },
    highlights: ["Andheri and Bandra for office access", "Thane and Borivali for better space", "Powai for campus and tech crowd"],
  },
  pune: {
    summary: "Pune is balanced for students and professionals, with practical rents and strong demand near IT parks.",
    bestFor: ["Students", "IT employees", "Shared rooms", "Co-living"],
    commute: ["Hinjewadi and Kharadi are office-heavy", "Bike commutes are common", "Stay near your college or office for easier weekdays"],
    averageRent: { pg: 7800, flat: 16500, hostel: 6500 },
    highlights: ["Hinjewadi for IT parks", "Kothrud for students", "Viman Nagar and Kharadi for professionals"],
  },
  chennai: {
    summary: "Chennai offers stable rental pockets for students, families, and OMR tech employees.",
    bestFor: ["Students", "Families", "OMR employees", "Budget hostels"],
    commute: ["OMR works best for tech corridor tenants", "Local trains help southern suburbs", "Metro access is useful around central areas"],
    averageRent: { pg: 7200, flat: 15000, hostel: 6200 },
    highlights: ["Adyar and Anna Nagar for premium access", "OMR for tech offices", "Tambaram and Medavakkam for value rentals"],
  },
};

const areaNames: Record<string, string[]> = {
  hyderabad: ["Madhapur", "Kondapur", "Gachibowli", "Hitech City", "Kukatpally", "Miyapur", "Ameerpet", "SR Nagar", "Begumpet", "Secunderabad"],
  bangalore: ["Whitefield", "Koramangala", "HSR Layout", "Indiranagar", "Electronic City", "Marathahalli", "BTM Layout", "Yelahanka", "Jayanagar", "Hebbal"],
  mumbai: ["Andheri", "Bandra", "Thane", "Powai", "Dadar", "Borivali", "Chembur", "Malad", "Vikhroli", "Lower Parel"],
  pune: ["Kothrud", "Baner", "Hinjewadi", "Viman Nagar", "Wakad", "Hadapsar", "Kharadi", "Aundh", "Magarpatta", "Shivaji Nagar"],
  chennai: ["Adyar", "Anna Nagar", "OMR", "Velachery", "T Nagar", "Porur", "Guindy", "Tambaram", "Nungambakkam", "Medavakkam"],
};

const gradients = [
  "from-blue-600 to-purple-600",
  "from-teal-600 to-cyan-600",
  "from-rose-600 to-orange-500",
  "from-emerald-600 to-lime-600",
  "from-indigo-600 to-sky-600",
  "from-fuchsia-600 to-pink-600",
  "from-amber-500 to-red-500",
  "from-cyan-700 to-blue-700",
  "from-violet-600 to-indigo-700",
  "from-green-700 to-teal-600",
];

export const areas: Area[] = Object.entries(areaNames).flatMap(([city, names], cityIndex) =>
  names.map((name, index) => {
    const propertyCount = 120 + cityIndex * 80 + index * 23;
    return {
      name,
      city,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      propertyCount,
      pgCount: Math.round(propertyCount * 0.36),
      flatCount: Math.round(propertyCount * 0.44),
      hostelCount: Math.round(propertyCount * 0.2),
      startingRent: 4500 + index * 450 + cityIndex * 650,
      gradient: gradients[index % gradients.length],
    };
  }),
);

export const properties: Property[] = [
  {
    id: "madhapur-premium-pg",
    name: "Madhapur Premium PG",
    type: "PG",
    area: "Madhapur",
    city: "hyderabad",
    rent: 8000,
    images: ["https://picsum.photos/seed/madhapur-premium-pg/800/600"],
    amenities: ["Wifi", "AC", "Meals", "Parking"],
    rating: 4.8,
    reviewCount: 124,
    isVerified: true,
    isFeatured: true,
    owner: { name: "Ravi Kumar", phone: "+91 9000000001" },
  },
  {
    id: "koramangala-co-living",
    name: "Koramangala Co-Living Suites",
    type: "CoLiving",
    area: "Koramangala",
    city: "bangalore",
    rent: 14500,
    images: ["https://picsum.photos/seed/koramangala-co-living/800/600"],
    amenities: ["Wifi", "AC", "Meals", "Parking"],
    rating: 4.7,
    reviewCount: 98,
    isVerified: true,
    isFeatured: true,
    owner: { name: "Meera Nair", phone: "+91 9000000002" },
  },
  {
    id: "andheri-studio-flat",
    name: "Andheri Studio Flat",
    type: "Flat",
    area: "Andheri",
    city: "mumbai",
    rent: 20000,
    images: ["https://picsum.photos/seed/andheri-studio-flat/800/600"],
    amenities: ["Wifi", "AC", "Parking"],
    rating: 4.6,
    reviewCount: 77,
    isVerified: true,
    isFeatured: true,
    owner: { name: "Sameer Shah", phone: "+91 9000000003" },
  },
  {
    id: "baner-shared-room",
    name: "Baner Shared Room",
    type: "Room",
    area: "Baner",
    city: "pune",
    rent: 6500,
    images: ["https://picsum.photos/seed/baner-shared-room/800/600"],
    amenities: ["Wifi", "Meals"],
    rating: 4.5,
    reviewCount: 63,
    isVerified: true,
    isFeatured: false,
    owner: { name: "Neha Patil", phone: "+91 9000000004" },
  },
  {
    id: "whitefield-family-flat",
    name: "Whitefield Family Flat",
    type: "Flat",
    area: "Whitefield",
    city: "bangalore",
    rent: 17000,
    images: ["https://picsum.photos/seed/whitefield-family-flat/800/600"],
    amenities: ["Wifi", "AC", "Parking"],
    rating: 4.6,
    reviewCount: 81,
    isVerified: true,
    isFeatured: false,
    owner: { name: "Kiran Rao", phone: "+91 9000000007" },
  },
  {
    id: "bandra-student-hostel",
    name: "Bandra Student Hostel",
    type: "Hostel",
    area: "Bandra",
    city: "mumbai",
    rent: 11000,
    images: ["https://picsum.photos/seed/bandra-student-hostel/800/600"],
    amenities: ["Wifi", "Meals"],
    rating: 4.3,
    reviewCount: 69,
    isVerified: true,
    isFeatured: false,
    owner: { name: "Farah Shaikh", phone: "+91 9000000008" },
  },
  {
    id: "hinjewadi-co-living",
    name: "Hinjewadi Co-Living Hub",
    type: "CoLiving",
    area: "Hinjewadi",
    city: "pune",
    rent: 12500,
    images: ["https://picsum.photos/seed/hinjewadi-co-living/800/600"],
    amenities: ["Wifi", "AC", "Meals", "Parking"],
    rating: 4.5,
    reviewCount: 74,
    isVerified: true,
    isFeatured: false,
    owner: { name: "Amit Deshmukh", phone: "+91 9000000009" },
  },
  {
    id: "adyar-student-hostel",
    name: "Adyar Student Hostel",
    type: "Hostel",
    area: "Adyar",
    city: "chennai",
    rent: 7200,
    images: ["https://picsum.photos/seed/adyar-student-hostel/800/600"],
    amenities: ["Wifi", "AC", "Meals"],
    rating: 4.4,
    reviewCount: 52,
    isVerified: true,
    isFeatured: false,
    owner: { name: "Anand Iyer", phone: "+91 9000000005" },
  },
  {
    id: "gachibowli-family-flat",
    name: "Gachibowli Family Flat",
    type: "Flat",
    area: "Gachibowli",
    city: "hyderabad",
    rent: 18000,
    images: ["https://picsum.photos/seed/gachibowli-family-flat/800/600"],
    amenities: ["Wifi", "AC", "Parking"],
    rating: 4.9,
    reviewCount: 143,
    isVerified: true,
    isFeatured: true,
    owner: { name: "Ayesha Khan", phone: "+91 9000000006" },
  },
];
