import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Article {
  id: string;
  title: string;
  content: string; // Used as summary
  author: string;
  published_date: string;
  thumbnail_url: string | null;
  category: string;
  file_url: string | null;
}

const CATEGORIES = [
  "AI/ML",
  "Quantitative Research", 
  "Capital Markets",
  "Portfolio Management"
] as const;

const Articles = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  useEffect(() => {
    const fetchData = async () => {
      // Check if user is admin
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: roleData } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .eq("role", "admin")
          .maybeSingle();

        if (roleData) {
          setIsAdmin(true);
        }
      }

      // Fetch articles
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("published_date", { ascending: false });

      if (error) {
        console.error("Error fetching articles:", error);
      } else {
        setArticles(data || []);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const filteredArticles = activeCategory === "all" 
    ? articles 
    : articles.filter(a => a.category === activeCategory);

  const handleDownload = (fileUrl: string, title: string) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = `${title}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light via-white to-brand-light py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h1 className="text-5xl font-gloock text-brand-primary mb-4">Research Papers</h1>
            <p className="text-lg text-brand-text">
              Research publications from our four divisions
            </p>
          </div>
          {isAdmin && (
            <Button onClick={() => navigate("/admin/article")} className="self-center md:self-auto">
              <Plus className="h-4 w-4 mr-2" />
              Upload Paper
            </Button>
          )}
        </div>

        {/* Category Tabs */}
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
          <TabsList className="grid w-full grid-cols-5 h-auto">
            <TabsTrigger value="all" className="text-xs sm:text-sm py-2">All</TabsTrigger>
            {CATEGORIES.map((cat) => (
              <TabsTrigger key={cat} value={cat} className="text-xs sm:text-sm py-2">
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-brand-text">Loading papers...</p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-brand-text">
                {activeCategory === "all" 
                  ? "No research papers published yet. Check back soon!"
                  : `No papers in ${activeCategory} yet. Check back soon!`}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {filteredArticles.map((article) => (
              <Card 
                key={article.id} 
                className="border-none hover:shadow-lg transition-shadow overflow-hidden cursor-pointer"
                onClick={() => navigate(`/articles/${article.id}`)}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {article.thumbnail_url && (
                    <div className="w-full h-48 md:w-48 md:h-48 flex-shrink-0">
                      <img 
                        src={article.thumbnail_url} 
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium px-2 py-1 bg-brand-accent/10 text-brand-accent rounded">
                          {article.category}
                        </span>
                      </div>
                      <CardTitle className="text-3xl font-gloock text-brand-primary mb-3">
                        {article.title}
                      </CardTitle>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>{article.author}</span>
                        <Separator orientation="vertical" className="h-4" />
                        <span>{formatDate(article.published_date)}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-brand-text line-clamp-3 mb-4">
                        {article.content}
                      </p>
                      {isAdmin && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/admin/article/edit/${article.id}`);
                          }}
                        >
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      )}
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Articles;