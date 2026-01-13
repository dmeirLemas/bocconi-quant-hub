const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fileUrl, fileName, fileType } = await req.json();

    if (!fileUrl) {
      return new Response(
        JSON.stringify({ error: 'File URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch the file
    const fileResponse = await fetch(fileUrl);
    if (!fileResponse.ok) {
      throw new Error('Failed to fetch file');
    }

    let content = '';
    let title = '';
    const images: string[] = [];

    // Handle different file types
    if (fileType === 'text/plain' || fileType === 'text/markdown' || fileName.endsWith('.md')) {
      // Plain text or markdown - read directly
      content = await fileResponse.text();
      
      // Try to extract title from first heading
      const titleMatch = content.match(/^#\s+(.+)$/m);
      if (titleMatch) {
        title = titleMatch[1];
      }
    } else if (fileType === 'application/pdf') {
      // For PDF, we'll return a message that server-side PDF parsing requires additional setup
      content = `# Document Uploaded\n\nThe PDF file "${fileName}" has been uploaded. Please copy and paste the content here, or use a PDF to text converter.\n\n**Note:** For automatic PDF parsing, consider using a document parsing service.`;
      title = fileName.replace('.pdf', '');
    } else if (fileType.includes('word') || fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
      // For Word docs, similar message
      content = `# Document Uploaded\n\nThe Word document "${fileName}" has been uploaded. Please copy and paste the content here.\n\n**Note:** For automatic Word document parsing, consider using a document parsing service.`;
      title = fileName.replace(/\.(docx?|doc)$/, '');
    } else {
      // Unknown type
      content = `# Document Uploaded\n\nFile "${fileName}" uploaded. Please paste the content manually.`;
    }

    return new Response(
      JSON.stringify({ 
        content, 
        title,
        images,
        message: 'Document processed. You can now edit the content.'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error parsing document:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to parse document' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
