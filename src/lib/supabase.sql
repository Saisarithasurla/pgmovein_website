-- SQL Script to run in Supabase SQL Editor:
-- Go to your Supabase Dashboard -> SQL Editor -> New Query, paste this, and click RUN.

CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    company_name VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    message TEXT,
    lead_source VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'New',
    duplicate_flag VARCHAR(20) DEFAULT 'CLEAN',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Visitor Metadata
    landing_page_url TEXT,
    referrer_url TEXT,
    device_type VARCHAR(50),
    browser VARCHAR(100),
    os VARCHAR(100),
    screen_resolution VARCHAR(50),
    timezone VARCHAR(100),
    
    -- UTM Parameters
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    
    -- Geo IP Info
    geo_country VARCHAR(100),
    geo_region VARCHAR(100)
);

-- Enable Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow Service Role / Admin client full access
CREATE POLICY "Allow service role full access" 
ON leads 
FOR ALL 
TO service_role 
USING (true) 
WITH CHECK (true);
