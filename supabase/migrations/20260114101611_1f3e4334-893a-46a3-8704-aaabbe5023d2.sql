-- Add category and file_url columns to articles table
ALTER TABLE public.articles 
ADD COLUMN category text NOT NULL DEFAULT 'AI/ML',
ADD COLUMN file_url text;

-- Add constraint for valid categories
ALTER TABLE public.articles
ADD CONSTRAINT articles_category_check 
CHECK (category IN ('AI/ML', 'Quantitative Research', 'Capital Markets', 'Portfolio Management'));