-- ==========================================
-- SEED DATA FOR PGMOVEIN WEBSITE
-- ==========================================

-- Clean existing seed data to ensure re-runnable execution
DELETE FROM public.property_images WHERE property_id IN (
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  '33333333-3333-3333-3333-333333333333',
  '44444444-4444-4444-4444-444444444444',
  '55555555-5555-5555-5555-555555555555',
  '66666666-6666-6666-6666-666666666666',
  '77777777-7777-7777-7777-777777777777',
  '88888888-8888-8888-8888-888888888888'
);

DELETE FROM public.sharing_options WHERE property_id IN (
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  '33333333-3333-3333-3333-333333333333',
  '44444444-4444-4444-4444-444444444444',
  '55555555-5555-5555-5555-555555555555',
  '66666666-6666-6666-6666-666666666666',
  '77777777-7777-7777-7777-777777777777',
  '88888888-8888-8888-8888-888888888888'
);

DELETE FROM public.properties WHERE id IN (
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  '33333333-3333-3333-3333-333333333333',
  '44444444-4444-4444-4444-444444444444',
  '55555555-5555-5555-5555-555555555555',
  '66666666-6666-6666-6666-666666666666',
  '77777777-7777-7777-7777-777777777777',
  '88888888-8888-8888-8888-888888888888'
);

-- 1. INSERT PROPERTIES

INSERT INTO public.properties (
  id, owner_id, name, area, city, gender_preference, property_type,
  starting_rent, security_deposit, amenities, food_available, food_type,
  meals_provided, house_rules, rating, reviews_count, available_from,
  availability_status, featured, nearby_companies, nearby_colleges,
  nearby_metro, latitude, longitude, verified, highlights
) VALUES (
  '11111111-1111-1111-1111-111111111111',
  NULL,
  'Stanza Living Dublin House',
  'Koramangala',
  'Bangalore',
  'Unisex',
  'Co-Living',
  9500,
  15000,
  '{"Wifi","AC","Food","Parking","Gym","CCTV","Laundry","TV","PowerBackup","Housekeeping","HotWater"}',
  true,
  'Both',
  '{"Breakfast","Lunch","Dinner"}',
  '{"Gate closes at 11:30 PM","No external visitors allowed overnight","No smoking in common areas","No pets allowed","Keep noise levels low after 10 PM"}',
  4.8,
  142,
  '2026-07-10',
  'Available',
  true,
  '{"Wipro (1.5 km)","Flipkart (2.3 km)","Microsoft (3.0 km)"}',
  '{"Christ University (1.2 km)","St. John's Medical College (0.8 km)"}',
  '{"Koramangala Metro Station (Proposed) (0.5 km)","Trinity Metro Station (4.2 km)"}',
  12.9352,
  77.6244,
  true,
  '{"2 min from Sony World Junction","Premium Gym Access","Delicious Veg & Non-Veg Meals"}'
);

INSERT INTO public.properties (
  id, owner_id, name, area, city, gender_preference, property_type,
  starting_rent, security_deposit, amenities, food_available, food_type,
  meals_provided, house_rules, rating, reviews_count, available_from,
  availability_status, featured, nearby_companies, nearby_colleges,
  nearby_metro, latitude, longitude, verified, highlights
) VALUES (
  '22222222-2222-2222-2222-222222222222',
  NULL,
  'Comfort Ladies PG',
  'HSR Layout',
  'Bangalore',
  'Female',
  'PG',
  5500,
  10000,
  '{"Wifi","Food","CCTV","Laundry","PowerBackup","Housekeeping","HotWater"}',
  true,
  'Veg',
  '{"Breakfast","Dinner"}',
  '{"Gate closes at 10:00 PM","Only female guests/parents allowed during daytime","Strictly no smoking or drinking","No pets allowed"}',
  4.2,
  64,
  '2026-07-05',
  'Limited',
  true,
  '{"Startups in HSR Sector 6 (0.8 km)","TCS HSR Office (2.0 km)"}',
  '{"NIFT Bangalore (1.1 km)","Oxford College of Science (2.5 km)"}',
  '{"Silk Board Metro Station (1.5 km)","HSR Layout Metro Station (1.2 km)"}',
  12.91,
  77.645,
  true,
  '{"Walking distance to NIFT","Strict 3-Tier Security","Homely South Indian Food"}'
);

INSERT INTO public.properties (
  id, owner_id, name, area, city, gender_preference, property_type,
  starting_rent, security_deposit, amenities, food_available, food_type,
  meals_provided, house_rules, rating, reviews_count, available_from,
  availability_status, featured, nearby_companies, nearby_colleges,
  nearby_metro, latitude, longitude, verified, highlights
) VALUES (
  '33333333-3333-3333-3333-333333333333',
  NULL,
  'Sri Sai PG for Men',
  'Whitefield',
  'Bangalore',
  'Male',
  'PG',
  4800,
  5000,
  '{"Wifi","Food","Parking","CCTV","PowerBackup","Housekeeping","HotWater","TV"}',
  true,
  'Both',
  '{"Breakfast","Lunch","Dinner"}',
  '{"No curfew timings","No female guests inside rooms","Alcohol strictly forbidden inside premises"}',
  4,
  88,
  '2026-07-02',
  'Available',
  false,
  '{"ITPL (1.2 km)","Oracle (2.5 km)","Sigma Tech Park (3.0 km)"}',
  '{"MVJ College of Engineering (3.5 km)","Vydehi Institute (2.1 km)"}',
  '{"ITPL Metro Station (1.0 km)","Kadugodi Metro Station (2.0 km)"}',
  12.9698,
  77.7499,
  true,
  '{"10 mins walk to ITPL","No Curfew","Biometric Entry System"}'
);

INSERT INTO public.properties (
  id, owner_id, name, area, city, gender_preference, property_type,
  starting_rent, security_deposit, amenities, food_available, food_type,
  meals_provided, house_rules, rating, reviews_count, available_from,
  availability_status, featured, nearby_companies, nearby_colleges,
  nearby_metro, latitude, longitude, verified, highlights
) VALUES (
  '44444444-4444-4444-4444-444444444444',
  NULL,
  'Zolo Stay Coliving Zenith',
  'Marathahalli',
  'Bangalore',
  'Unisex',
  'Co-Living',
  7000,
  12000,
  '{"Wifi","AC","Food","Parking","Gym","CCTV","Laundry","TV","PowerBackup","Housekeeping","HotWater"}',
  true,
  'Both',
  '{"Breakfast","Dinner"}',
  '{"Gate closes at 12:00 AM","Guests allowed until 8:00 PM","Maintain cleanliness in common kitchen"}',
  4.6,
  215,
  '2026-07-08',
  'Limited',
  true,
  '{"JPMorgan Chase (1.0 km)","Intel (1.8 km)","Cisco (2.5 km)"}',
  '{"New Horizon College of Engineering (2.0 km)"}',
  '{"Kundanahalli Metro Station (1.5 km)","Marathahalli Metro Station (0.8 km)"}',
  12.9562,
  77.7011,
  true,
  '{"Close to Outer Ring Road companies","Professional Housekeeping","PlayStation Zone in Lounge"}'
);

INSERT INTO public.properties (
  id, owner_id, name, area, city, gender_preference, property_type,
  starting_rent, security_deposit, amenities, food_available, food_type,
  meals_provided, house_rules, rating, reviews_count, available_from,
  availability_status, featured, nearby_companies, nearby_colleges,
  nearby_metro, latitude, longitude, verified, highlights
) VALUES (
  '55555555-5555-5555-5555-555555555555',
  NULL,
  'Olive Suites Indiranagar',
  'Indiranagar',
  'Bangalore',
  'Unisex',
  'Hostel',
  14000,
  25000,
  '{"Wifi","AC","Parking","CCTV","Laundry","TV","PowerBackup","Housekeeping","HotWater"}',
  false,
  'Both',
  '{}',
  '{"No curfew","Visitors allowed in rooms, overnight stay requires prior permission","Pet friendly (on request)","Strict waste segregation rules"}',
  4.9,
  57,
  '2026-07-15',
  'Available',
  true,
  '{"Microsoft Signature Office (2.1 km)","Indiranagar Startups (0.5 km)"}',
  '{"Gitam University Bangalore Campus (9.0 km)"}',
  '{"Indiranagar Metro Station (0.4 km)","Halasuru Metro Station (1.8 km)"}',
  12.9718,
  77.6412,
  true,
  '{"4 mins walk to Metro Station","Surrounded by Cafes and Pubs","Pet Friendly Rooms"}'
);

INSERT INTO public.properties (
  id, owner_id, name, area, city, gender_preference, property_type,
  starting_rent, security_deposit, amenities, food_available, food_type,
  meals_provided, house_rules, rating, reviews_count, available_from,
  availability_status, featured, nearby_companies, nearby_colleges,
  nearby_metro, latitude, longitude, verified, highlights
) VALUES (
  '66666666-6666-6666-6666-666666666666',
  NULL,
  'Adarsh Men''s Executive PG',
  'BTM Layout',
  'Bangalore',
  'Male',
  'PG',
  4500,
  4000,
  '{"Wifi","Food","Parking","CCTV","Laundry","TV","PowerBackup","Housekeeping","HotWater"}',
  true,
  'Both',
  '{"Breakfast","Lunch","Dinner"}',
  '{"Gate closes at 11:00 PM","No external guests allowed inside rooms","No smoking/alcohol inside PG premises"}',
  4.1,
  112,
  '2026-07-02',
  'Available',
  false,
  '{"Oracle BTM (1.5 km)","Accenture Bannerghatta (3.0 km)"}',
  '{"Alliance Business Academy (2.2 km)","Christ University (3.5 km)"}',
  '{"BTM Layout Metro Station (0.8 km)","Rashtreeya Vidyalaya Road Metro (2.8 km)"}',
  12.9166,
  77.6101,
  false,
  '{"Super affordable starting price","Unlimited Wi-Fi","3-time home style meals"}'
);

INSERT INTO public.properties (
  id, owner_id, name, area, city, gender_preference, property_type,
  starting_rent, security_deposit, amenities, food_available, food_type,
  meals_provided, house_rules, rating, reviews_count, available_from,
  availability_status, featured, nearby_companies, nearby_colleges,
  nearby_metro, latitude, longitude, verified, highlights
) VALUES (
  '77777777-7777-7777-7777-777777777777',
  NULL,
  'Elite Co-Living Electronic City',
  'Electronic City',
  'Bangalore',
  'Unisex',
  'Co-Living',
  6000,
  10000,
  '{"Wifi","AC","Food","Parking","Gym","CCTV","Laundry","TV","PowerBackup","Housekeeping","HotWater"}',
  true,
  'Both',
  '{"Breakfast","Dinner"}',
  '{"Gate closes at 12:00 AM","Visitors allowed in common areas","Keep common spaces tidy"}',
  4.5,
  95,
  '2026-07-01',
  'Available',
  false,
  '{"Infosys Gate 1 (0.8 km)","Wipro Electronic City (1.2 km)","HP (2.0 km)"}',
  '{"IIIT Bangalore (1.5 km)","Symbiosis Institute (2.2 km)"}',
  '{"Electronic City Metro Station (1.0 km)"}',
  12.8452,
  77.6635,
  true,
  '{"Walking distance to Infosys","Equipped Gym and Gaming lounge","High speed fiber Wi-Fi"}'
);

INSERT INTO public.properties (
  id, owner_id, name, area, city, gender_preference, property_type,
  starting_rent, security_deposit, amenities, food_available, food_type,
  meals_provided, house_rules, rating, reviews_count, available_from,
  availability_status, featured, nearby_companies, nearby_colleges,
  nearby_metro, latitude, longitude, verified, highlights
) VALUES (
  '88888888-8888-8888-8888-888888888888',
  NULL,
  'Nesta Ladies PG Bellandur',
  'Bellandur',
  'Bangalore',
  'Female',
  'PG',
  6500,
  12000,
  '{"Wifi","Food","CCTV","Laundry","TV","PowerBackup","Housekeeping","HotWater"}',
  true,
  'Veg',
  '{"Breakfast","Lunch","Dinner"}',
  '{"Gate closes at 10:30 PM","No male visitors inside rooms","Inform warden if coming late"}',
  4.4,
  131,
  '2026-07-04',
  'Limited',
  true,
  '{"EcoSpace (0.6 km)","Intel EcoWorld (1.2 km)","Honeywell (2.0 km)"}',
  '{"Krupanidhi College (3.0 km)"}',
  '{"Bellandur Metro Station (Under Construction) (0.5 km)"}',
  12.9279,
  77.6796,
  true,
  '{"Opposite EcoSpace Tech Park","Highly Secured Women's Facility","Nutritious North & South Indian meals"}'
);

-- 2. INSERT SHARING OPTIONS
INSERT INTO public.sharing_options (property_id, sharing_type, rent, available_beds) VALUES ('11111111-1111-1111-1111-111111111111', 'single', 18000, 2);
INSERT INTO public.sharing_options (property_id, sharing_type, rent, available_beds) VALUES ('11111111-1111-1111-1111-111111111111', 'double', 12000, 4);
INSERT INTO public.sharing_options (property_id, sharing_type, rent, available_beds) VALUES ('11111111-1111-1111-1111-111111111111', 'triple', 9500, 6);
INSERT INTO public.sharing_options (property_id, sharing_type, rent, available_beds) VALUES ('22222222-2222-2222-2222-222222222222', 'single', 12000, 2);
INSERT INTO public.sharing_options (property_id, sharing_type, rent, available_beds) VALUES ('22222222-2222-2222-2222-222222222222', 'double', 7500, 4);
INSERT INTO public.sharing_options (property_id, sharing_type, rent, available_beds) VALUES ('22222222-2222-2222-2222-222222222222', 'triple', 5500, 6);
INSERT INTO public.sharing_options (property_id, sharing_type, rent, available_beds) VALUES ('33333333-3333-3333-3333-333333333333', 'single', 11000, 2);
INSERT INTO public.sharing_options (property_id, sharing_type, rent, available_beds) VALUES ('33333333-3333-3333-3333-333333333333', 'double', 6500, 4);
INSERT INTO public.sharing_options (property_id, sharing_type, rent, available_beds) VALUES ('33333333-3333-3333-3333-333333333333', 'triple', 4800, 6);
INSERT INTO public.sharing_options (property_id, sharing_type, rent, available_beds) VALUES ('44444444-4444-4444-4444-444444444444', 'single', 15000, 2);
INSERT INTO public.sharing_options (property_id, sharing_type, rent, available_beds) VALUES ('44444444-4444-4444-4444-444444444444', 'double', 9000, 4);
INSERT INTO public.sharing_options (property_id, sharing_type, rent, available_beds) VALUES ('44444444-4444-4444-4444-444444444444', 'triple', 7000, 6);
INSERT INTO public.sharing_options (property_id, sharing_type, rent, available_beds) VALUES ('55555555-5555-5555-5555-555555555555', 'single', 22000, 2);
INSERT INTO public.sharing_options (property_id, sharing_type, rent, available_beds) VALUES ('55555555-5555-5555-5555-555555555555', 'double', 14000, 4);
INSERT INTO public.sharing_options (property_id, sharing_type, rent, available_beds) VALUES ('66666666-6666-6666-6666-666666666666', 'single', 10000, 2);
INSERT INTO public.sharing_options (property_id, sharing_type, rent, available_beds) VALUES ('66666666-6666-6666-6666-666666666666', 'double', 6000, 4);
INSERT INTO public.sharing_options (property_id, sharing_type, rent, available_beds) VALUES ('66666666-6666-6666-6666-666666666666', 'triple', 4500, 6);
INSERT INTO public.sharing_options (property_id, sharing_type, rent, available_beds) VALUES ('77777777-7777-7777-7777-777777777777', 'single', 14000, 2);
INSERT INTO public.sharing_options (property_id, sharing_type, rent, available_beds) VALUES ('77777777-7777-7777-7777-777777777777', 'double', 8000, 4);
INSERT INTO public.sharing_options (property_id, sharing_type, rent, available_beds) VALUES ('77777777-7777-7777-7777-777777777777', 'triple', 6000, 6);
INSERT INTO public.sharing_options (property_id, sharing_type, rent, available_beds) VALUES ('88888888-8888-8888-8888-888888888888', 'single', 14500, 2);
INSERT INTO public.sharing_options (property_id, sharing_type, rent, available_beds) VALUES ('88888888-8888-8888-8888-888888888888', 'double', 8500, 4);
INSERT INTO public.sharing_options (property_id, sharing_type, rent, available_beds) VALUES ('88888888-8888-8888-8888-888888888888', 'triple', 6500, 6);

-- 3. INSERT PROPERTY IMAGES
INSERT INTO public.property_images (property_id, image_url, is_cover, sort_order) VALUES ('11111111-1111-1111-1111-111111111111', 'https://picsum.photos/800/500?random=1', true, 0);
INSERT INTO public.property_images (property_id, image_url, is_cover, sort_order) VALUES ('11111111-1111-1111-1111-111111111111', 'https://picsum.photos/800/500?random=11', false, 1);
INSERT INTO public.property_images (property_id, image_url, is_cover, sort_order) VALUES ('11111111-1111-1111-1111-111111111111', 'https://picsum.photos/800/500?random=12', false, 2);
INSERT INTO public.property_images (property_id, image_url, is_cover, sort_order) VALUES ('11111111-1111-1111-1111-111111111111', 'https://picsum.photos/800/500?random=13', false, 3);
INSERT INTO public.property_images (property_id, image_url, is_cover, sort_order) VALUES ('11111111-1111-1111-1111-111111111111', 'https://picsum.photos/800/500?random=14', false, 4);
INSERT INTO public.property_images (property_id, image_url, is_cover, sort_order) VALUES ('22222222-2222-2222-2222-222222222222', 'https://picsum.photos/800/500?random=2', true, 0);
INSERT INTO public.property_images (property_id, image_url, is_cover, sort_order) VALUES ('22222222-2222-2222-2222-222222222222', 'https://picsum.photos/800/500?random=21', false, 1);
INSERT INTO public.property_images (property_id, image_url, is_cover, sort_order) VALUES ('22222222-2222-2222-2222-222222222222', 'https://picsum.photos/800/500?random=22', false, 2);
INSERT INTO public.property_images (property_id, image_url, is_cover, sort_order) VALUES ('22222222-2222-2222-2222-222222222222', 'https://picsum.photos/800/500?random=23', false, 3);
INSERT INTO public.property_images (property_id, image_url, is_cover, sort_order) VALUES ('33333333-3333-3333-3333-333333333333', 'https://picsum.photos/800/500?random=3', true, 0);
INSERT INTO public.property_images (property_id, image_url, is_cover, sort_order) VALUES ('33333333-3333-3333-3333-333333333333', 'https://picsum.photos/800/500?random=31', false, 1);
INSERT INTO public.property_images (property_id, image_url, is_cover, sort_order) VALUES ('33333333-3333-3333-3333-333333333333', 'https://picsum.photos/800/500?random=32', false, 2);
INSERT INTO public.property_images (property_id, image_url, is_cover, sort_order) VALUES ('44444444-4444-4444-4444-444444444444', 'https://picsum.photos/800/500?random=4', true, 0);
INSERT INTO public.property_images (property_id, image_url, is_cover, sort_order) VALUES ('44444444-4444-4444-4444-444444444444', 'https://picsum.photos/800/500?random=41', false, 1);
INSERT INTO public.property_images (property_id, image_url, is_cover, sort_order) VALUES ('44444444-4444-4444-4444-444444444444', 'https://picsum.photos/800/500?random=42', false, 2);
INSERT INTO public.property_images (property_id, image_url, is_cover, sort_order) VALUES ('44444444-4444-4444-4444-444444444444', 'https://picsum.photos/800/500?random=43', false, 3);
INSERT INTO public.property_images (property_id, image_url, is_cover, sort_order) VALUES ('55555555-5555-5555-5555-555555555555', 'https://picsum.photos/800/500?random=5', true, 0);
INSERT INTO public.property_images (property_id, image_url, is_cover, sort_order) VALUES ('55555555-5555-5555-5555-555555555555', 'https://picsum.photos/800/500?random=51', false, 1);
INSERT INTO public.property_images (property_id, image_url, is_cover, sort_order) VALUES ('55555555-5555-5555-5555-555555555555', 'https://picsum.photos/800/500?random=52', false, 2);
INSERT INTO public.property_images (property_id, image_url, is_cover, sort_order) VALUES ('66666666-6666-6666-6666-666666666666', 'https://picsum.photos/800/500?random=6', true, 0);
INSERT INTO public.property_images (property_id, image_url, is_cover, sort_order) VALUES ('66666666-6666-6666-6666-666666666666', 'https://picsum.photos/800/500?random=61', false, 1);
INSERT INTO public.property_images (property_id, image_url, is_cover, sort_order) VALUES ('77777777-7777-7777-7777-777777777777', 'https://picsum.photos/800/500?random=7', true, 0);
INSERT INTO public.property_images (property_id, image_url, is_cover, sort_order) VALUES ('77777777-7777-7777-7777-777777777777', 'https://picsum.photos/800/500?random=71', false, 1);
INSERT INTO public.property_images (property_id, image_url, is_cover, sort_order) VALUES ('77777777-7777-7777-7777-777777777777', 'https://picsum.photos/800/500?random=72', false, 2);
INSERT INTO public.property_images (property_id, image_url, is_cover, sort_order) VALUES ('88888888-8888-8888-8888-888888888888', 'https://picsum.photos/800/500?random=8', true, 0);
INSERT INTO public.property_images (property_id, image_url, is_cover, sort_order) VALUES ('88888888-8888-8888-8888-888888888888', 'https://picsum.photos/800/500?random=81', false, 1);
INSERT INTO public.property_images (property_id, image_url, is_cover, sort_order) VALUES ('88888888-8888-8888-8888-888888888888', 'https://picsum.photos/800/500?random=82', false, 2);
