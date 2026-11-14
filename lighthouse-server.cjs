const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const root = String.raw`C:\Users\MRU LAB\Desktop\PROJECT`;
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpg": "image/jpeg",
  ".mp4": "video/mp4",
};

http.createServer((request, response) => {
  const pathname = decodeURIComponent(
    new URL(request.url, "http://127.0.0.1").pathname,
  );
  const filePath = path.resolve(root, `.${pathname}`);

  if (!filePath.startsWith(root + path.sep)) {
    response.writeHead(403).end();
    return;
  }

  const stream = fs.createReadStream(filePath);
  stream.on("open", () => {
    response.setHeader(
      "Content-Type",
      contentTypes[path.extname(filePath)] ?? "application/octet-stream",
    );
  });
  stream.on("error", () => response.writeHead(404).end("Not found"));
  stream.pipe(response);
}).listen(8765, "127.0.0.1");
