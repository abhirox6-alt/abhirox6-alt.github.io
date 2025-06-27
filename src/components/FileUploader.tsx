import { ChangeEvent, useState } from 'react';

interface FileUploaderProps {
  onFileRead: (content: string) => void;
}

function FileUploader({ onFileRead }: FileUploaderProps) {
  const [hasFile, setHasFile] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setHasFile(true);
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      onFileRead(content);
    };
    reader.readAsText(file);
  };

  return (
    <div className={`file-uploader ${hasFile ? 'has-file' : ''}`}>
      <input 
        type="file" 
        id="markdown-file" 
        accept=".md,.markdown"
        onChange={handleFileChange}
      />
      <label htmlFor="markdown-file">
        {hasFile ? (
          <>
            <p>✓ {fileName}</p>
            <p style={{fontSize: '0.9rem', opacity: 0.7, marginTop: '0.5rem', fontWeight: 200}}>
              Click to choose a different file
            </p>
          </>
        ) : (
          <>
            <p>📄 Drop your markdown file here or click to browse</p>
            <p style={{fontSize: '0.9rem', opacity: 0.7, marginTop: '0.5rem', fontWeight: 200}}>
              Supports .md and .markdown files
            </p>
          </>
        )}
      </label>
    </div>
  );
}

export default FileUploader;