import { useState } from 'react';
import FileUploader from './components/FileUploader';
import PDFPreview from './components/PDFPreview';
import { generatePDF } from './utils/generatePDFPrint';
import './styles/draconic.css';
import './styles/print.css';

function App() {
  const [markdownContent, setMarkdownContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      await generatePDF(markdownContent);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <img src="/assets/Draconic Logo - Thin (1).svg" alt="Draconic" className="logo" />
        <h1>Document Generator</h1>
      </header>
      
      <main className="main">
        <FileUploader onFileRead={setMarkdownContent} />
        {markdownContent && (
          <>
            <PDFPreview content={markdownContent} />
            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="generate-btn"
            >
              {isGenerating ? 'Generating...' : 'Generate PDF'}
            </button>
          </>
        )}
      </main>
    </div>
  );
}

export default App;