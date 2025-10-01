import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
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
} from "@/components/ui/alert-dialog";

interface Newsletter {
  id: string;
  title: string;
  content: string;
  author: string;
  published_date: string;
}

const Newsletters = () => {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: roleData } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .eq("role", "admin")
          .maybeSingle();
        
        setIsAdmin(!!roleData);
      }
    };

    const fetchNewsletters = async () => {
      const { data, error } = await supabase
        .from("newsletters")
        .select("*")
        .order("published_date", { ascending: false });

      if (error) {
        console.error("Error fetching newsletters:", error);
      } else {
        setNewsletters(data || []);
      }
      setLoading(false);
    };

    checkAdmin();
    fetchNewsletters();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    const { error } = await supabase
      .from("newsletters")
      .delete()
      .eq("id", deleteId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete newsletter",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Newsletter deleted successfully",
      });
      setNewsletters(newsletters.filter((n) => n.id !== deleteId));
    }
    setDeleteId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light via-white to-brand-light py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-gloock text-brand-primary mb-4 text-center">Newsletters</h1>
        <p className="text-lg text-brand-text text-center mb-12">
          Stay updated with our latest insights and announcements
        </p>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-brand-text">Loading newsletters...</p>
          </div>
        ) : newsletters.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-brand-text">No newsletters published yet. Check back soon!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {newsletters.map((newsletter) => (
              <Card key={newsletter.id} className="border border-brand-secondary">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-3xl font-gloock text-brand-primary mb-2">
                        {newsletter.title}
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-brand-secondary">
                        <span>By {newsletter.author}</span>
                        <Separator orientation="vertical" className="h-4" />
                        <span>{formatDate(newsletter.published_date)}</span>
                      </div>
                    </div>
                    {isAdmin && (
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => setDeleteId(newsletter.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div 
                    className="prose prose-lg max-w-none text-brand-text"
                    dangerouslySetInnerHTML={{ __html: newsletter.content }}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Newsletter</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this newsletter? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Newsletters;
