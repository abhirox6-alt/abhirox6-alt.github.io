const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files from the public directory
app.use(express.static('public'));
app.use(express.static('src'));

// Simple HTML page with inline functionality
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Draconic PDF Generator</title>
  <style>
    /* Import Bricolage Grotesque */
    @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200;12..96,400;12..96,600;12..96,700;12..96,800&display=swap');
    
    body {
      margin: 0;
      padding: 0;
      background: #1f1108;
      color: #f7d9cb;
      font-family: 'Bricolage Grotesque', sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .header {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      padding: 40px;
      width: 100%;
      border-bottom: 3px solid #FF6D00;
    }
    
    .logo {
      font-size: 48px;
      font-weight: 800;
      color: #FF6D00;
      letter-spacing: -0.02em;
    }
    
    h1 {
      font-size: 32px;
      font-weight: 600;
      color: #f7d9cb;
    }
    
    .container {
      max-width: 800px;
      width: 100%;
      padding: 40px;
    }
    
    .upload-area {
      border: 3px dashed #FF6D00;
      border-radius: 12px;
      padding: 60px;
      text-align: center;
      background: rgba(255, 109, 0, 0.05);
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .upload-area:hover {
      background: rgba(255, 109, 0, 0.1);
      border-color: #ff8c33;
    }
    
    .upload-area.drag-over {
      background: rgba(255, 109, 0, 0.15);
      border-color: #ff8c33;
    }
    
    input[type="file"] {
      display: none;
    }
    
    .btn {
      background: #FF6D00;
      color: #1f1108;
      border: none;
      padding: 12px 32px;
      font-size: 18px;
      font-weight: 600;
      border-radius: 8px;
      cursor: pointer;
      margin-top: 20px;
      transition: all 0.3s ease;
    }
    
    .btn:hover {
      background: #ff8c33;
      transform: translateY(-1px);
    }
    
    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .preview {
      margin-top: 40px;
      padding: 40px;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 12px;
      border: 1px solid rgba(255, 109, 0, 0.2);
      max-height: 600px;
      overflow-y: auto;
    }
    
    .preview h1 { color: #FF6D00; text-transform: uppercase; }
    .preview h2 { color: #f7d9cb; border-left: 4px solid #FF6D00; padding-left: 15px; }
    .preview h3 { color: #e2ab8d; }
    .preview code { background: rgba(255, 109, 0, 0.1); padding: 2px 6px; color: #FF6D00; }
    .preview pre { background: rgba(0, 0, 0, 0.5); padding: 15px; border-left: 4px solid #FF6D00; }
    .preview blockquote { border-left: 4px solid #FF6D00; padding-left: 20px; color: #e2ab8d; }
    
    .status {
      margin-top: 20px;
      padding: 15px;
      border-radius: 8px;
      text-align: center;
    }
    
    .status.success {
      background: rgba(0, 255, 0, 0.1);
      border: 1px solid rgba(0, 255, 0, 0.3);
      color: #4ade80;
    }
    
    .status.error {
      background: rgba(255, 0, 0, 0.1);
      border: 1px solid rgba(255, 0, 0, 0.3);
      color: #f87171;
    }
  </style>
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
</head>
<body>
  <div class="header">
    <div class="logo">draconic</div>
    <h1>Document Generator</h1>
  </div>
  
  <div class="container">
    <div class="upload-area" id="uploadArea">
      <p style="font-size: 20px; margin-bottom: 10px;">Drop your markdown file here</p>
      <p style="color: #e2ab8d;">or click to select</p>
      <input type="file" id="fileInput" accept=".md,.markdown">
    </div>
    
    <div id="preview" class="preview" style="display: none;"></div>
    
    <button id="generateBtn" class="btn" style="display: none;" onclick="generatePDF()">
      Generate PDF
    </button>
    
    <div id="status" class="status" style="display: none;"></div>
  </div>

  <script>
    let markdownContent = '';
    
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const preview = document.getElementById('preview');
    const generateBtn = document.getElementById('generateBtn');
    const status = document.getElementById('status');
    
    // File upload handling
    uploadArea.addEventListener('click', () => fileInput.click());
    
    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadArea.classList.add('drag-over');
    });
    
    uploadArea.addEventListener('dragleave', () => {
      uploadArea.classList.remove('drag-over');
    });
    
    uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadArea.classList.remove('drag-over');
      handleFile(e.dataTransfer.files[0]);
    });
    
    fileInput.addEventListener('change', (e) => {
      handleFile(e.target.files[0]);
    });
    
    function handleFile(file) {
      if (!file || !file.name.match(/\.(md|markdown)$/)) {
        showStatus('Please select a markdown file', 'error');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        markdownContent = e.target.result;
        showPreview();
      };
      reader.readAsText(file);
    }
    
    function showPreview() {
      const html = marked.parse(markdownContent);
      preview.innerHTML = html;
      preview.style.display = 'block';
      generateBtn.style.display = 'block';
      showStatus('File loaded successfully', 'success');
    }
    
    function showStatus(message, type) {
      status.textContent = message;
      status.className = 'status ' + type;
      status.style.display = 'block';
      setTimeout(() => {
        status.style.display = 'none';
      }, 3000);
    }
    
    function generatePDF() {
      generateBtn.disabled = true;
      generateBtn.textContent = 'Generating...';
      
      // Send to server endpoint
      fetch('/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markdown: markdownContent })
      })
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'draconic-' + Date.now() + '.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showStatus('PDF generated successfully', 'success');
      })
      .catch(error => {
        showStatus('Error generating PDF: ' + error.message, 'error');
      })
      .finally(() => {
        generateBtn.disabled = false;
        generateBtn.textContent = 'Generate PDF';
      });
    }
  </script>
</body>
</html>
  `);
});

// PDF generation endpoint
app.post('/generate-pdf', express.json({ limit: '10mb' }), async (req, res) => {
  const { markdown } = req.body;
  
  // For now, we'll use the print dialog method
  // In production, you'd use Puppeteer here
  res.status(501).json({ error: 'PDF generation requires Puppeteer setup. Use browser print for now.' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('Open this URL in your browser');
});