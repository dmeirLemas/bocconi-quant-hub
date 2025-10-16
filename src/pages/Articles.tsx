import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Newsletter {
  id: string;
  title: string;
  content: string;
  author: string;
  published_date: string;
  slug: string;
  category: string;
}

const Articles = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);

  const categoryName = category?.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ') || 'All Articles';

  useEffect(() => {
    const fetchNewsletters = async () => {
      let query = supabase
        .from("newsletters")
        .select("*")
        .order("published_date", { ascending: false });
      
      if (category) {
        query = query.eq("category", categoryName);
      }
      
      const { data, error } = await query;

      if (error) {
        console.error("Error fetching articles:", error);
      } else {
        setNewsletters(data || []);
      }
      setLoading(false);
    };

    fetchNewsletters();
  }, [category, categoryName]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const getPreview = (content: string) => {
    const div = document.createElement("div");
    div.innerHTML = content;
    const text = div.textContent || div.innerText || "";
    return text.substring(0, 150) + (text.length > 150 ? "..." : "");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light via-white to-brand-light py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-gloock text-brand-primary mb-4 text-center">{categoryName}</h1>
        <p className="text-lg text-brand-text text-center mb-12">
          Stay updated with our latest insights and announcements
        </p>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-brand-text">Loading articles...</p>
          </div>
        ) : newsletters.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-brand-text">No articles published yet. Check back soon!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {newsletters.map((newsletter) => (
              <Card 
                key={newsletter.id} 
                className="border border-border cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(`/articles/${newsletter.slug}`)}
              >
                <CardHeader>
                  <CardTitle className="text-3xl font-gloock text-brand-primary mb-3">
                    {newsletter.title}
                  </CardTitle>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span>{newsletter.author}</span>
                    <Separator orientation="vertical" className="h-4" />
                    <span>{formatDate(newsletter.published_date)}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-brand-text line-clamp-3">
                    {getPreview(newsletter.content)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Articles;
