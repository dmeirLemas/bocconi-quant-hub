import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { Upload, FileText, Eye } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

const articleSchema = z.object({
  title: z.string().trim().min(1, { message: "Title is required" }).max(200),
  content: z.string().trim().min(1, { message: "Content is required" }),
  author: z.string().trim().min(1, { message: "Author is required" }).max(100)
});

const AdminArticle = () => {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const [activeTab, setActiveTab] = useState("write");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
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
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

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

  const handleDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'text/markdown'
    ];

    if (!allowedTypes.includes(file.type) && !file.name.endsWith('.md')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, Word document, or text file",
        variant: "destructive",
      });
      return;
    }

    setParsing(true);

    try {
      // Upload file to storage for processing
      const fileExt = file.name.split(".").pop();
      const fileName = `temp_${Date.now()}.${fileExt}`;
      
      const { error: uploadError, data: uploadData } = await supabase.storage
        .from("article-images")
        .upload(`documents/${fileName}`, file);

      if (uploadError) throw uploadError;

      // Call edge function to parse the document
      const { data: { publicUrl } } = supabase.storage
        .from("article-images")
        .getPublicUrl(`documents/${fileName}`);

      const { data, error } = await supabase.functions.invoke('parse-document', {
        body: { 
          fileUrl: publicUrl,
          fileName: file.name,
          fileType: file.type
        }
      });

      if (error) throw error;

      if (data?.content) {
        setContent(data.content);
        if (data.title) setTitle(data.title);
        if (data.images && data.images.length > 0) {
          // Images are already uploaded and URLs are in the content
          toast({
            title: "Document parsed",
            description: `Extracted content with ${data.images.length} image(s)`,
          });
        } else {
          toast({
            title: "Document parsed",
            description: "Content extracted successfully. You can now edit it.",
          });
        }
      }

      // Clean up temp file
      await supabase.storage
        .from("article-images")
        .remove([`documents/${fileName}`]);

    } catch (error: any) {
      console.error("Error parsing document:", error);
      toast({
        title: "Error parsing document",
        description: error.message || "Failed to parse the document. Try a different format.",
        variant: "destructive",
      });
    } finally {
      setParsing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
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

      let thumbnailUrl = "";

      // Upload thumbnail if provided
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
        .insert([{
          title: validated.title,
          content: validated.content,
          author: validated.author,
          slug: slug,
          thumbnail_url: thumbnailUrl || null,
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Article published successfully",
      });

      setTitle("");
      setContent("");
      setAuthor("");
      setThumbnail(null);
      setThumbnailPreview("");
      navigate("/articles");
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        console.error("Error publishing:", error);
        toast({
          title: "Error",
          description: "Failed to publish article",
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
          <h1 className="text-4xl font-gloock text-brand-primary">Admin - Create Article</h1>
          <Button onClick={handleSignOut} variant="outline">
            Sign Out
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="font-gloock flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Document
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Upload a PDF, Word document, or text file to extract content. 
              Images and formulas will be preserved.
            </p>
            <Input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx,.txt,.md"
              onChange={handleDocumentUpload}
              disabled={parsing}
            />
            {parsing && (
              <p className="text-sm text-brand-accent mt-2">Parsing document...</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-gloock flex items-center gap-2">
              <FileText className="h-5 w-5" />
              New Scientific Article
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
                {submitting ? "Publishing..." : "Publish Article"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminArticle;
