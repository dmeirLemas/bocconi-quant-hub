import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { FileText, Eye, ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

const articleSchema = z.object({
  title: z.string().trim().min(1, { message: "Title is required" }).max(200),
  content: z.string().trim().min(1, { message: "Content is required" }),
  author: z.string().trim().min(1, { message: "Author is required" }).max(100)
});

const AdminArticleEdit = () => {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const [existingThumbnail, setExistingThumbnail] = useState<string>("");
  const [activeTab, setActiveTab] = useState("write");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      setUser(session.user);

      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (!roleData) {
        toast({
          title: "Access Denied",
          description: "You do not have admin privileges",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      setIsAdmin(true);

      // Fetch article data
      const { data: article, error } = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error || !article) {
        toast({
          title: "Error",
          description: "Article not found",
          variant: "destructive",
        });
        navigate("/articles");
        return;
      }

      setTitle(article.title);
      setContent(article.content);
      setAuthor(article.author);
      if (article.thumbnail_url) {
        setExistingThumbnail(article.thumbnail_url);
        setThumbnailPreview(article.thumbnail_url);
      }

      setLoading(false);
    };

    checkAuthAndFetch();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [id, navigate, toast]);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validated = articleSchema.parse({ title, content, author });
      setSubmitting(true);

      let thumbnailUrl = existingThumbnail;

      // Upload new thumbnail if provided
      if (thumbnail) {
        const fileExt = thumbnail.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `thumbnails/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("article-images")
          .upload(filePath, thumbnail);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("article-images")
          .getPublicUrl(filePath);

        thumbnailUrl = publicUrl;
      }

      const slug = generateSlug(validated.title);

      const { error } = await supabase
        .from("articles")
        .update({
          title: validated.title,
          content: validated.content,
          author: validated.author,
          slug: slug,
          thumbnail_url: thumbnailUrl || null,
        })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Article updated successfully",
      });

      navigate("/articles");
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        console.error("Error updating:", error);
        toast({
          title: "Error",
          description: "Failed to update article",
          variant: "destructive",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-brand-text">Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light via-white to-brand-light py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/articles")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-4xl font-gloock text-brand-primary">Edit Article</h1>
          </div>
          <Button onClick={handleSignOut} variant="outline">
            Sign Out
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-gloock flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Edit Scientific Article
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Article title"
                  required
                  maxLength={200}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Author name"
                  required
                  maxLength={100}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="thumbnail">Article Thumbnail</Label>
                <Input
                  id="thumbnail"
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                />
                {thumbnailPreview && (
                  <div className="mt-2">
                    <img 
                      src={thumbnailPreview} 
                      alt="Thumbnail preview" 
                      className="max-w-xs rounded-lg"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content (Markdown with LaTeX support)</Label>
                <p className="text-xs text-muted-foreground mb-2">
                  Use $...$ for inline math and $$...$$ for block equations. 
                  Example: $E = mc^2$ or $$\int_0^\infty e^{"{-x^2}"} dx = \frac{"{\\sqrt{\\pi}}{2}"}$$
                </p>
                
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="write">Write</TabsTrigger>
                    <TabsTrigger value="preview" className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      Preview
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="write">
                    <Textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Write your article content in Markdown..."
                      className="min-h-[400px] font-mono"
                    />
                  </TabsContent>
                  <TabsContent value="preview">
                    <div className="border rounded-md p-4 min-h-[400px] prose prose-sm max-w-none bg-white overflow-auto">
                      {content ? (
                        <ReactMarkdown
                          remarkPlugins={[remarkMath]}
                          rehypePlugins={[rehypeKatex]}
                          components={{
                            img: ({ src, alt }) => (
                              <img
                                src={src}
                                alt={alt || ""}
                                className="max-w-full h-auto rounded-lg my-4"
                              />
                            ),
                          }}
                        >
                          {content}
                        </ReactMarkdown>
                      ) : (
                        <p className="text-muted-foreground">Nothing to preview yet...</p>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <Button type="submit" disabled={submitting} className="w-full">
                {submitting ? "Updating..." : "Update Article"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminArticleEdit;
