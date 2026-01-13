-- Create articles table for scientific articles (separate from newsletters)
CREATE TABLE public.articles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    content text NOT NULL,
    author text NOT NULL,
    slug text NOT NULL UNIQUE,
    thumbnail_url text,
    published_date timestamp with time zone NOT NULL DEFAULT now(),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for articles
CREATE POLICY "Anyone can view articles" 
ON public.articles 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can insert articles" 
ON public.articles 
FOR INSERT 
WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins can update articles" 
ON public.articles 
FOR UPDATE 
USING (is_admin(auth.uid()));

CREATE POLICY "Admins can delete articles" 
ON public.articles 
FOR DELETE 
USING (is_admin(auth.uid()));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_articles_updated_at
BEFORE UPDATE ON public.articles
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Create storage bucket for article images (extracted from documents)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('article-images', 'article-images', true);

-- Storage policies for article images
CREATE POLICY "Article images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'article-images');

CREATE POLICY "Admins can upload article images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'article-images');

CREATE POLICY "Admins can update article images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'article-images');

CREATE POLICY "Admins can delete article images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'article-images');