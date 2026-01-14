import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Trash2, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  published_date: string;
  thumbnail_url: string | null;
  category: string;
  file_url: string | null;
}

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [article, setArticle] = useState<Article | null>(null);
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

      // Fetch article
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching article:", error);
      } else {
        setArticle(data);
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    if (!article) return;

    const { error } = await supabase
      .from("articles")
      .delete()
      .eq("id", article.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete article",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Article deleted successfully",
      });
      navigate("/articles");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-brand-text">Loading article...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-brand-text mb-4">Article not found</p>
        <Button onClick={() => navigate("/articles")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Articles
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light via-white to-brand-light py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Button variant="ghost" onClick={() => navigate("/articles")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Articles
          </Button>
          {isAdmin && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Article</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this article? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>

        {article.thumbnail_url && (
          <img
            src={article.thumbnail_url}
            alt={article.title}
            className="w-full h-64 object-cover rounded-lg mb-8"
          />
        )}

        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm font-medium px-3 py-1 bg-brand-accent/10 text-brand-accent rounded">
            {article.category}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-gloock text-brand-primary mb-4">
          {article.title}
        </h1>

        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-8">
          <span>{article.author}</span>
          <Separator orientation="vertical" className="h-4" />
          <span>{formatDate(article.published_date)}</span>
        </div>

        <div className="prose prose-lg max-w-none article-content mb-8">
          <p className="text-brand-text whitespace-pre-wrap">{article.content}</p>
        </div>

        {article.file_url && (
          <Button 
            size="lg"
            onClick={() => {
              const link = document.createElement('a');
              link.href = article.file_url!;
              link.download = `${article.title}.pdf`;
              link.target = '_blank';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            <Download className="h-4 w-4 mr-2" />
            Download Full Article
          </Button>
        )}
      </div>
    </div>
  );
};

export default ArticleDetail;
