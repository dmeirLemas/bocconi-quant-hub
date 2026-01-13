import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { FileText, Eye, Code, ArrowLeft, Trash2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
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

const articleSchema = z.object({
  title: z.string().trim().min(1, { message: "Title is required" }).max(200),
  content: z.string().trim().min(1, { message: "Content is required" }),
  author: z.string().trim().min(1, { message: "Author is required" }).max(100)
});

const AdminArticleEdit = () => {
  const { id } = useParams();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const [existingThumbnail, setExistingThumbnail] = useState<string>("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

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

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const { error } = await supabase
        .from("articles")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Article deleted successfully",
      });

      navigate("/articles");
    } catch (error) {
      console.error("Error deleting:", error);
      toast({
        title: "Error",
        description: "Failed to delete article",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1e1e1e]">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#1e1e1e] flex flex-col">
      {/* Top Bar */}
      <div className="bg-[#2d2d2d] border-b border-[#404040] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("/articles")}
            className="text-gray-300 hover:text-white hover:bg-[#404040]"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-500" />
            <span className="text-white font-medium">Edit Article</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="ghost"
                size="sm"
                className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
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
                <AlertDialogAction 
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700"
                  disabled={deleting}
                >
                  {deleting ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button 
            onClick={handleSubmit} 
            disabled={submitting}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {submitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Metadata Bar */}
      <div className="bg-[#252526] border-b border-[#404040] px-4 py-3">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <Label htmlFor="title" className="text-gray-400 text-xs mb-1 block">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Article title"
              className="bg-[#1e1e1e] border-[#404040] text-white placeholder:text-gray-500"
              required
              maxLength={200}
            />
          </div>
          <div className="w-48">
            <Label htmlFor="author" className="text-gray-400 text-xs mb-1 block">Author</Label>
            <Input
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Author name"
              className="bg-[#1e1e1e] border-[#404040] text-white placeholder:text-gray-500"
              required
              maxLength={100}
            />
          </div>
          <div className="w-64">
            <Label htmlFor="thumbnail" className="text-gray-400 text-xs mb-1 block">Thumbnail</Label>
            <div className="flex items-center gap-2">
              <Input
                id="thumbnail"
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="bg-[#1e1e1e] border-[#404040] text-white text-xs"
              />
              {thumbnailPreview && (
                <img 
                  src={thumbnailPreview} 
                  alt="Preview" 
                  className="h-8 w-8 object-cover rounded"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor Pane */}
        <div className="w-1/2 flex flex-col border-r border-[#404040]">
          <div className="bg-[#252526] px-4 py-2 border-b border-[#404040] flex items-center gap-2">
            <Code className="h-4 w-4 text-gray-400" />
            <span className="text-gray-300 text-sm font-medium">Source</span>
            <span className="text-gray-500 text-xs">(Markdown + LaTeX)</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your article content..."
              className="w-full h-full resize-none border-0 rounded-none bg-[#1e1e1e] text-gray-200 font-mono text-sm leading-relaxed p-4 focus-visible:ring-0 focus-visible:ring-offset-0"
              style={{ minHeight: '100%' }}
            />
          </div>
        </div>

        {/* Preview Pane */}
        <div className="w-1/2 flex flex-col bg-white">
          <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex items-center gap-2">
            <Eye className="h-4 w-4 text-gray-600" />
            <span className="text-gray-700 text-sm font-medium">Preview</span>
          </div>
          <div className="flex-1 overflow-auto p-8">
            <div className="max-w-3xl mx-auto prose prose-sm">
              {content ? (
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-3xl font-bold text-gray-900 mb-4">{children}</h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">{children}</h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-medium text-gray-700 mt-6 mb-2">{children}</h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-gray-600 leading-relaxed mb-4">{children}</p>
                    ),
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
                <p className="text-gray-400 italic">Start writing to see the preview...</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Quick Reference */}
      <div className="bg-[#252526] border-t border-[#404040] px-4 py-2">
        <div className="flex items-center gap-6 text-xs text-gray-500">
          <span><code className="bg-[#1e1e1e] px-1 rounded">$...$</code> inline math</span>
          <span><code className="bg-[#1e1e1e] px-1 rounded">$$...$$</code> block math</span>
          <span><code className="bg-[#1e1e1e] px-1 rounded"># ## ###</code> headings</span>
          <span><code className="bg-[#1e1e1e] px-1 rounded">**bold**</code> <code className="bg-[#1e1e1e] px-1 rounded">*italic*</code></span>
          <span><code className="bg-[#1e1e1e] px-1 rounded">\\frac&#123;a&#125;&#123;b&#125;</code> fractions</span>
          <span><code className="bg-[#1e1e1e] px-1 rounded">\\int \\sum \\sqrt</code> symbols</span>
        </div>
      </div>
    </div>
  );
};

export default AdminArticleEdit;
