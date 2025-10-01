-- Create storage bucket for newsletter images
INSERT INTO storage.buckets (id, name, public)
VALUES ('newsletter-images', 'newsletter-images', true);

-- Create storage policies for newsletter images
CREATE POLICY "Anyone can view newsletter images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'newsletter-images');

CREATE POLICY "Admins can upload newsletter images"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'newsletter-images' 
  AND is_admin(auth.uid())
);

CREATE POLICY "Admins can update newsletter images"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'newsletter-images' 
  AND is_admin(auth.uid())
);

CREATE POLICY "Admins can delete newsletter images"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'newsletter-images' 
  AND is_admin(auth.uid())
);