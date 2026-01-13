import { getDocumentProxy } from "npm:unpdf";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function extractTextFromPDF(arrayBuffer: ArrayBuffer): Promise<string> {
  try {
    console.log('Loading PDF with unpdf...');
    const pdf = await getDocumentProxy(new Uint8Array(arrayBuffer));
    
    console.log('PDF loaded, pages:', pdf.numPages);
    
    let fullText = '';
    
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      
      fullText += pageText + '\n\n';
    }
    
    return fullText.trim();
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from PDF: ' + (error.message || error));
  }
}

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

    console.log('Processing file:', fileName, 'Type:', fileType);

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
      console.log('Parsing PDF...');
      
      // Get the PDF as array buffer and extract text
      const arrayBuffer = await fileResponse.arrayBuffer();
      const extractedText = await extractTextFromPDF(arrayBuffer);
      
      if (extractedText && extractedText.length > 0) {
        content = extractedText;
        
        // Try to extract title from first line or first heading
        const lines = extractedText.split('\n').filter(line => line.trim());
        if (lines.length > 0) {
          title = lines[0].substring(0, 100).trim();
        }
      } else {
        content = `# Document Uploaded\n\nThe PDF file "${fileName}" was uploaded but no text could be extracted. The PDF may be scanned or image-based.\n\nPlease copy and paste the content here manually.`;
        title = fileName.replace('.pdf', '');
      }
      
      console.log('PDF parsed successfully, extracted', content.length, 'characters');
    } else if (fileType.includes('word') || fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
      content = `# Document Uploaded\n\nWord document "${fileName}" has been uploaded. For best results, please save as PDF first and upload the PDF.\n\n**Tip:** You can also convert the document to plain text (.txt) for automatic parsing.`;
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
        message: 'Document processed successfully.'
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
