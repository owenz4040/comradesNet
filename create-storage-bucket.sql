-- Create public storage bucket for images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'public-assets',
  'public-assets',
  true,
  52428800, -- 50MB
  ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/webp']::text[]
) ON CONFLICT (id) DO NOTHING;

-- Create storage policy for public read access
CREATE POLICY IF NOT EXISTS "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'public-assets');

-- Create storage policy for authenticated uploads
CREATE POLICY IF NOT EXISTS "Authenticated Upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'public-assets' AND auth.role() = 'authenticated');

-- Create storage policy for authenticated updates
CREATE POLICY IF NOT EXISTS "Authenticated Update"
ON storage.objects FOR UPDATE
USING (bucket_id = 'public-assets' AND auth.role() = 'authenticated');
