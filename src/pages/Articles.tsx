import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

interface Newsletter {
  id: string;
  title: string;
  content: string;
  author: string;
  published_date: string;
  thumbnail_url: string | null;
}

const Articles = () => {
  const navigate = useNavigate();
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

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

      // Fetch newsletters
      const { data, error } = await supabase
        .from("newsletters")
        .select("*")
        .order("published_date", { ascending: false });

      if (error) {
        console.error("Error fetching articles:", error);
      } else {
        setNewsletters(data || []);
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

  const getPreview = (content: string) => {
    const div = document.createElement("div");
    div.innerHTML = content;
    const text = div.textContent || div.innerText || "";
    return text.substring(0, 150) + (text.length > 150 ? "..." : "");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light via-white to-brand-light py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-gloock text-brand-primary mb-4 text-center">Articles</h1>
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
                className="border-none hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {newsletter.thumbnail_url && (
                    <div 
                      className="w-full h-48 md:w-48 md:h-48 flex-shrink-0 cursor-pointer"
                      onClick={() => navigate(`/articles/${newsletter.id}`)}
                    >
                      <img 
                        src={newsletter.thumbnail_url} 
                        alt={newsletter.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div 
                    className="flex-1 cursor-pointer"
                    onClick={() => navigate(`/articles/${newsletter.id}`)}
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
                  </div>
                  {isAdmin && (
                    <div className="flex items-start p-6">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/admin/newsletter/edit/${newsletter.id}`);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
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
