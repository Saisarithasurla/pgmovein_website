-- ============================================================
-- SQL Script: Create 'properties' table for Agent-Added PGs
-- Run in: Supabase Dashboard -> SQL Editor -> New Query -> RUN
-- ============================================================

CREATE TABLE IF NOT EXISTS properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    area VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL DEFAULT 'Bangalore',
    gender VARCHAR(10) NOT NULL CHECK (gender IN ('Male', 'Female', 'Unisex', '1BHK', '2BHK', '3BHK')),
    type VARCHAR(20) NOT NULL CHECK (type IN ('PG', 'Flat')),
    sharing_single INTEGER,
    sharing_double INTEGER,
    sharing_triple INTEGER,
    starting_rent INTEGER NOT NULL,
    security_deposit INTEGER NOT NULL DEFAULT 0,
    amenities TEXT[] DEFAULT '{}',
    food_available BOOLEAN DEFAULT false,
    food_type VARCHAR(10) DEFAULT 'Veg' CHECK (food_type IN ('Veg', 'NonVeg', 'Both')),
    food_meals TEXT[] DEFAULT '{}',
    house_rules TEXT[] DEFAULT '{}',
    images TEXT[] DEFAULT '{}',
    rating NUMERIC(2,1) DEFAULT 4.0,
    reviews INTEGER DEFAULT 0,
    available_from DATE DEFAULT CURRENT_DATE,
    availability VARCHAR(20) DEFAULT 'Available' CHECK (availability IN ('Available', 'Limited', 'Full')),
    featured BOOLEAN DEFAULT false,
    nearby_companies TEXT[] DEFAULT '{}',
    nearby_colleges TEXT[] DEFAULT '{}',
    nearby_metro TEXT[] DEFAULT '{}',
    latitude NUMERIC(10,6) DEFAULT 12.9716,
    longitude NUMERIC(10,6) DEFAULT 77.5946,
    address TEXT,
    owner_name VARCHAR(255) NOT NULL,
    verified BOOLEAN DEFAULT false,
    highlights TEXT[] DEFAULT '{}',
    agent_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Agents can only insert their own properties
CREATE POLICY "Agents can insert own properties"
ON properties FOR INSERT TO authenticated
WITH CHECK (auth.uid() = agent_id);

-- Agents can only update their own properties
CREATE POLICY "Agents can update own properties"
ON properties FOR UPDATE TO authenticated
USING (auth.uid() = agent_id);

-- Agents can only delete their own properties
CREATE POLICY "Agents can delete own properties"
ON properties FOR DELETE TO authenticated
USING (auth.uid() = agent_id);

-- Public read access for all properties (website visitors)
CREATE POLICY "Public read access"
ON properties FOR SELECT TO anon, authenticated
USING (true);
