// app/sitemap.xml.js
export async function GET() {
  const baseurl = "https://interiitsports.in";
  const pages = ["", "schedule", "legacy", "gallery", "contact", "team"];
  const urls = pages
    .map(
      (p) => `
    <url>
      <loc>${baseurl}/${p}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
  `
    )
    .join("");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls}
      </urlset>`,
    { headers: { "Content-Type": "application/xml" } }
  );
}
