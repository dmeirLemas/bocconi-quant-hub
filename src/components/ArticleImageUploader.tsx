import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Upload, Copy, Image, X, Loader2 } from "lucide-react";

interface ArticleImageUploaderProps {
  articleId: string;
  onInsert: (markdown: string) => void;
}

interface UploadedImage {
  url: string;
  name: string;
}

const ArticleImageUploader = ({ articleId, onInsert }: ArticleImageUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const newImages: UploadedImage[] = [];

    try {
      for (const file of Array.from(files)) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${articleId}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("article-images")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("article-images")
          .getPublicUrl(filePath);

        newImages.push({ url: publicUrl, name: file.name });
      }

      setImages(prev => [...prev, ...newImages]);
      toast({
        title: "Upload successful",
        description: `${newImages.length} image(s) uploaded`,
      });
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: "Failed to upload image(s)",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const insertImage = (image: UploadedImage) => {
    const markdown = `![${image.name}](${image.url})`;
    onInsert(markdown);
    toast({
      title: "Image inserted",
      description: "Markdown added to editor",
    });
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(`![Image](${url})`);
    toast({
      title: "Copied",
      description: "Markdown copied to clipboard",
    });
  };

  const loadExistingImages = async () => {
    try {
      const { data, error } = await supabase.storage
        .from("article-images")
        .list(articleId, { limit: 100 });

      if (error) throw error;

      if (data && data.length > 0) {
        const existingImages = data
          .filter(file => file.name !== ".emptyFolderPlaceholder")
          .map(file => {
            const { data: { publicUrl } } = supabase.storage
              .from("article-images")
              .getPublicUrl(`${articleId}/${file.name}`);
            return { url: publicUrl, name: file.name };
          });
        setImages(existingImages);
      }
    } catch (error) {
      console.error("Error loading images:", error);
    }
  };

  const handleExpand = () => {
    if (!isExpanded) {
      loadExistingImages();
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-[#252526] border-b border-[#404040]">
      <button
        onClick={handleExpand}
        className="w-full px-4 py-2 flex items-center justify-between text-left hover:bg-[#2d2d2d] transition-colors"
      >
        <div className="flex items-center gap-2">
          <Image className="h-4 w-4 text-purple-400" />
          <span className="text-gray-300 text-sm font-medium">Images & Figures</span>
          {images.length > 0 && (
            <span className="text-xs bg-purple-600 text-white px-2 py-0.5 rounded-full">
              {images.length}
            </span>
          )}
        </div>
        <span className="text-gray-500 text-xs">{isExpanded ? "▼" : "▶"}</span>
      </button>

      {isExpanded && (
        <div className="px-4 pb-3 space-y-3">
          <div className="flex items-center gap-2">
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={handleUpload}
              disabled={uploading}
              className="bg-[#1e1e1e] border-[#404040] text-white text-xs flex-1"
              id="image-upload"
            />
            <Button
              size="sm"
              disabled={uploading}
              className="bg-purple-600 hover:bg-purple-700 text-white"
              onClick={() => document.getElementById('image-upload')?.click()}
            >
              {uploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Upload className="h-4 w-4" />
              )}
            </Button>
          </div>

          {images.length > 0 && (
            <div className="grid grid-cols-4 gap-2 max-h-32 overflow-y-auto">
              {images.map((image, idx) => (
                <div
                  key={idx}
                  className="relative group bg-[#1e1e1e] rounded border border-[#404040] overflow-hidden"
                >
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-16 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                    <button
                      onClick={() => insertImage(image)}
                      className="p-1 bg-purple-600 rounded hover:bg-purple-700"
                      title="Insert into editor"
                    >
                      <Upload className="h-3 w-3 text-white" />
                    </button>
                    <button
                      onClick={() => copyToClipboard(image.url)}
                      className="p-1 bg-gray-600 rounded hover:bg-gray-700"
                      title="Copy markdown"
                    >
                      <Copy className="h-3 w-3 text-white" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <p className="text-xs text-gray-500">
            Use <code className="bg-[#1e1e1e] px-1 rounded">![alt text](url)</code> in your content
          </p>
        </div>
      )}
    </div>
  );
};

export default ArticleImageUploader;
