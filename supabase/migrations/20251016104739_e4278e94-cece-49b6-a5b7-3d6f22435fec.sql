-- Add category and slug columns to newsletters table
ALTER TABLE public.newsletters 
ADD COLUMN category text NOT NULL DEFAULT 'Capital Markets',
ADD COLUMN slug text;

-- Generate slugs for existing articles from their titles
UPDATE public.newsletters
SET slug = lower(regexp_replace(regexp_replace(title, '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g'))
WHERE slug IS NULL;

-- Make slug NOT NULL and unique after populating
ALTER TABLE public.newsletters 
ALTER COLUMN slug SET NOT NULL,
ADD CONSTRAINT newsletters_slug_unique UNIQUE (slug);

-- Create index on category for better performance
CREATE INDEX idx_newsletters_category ON public.newsletters(category);

-- Create index on slug for faster lookups
CREATE INDEX idx_newsletters_slug ON public.newsletters(slug);