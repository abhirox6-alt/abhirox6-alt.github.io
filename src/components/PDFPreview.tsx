import { useEffect, useState } from 'react';
import MarkdownIt from 'markdown-it';

interface PDFPreviewProps {
  content: string;
}

function PDFPreview({ content }: PDFPreviewProps) {
  const [html, setHtml] = useState('');
  
  useEffect(() => {
    const md = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true
    });
    
    const rendered = md.render(content);
    setHtml(rendered);
  }, [content]);

  return (
    <div className="preview">
      <h2 style={{marginBottom: '1rem', fontFamily: 'Reckless'}}>Preview</h2>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

export default PDFPreview;