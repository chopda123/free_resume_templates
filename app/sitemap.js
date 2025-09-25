// app/sitemap.js
import { groq } from "next-sanity";
import { client } from "@/lib/queries"; // adjust path if needed
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://freeresume.shop";

  // Fetch blogs from Sanity
  const blogQuery = groq`*[_type == "blog"]{ "slug": slug.current }`;
  const blogs = await client.fetch(blogQuery);

  // Fetch templates from Sanity
  const templateQuery = groq`*[_type == "template"]{ "slug": slug.current }`;
  const templates = await client.fetch(templateQuery);

  // Static pages
  const staticPages = ["", "/privacy", "/terms", "/templates"];

  // Combine all routes
  const routes = [
    ...staticPages.map((page) => `${baseUrl}${page}`),
    ...blogs.map((b) => `${baseUrl}/blog/${b.slug}`),
    ...templates.map((t) => `${baseUrl}/templates/${t.slug}`),
  ];

  // Build XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
    .map((url) => {
      return `
    <url>
      <loc>${url}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
    </url>`;
    })
    .join("")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
