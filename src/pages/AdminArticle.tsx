import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { ArrowLeft, Upload, FileText } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CATEGORIES = [
  "AI/ML",
  "Quantitative Research",
  "Capital Markets", 
  "Portfolio Management"
] as const;

const articleSchema = z.object({
  title: z.string().trim().min(1, { message: "Title is required" }).max(200),
  summary: z.string().trim().min(1, { message: "Summary is required" }).max(1000),
  author: z.string().trim().min(1, { message: "Author is required" }).max(100),
  category: z.enum(CATEGORIES, { message: "Category is required" })
});

const AdminArticle = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
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

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
    } else {
      toast({
        title: "Invalid File",
        description: "Please upload a PDF file",
        variant: "destructive",
      });
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

    if (!pdfFile) {
      toast({
        title: "Missing PDF",
        description: "Please upload the research paper PDF",
        variant: "destructive",
      });
      return;
    }

    try {
      const validated = articleSchema.parse({ title, summary, author, category });
      setSubmitting(true);

      let thumbnailUrl = "";
      let fileUrl = "";

      // Upload thumbnail
      if (thumbnail) {
        const fileExt = thumbnail.name.split(".").pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
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

      // Upload PDF
      const pdfFileName = `${crypto.randomUUID()}.pdf`;
      const pdfFilePath = `papers/${pdfFileName}`;

      const { error: pdfUploadError } = await supabase.storage
        .from("article-images")
        .upload(pdfFilePath, pdfFile);

      if (pdfUploadError) throw pdfUploadError;

      const { data: { publicUrl: pdfPublicUrl } } = supabase.storage
        .from("article-images")
        .getPublicUrl(pdfFilePath);

      fileUrl = pdfPublicUrl;

      const slug = generateSlug(validated.title);

      const { error } = await supabase
        .from("articles")
        .insert([{
          title: validated.title,
          content: validated.summary, // Using content field for summary
          author: validated.author,
          category: validated.category,
          slug: slug,
          thumbnail_url: thumbnailUrl || null,
          file_url: fileUrl,
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Research paper uploaded successfully",
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
        console.error("Error publishing:", error);
        toast({
          title: "Error",
          description: "Failed to upload research paper",
          variant: "destructive",
        });
      }
    } finally {
      setSubmitting(false);
    }
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
    <div className="min-h-screen bg-gradient-to-br from-brand-light via-white to-brand-light py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/articles")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Research Papers
        </Button>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-gloock text-brand-primary mb-6">Upload Research Paper</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Research paper title"
                required
                maxLength={200}
              />
            </div>

            <div>
              <Label htmlFor="author">Author(s) *</Label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author name(s)"
                required
                maxLength={100}
              />
            </div>

            <div>
              <Label htmlFor="category">Division *</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a division" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="summary">Summary *</Label>
              <Textarea
                id="summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Brief summary of the research paper (max 1000 characters)"
                required
                maxLength={1000}
                rows={4}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {summary.length}/1000 characters
              </p>
            </div>

            <div>
              <Label htmlFor="thumbnail">Thumbnail Image</Label>
              <div className="flex items-center gap-4 mt-2">
                <Input
                  id="thumbnail"
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="flex-1"
                />
                {thumbnailPreview && (
                  <img 
                    src={thumbnailPreview} 
                    alt="Preview" 
                    className="h-16 w-16 object-cover rounded"
                  />
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="pdf">Research Paper PDF *</Label>
              <div className="mt-2 border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                <input
                  id="pdf"
                  type="file"
                  accept="application/pdf"
                  onChange={handlePdfChange}
                  className="hidden"
                />
                <label 
                  htmlFor="pdf" 
                  className="cursor-pointer flex flex-col items-center"
                >
                  {pdfFile ? (
                    <>
                      <FileText className="h-12 w-12 text-green-500 mb-2" />
                      <p className="text-sm font-medium text-brand-text">{pdfFile.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">Click to change file</p>
                    </>
                  ) : (
                    <>
                      <Upload className="h-12 w-12 text-gray-400 mb-2" />
                      <p className="text-sm text-muted-foreground">Click to upload PDF</p>
                    </>
                  )}
                </label>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={submitting}
              className="w-full"
            >
              {submitting ? "Uploading..." : "Upload Paper"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminArticle;