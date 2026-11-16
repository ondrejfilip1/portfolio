import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { imagetools } from "vite-imagetools";
import fs from "fs";
import path from "path";
import { notFoundPage, pages, pageUrl, type PageMeta } from "./src/lib/seo";

const OUT_DIR = "build";

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const setMetaContent = (html: string, key: string, value: string) =>
  html.replace(
    new RegExp(`(<meta\\s+(?:name|property)="${key}"\\s+content=")[^"]*(")`),
    `$1${escapeHtml(value)}$2`,
  );

const renderPage = (template: string, page: PageMeta, noIndex = false) => {
  let html = template.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${escapeHtml(page.title)}</title>`,
  );
  for (const key of ["description", "og:description", "twitter:description"])
    html = setMetaContent(html, key, page.description);
  for (const key of ["og:title", "twitter:title"])
    html = setMetaContent(html, key, page.title);
  html = setMetaContent(html, "og:url", pageUrl(page));

  if (noIndex) {
    html = setMetaContent(html, "robots", "noindex, follow");
    html = html.replace(/\s*<link rel="canonical"[^>]*>/, "");
  } else {
    html = html.replace(
      /(<link rel="canonical" href=")[^"]*(")/,
      `$1${pageUrl(page)}$2`,
    );
  }
  return html;
};

function staticPages(): Plugin {
  return {
    name: "static-pages",
    apply: "build",
    closeBundle() {
      const indexPath = path.resolve(OUT_DIR, "index.html");
      const template = fs.readFileSync(indexPath, "utf-8");

      for (const page of Object.values(pages)) {
        const file = path.resolve(OUT_DIR, `.${page.path}`, "index.html");
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, renderPage(template, page));
      }

      fs.writeFileSync(
        path.resolve(OUT_DIR, "404.html"),
        renderPage(template, notFoundPage, true),
      );

      const lastmod = new Date().toISOString().slice(0, 10);
      const urls = Object.values(pages)
        .map(
          (page) =>
            `  <url><loc>${pageUrl(page)}</loc><lastmod>${lastmod}</lastmod></url>`,
        )
        .join("\n");
      fs.writeFileSync(
        path.resolve(OUT_DIR, "sitemap.xml"),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      );
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    imagetools({
      defaultDirectives: (url) =>
        url.pathname.includes("/assets/images/projects/")
          ? new URLSearchParams({ format: "webp", quality: "90" })
          : new URLSearchParams(),
    }),
    staticPages(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "/portfolio/",
  build: {
    outDir: OUT_DIR,
    emptyOutDir: true,
  },
});
