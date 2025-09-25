import { groq } from "next-sanity";
import { client } from "@/lib/queries"; // adjust path if your Sanity client is elsewhere

export default async function sitemap() {
  const baseUrl = "https://freeresume.shop";

  // 1. Fetch blogs from Sanity
  const blogQuery = groq`*[_type == "blog"]{ "slug": slug.current }`;
  const blogs = await client.fetch(blogQuery);

  // 2. Fetch templates from Sanity
  const templateQuery = groq`*[_type == "template"]{ "slug": slug.current }`;
  const templates = await client.fetch(templateQuery);

  // 3. Define static pages (based on your structure)
  const staticPages = [
    "",
    "/privacy",
    "/terms",
    "/templates",
  ];

  // 4. Build routes
  const routes = [
    // Static
    ...staticPages.map((page) => ({
      url: `${baseUrl}${page}`,
      lastModified: new Date().toISOString(),
    })),

    // Blogs
    ...blogs.map((blog) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: new Date().toISOString(),
    })),

    // Templates
    ...templates.map((template) => ({
      url: `${baseUrl}/templates/${template.slug}`,
      lastModified: new Date().toISOString(),
    })),
  ];

  return routes;
}
