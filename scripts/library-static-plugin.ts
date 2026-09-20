import { createReadStream, existsSync, statSync } from "node:fs";
import { join, normalize, sep } from "node:path";
import type { Connect, Plugin } from "vite";

const MIME: Record<string, string> = {
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".json": "application/json",
  ".md": "text/markdown; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

function libraryHandler(): Connect.NextHandleFunction {
  const root = join(process.cwd(), "library");
  return (req, res, next) => {
    const raw = req.url?.split("?")[0] ?? "";
    if (!raw.startsWith("/library/")) {
      next();
      return;
    }
    const method = (req.method ?? "GET").toUpperCase();
    if (method !== "GET" && method !== "HEAD") {
      next();
      return;
    }
    const rel = decodeURIComponent(raw.replace(/^\/library\//, ""));
    if (!rel || rel.endsWith("/")) {
      res.statusCode = 404;
      res.end("not found");
      return;
    }
    const file = normalize(join(root, rel));
    if (file !== root && !file.startsWith(root + sep)) {
      res.statusCode = 403;
      res.end("forbidden");
      return;
    }
    if (!existsSync(file)) {
      res.statusCode = 404;
      res.end("not found");
      return;
    }
    const st = statSync(file);
    if (!st.isFile()) {
      res.statusCode = 404;
      res.end("not found");
      return;
    }
    const dot = file.lastIndexOf(".");
    const ext = dot >= 0 ? file.slice(dot).toLowerCase() : "";
    const type = MIME[ext] ?? "application/octet-stream";
    res.setHeader("Accept-Ranges", "bytes");
    res.setHeader("Content-Type", type);
    res.setHeader("Cache-Control", "public, max-age=3600");
    const range = req.headers.range;
    if (range) {
      const m = /^bytes=(\d*)-(\d*)$/.exec(range);
      if (!m) {
        res.statusCode = 416;
        res.end();
        return;
      }
      const start = m[1] ? Number(m[1]) : 0;
      const end = m[2] ? Number(m[2]) : st.size - 1;
      if (start >= st.size || end >= st.size || start > end) {
        res.statusCode = 416;
        res.setHeader("Content-Range", `bytes */${st.size}`);
        res.end();
        return;
      }
      res.statusCode = 206;
      res.setHeader("Content-Range", `bytes ${start}-${end}/${st.size}`);
      res.setHeader("Content-Length", String(end - start + 1));
      if (method === "HEAD") {
        res.end();
        return;
      }
      createReadStream(file, { start, end }).pipe(res);
      return;
    }
    res.setHeader("Content-Length", String(st.size));
    if (method === "HEAD") {
      res.end();
      return;
    }
    createReadStream(file).pipe(res);
  };
}

export function libraryStaticPlugin(): Plugin {
  const handler = libraryHandler();
  return {
    name: "library-static",
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    },
  };
}
