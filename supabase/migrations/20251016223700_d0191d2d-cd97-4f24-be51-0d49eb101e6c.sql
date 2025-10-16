-- Add thumbnail_url column to newsletters table
ALTER TABLE public.newsletters 
ADD COLUMN thumbnail_url TEXT;

-- Add comment
COMMENT ON COLUMN public.newsletters.thumbnail_url IS 'URL of the article thumbnail image';