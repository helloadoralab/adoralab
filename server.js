import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Prevent Electron-as-node from exiting when run headless / backgrounded
if (process.stdin.isTTY === false) {
  process.stdin.resume();
}

// Keep process alive indefinitely
setInterval(() => {}, 1000 * 60 * 60);

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

// In-memory cache for all 299 frames
const frameCache = new Map();
const framesDir = path.join(__dirname, 'public', 'frames');

console.log('Preloading frames into memory cache...');
try {
  if (fs.existsSync(framesDir)) {
    const files = fs.readdirSync(framesDir);
    for (const file of files) {
      if (file.endsWith('.webp') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
        const fullPath = path.join(framesDir, file);
        const data = fs.readFileSync(fullPath);
        frameCache.set(file.toLowerCase(), data);
      }
    }
  }
} catch (err) {
  console.error('Error preloading frames:', err);
}
console.log(`Preloaded ${frameCache.size} frames into memory.`);

const server = http.createServer((req, res) => {
  const urlPath = decodeURI(req.url.split('?')[0]);
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Handle frame requests from RAM cache
  if (urlPath.startsWith('/frames/')) {
    const filename = path.basename(urlPath).toLowerCase();
    if (frameCache.has(filename)) {
      const buf = frameCache.get(filename);
      const isWebp = filename.endsWith('.webp');
      res.writeHead(200, {
        'Content-Type': isWebp ? 'image/webp' : 'image/jpeg',
        'Content-Length': buf.length,
        'Cache-Control': 'public, max-age=31536000, immutable',
      });
      res.end(buf);
      return;
    }
  }

  // Resolve target file path
  let targetPath;
  if (urlPath === '/' || urlPath === '/index.html') {
    targetPath = path.join(__dirname, 'index.html');
  } else if (urlPath.startsWith('/images/')) {
    targetPath = path.join(__dirname, 'public', urlPath);
  } else {
    targetPath = path.join(__dirname, urlPath);
  }

  // Check if file exists, with fallback to public folder
  fs.stat(targetPath, (err, stats) => {
    if (err || !stats.isFile()) {
      const pubPath = path.join(__dirname, 'public', urlPath);
      fs.stat(pubPath, (pErr, pStats) => {
        if (pErr || !pStats.isFile()) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found: ' + urlPath);
          return;
        }
        streamFile(res, pubPath, pStats);
      });
      return;
    }
    streamFile(res, targetPath, stats);
  });
});

function streamFile(res, filePath, stats) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  
  res.writeHead(200, {
    'Content-Type': contentType,
    'Content-Length': stats.size,
    'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=86400',
  });
  fs.createReadStream(filePath).pipe(res);
}

function startServer(port = 3000) {
  server.listen(port, () => {
    console.log(`Server running at: http://localhost:${port}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} in use, trying ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });
}

startServer(3000);
