const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const RENDERER_DIR = path.join(__dirname, 'renderer');

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject'
};

const server = http.createServer((req, res) => {
  let filePath = req.url === '/' ? '/index.html' : req.url;
  
  // Remove query strings and hash
  filePath = filePath.split('?')[0].split('#')[0];
  
  // Security: prevent directory traversal
  const safePath = path.normalize(filePath).replace(/^(\.\.[\/\\])+/, '');
  const fullPath = path.join(RENDERER_DIR, safePath);
  
  // Check if path is within renderer directory
  if (!fullPath.startsWith(RENDERER_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(fullPath, (err, stats) => {
    if (err || !stats.isFile()) {
      // For SPA routing, serve index.html for non-file routes
      const indexPath = path.join(RENDERER_DIR, 'index.html');
      fs.readFile(indexPath, (indexErr, data) => {
        if (indexErr) {
          res.writeHead(404);
          res.end('Not Found');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      });
      return;
    }

    const ext = path.extname(fullPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(fullPath, (readErr, data) => {
      if (readErr) {
        res.writeHead(500);
        res.end('Internal Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  });
});

server.listen(PORT, () => {
  console.log(`\n  Diligent Boards Companion - Web App\n`);
  console.log(`  Local:   http://localhost:${PORT}`);
  console.log(`  Network: http://127.0.0.1:${PORT}\n`);
  console.log(`  Press Ctrl+C to stop the server.\n`);
});
