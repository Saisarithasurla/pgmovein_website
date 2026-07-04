-- ============================================================
-- SQL Script: Create Storage Bucket for Property Images
-- Run in: Supabase Dashboard -> SQL Editor -> New Query -> RUN
-- ============================================================

-- 1. Create or Update the storage bucket with enterprise constraints
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'property-images', 
  'property-images', 
  true,
  5242880, -- 5 MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp'] -- Allowed types
)
ON CONFLICT (id) DO UPDATE SET
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp'];

-- 2. Allow public read access to the bucket
CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'property-images');

-- 3. Allow authenticated agents to insert files (MUST own the file)
CREATE POLICY "Agents can upload images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'property-images' AND auth.uid() = owner);

-- 4. Allow authenticated agents to update their files (MUST own the file)
CREATE POLICY "Agents can update their images"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'property-images' AND auth.uid() = owner);

-- 5. Allow authenticated agents to delete their files (MUST own the file)
CREATE POLICY "Agents can delete their images"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'property-images' AND auth.uid() = owner);
