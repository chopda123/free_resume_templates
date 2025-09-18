

// app/blog/[slug]/page.js
import { client } from "@/lib/sanity";
import { blogPostQuery } from "@/lib/queries";
import { urlFor } from "@/lib/imageUrl";
import Image from "next/image";
import PortableText from "@/components/blog/PortableText";
import Link from "next/link";

export async function generateMetadata({ params }) {
  // ✅ await params (Next.js 15+)
  const { slug } = await params;
  const post = await client.fetch(blogPostQuery, { slug });

  return {
    title: `${post.title} | Resume Craft Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.mainImage
        ? [urlFor(post.mainImage).width(800).height(600).url()]
        : [],
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogPostPage({ params }) {
  // ✅ await params (Next.js 15+)
  const { slug } = await params;
  const post = await client.fetch(blogPostQuery, { slug });

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-sm py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            FreeResume
          </Link>
          <div className="flex space-x-6">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link href="/templates" className="text-gray-700 hover:text-blue-600 transition-colors">
              Templates
            </Link>
            <Link href="/blog" className="text-blue-600 font-medium">
              Blog
            </Link>
          </div>
        </div>
      </nav>

      <article className="container mx-auto px-4 py-8 max-w-3xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

          <div className="flex items-center text-gray-600 text-sm mb-4">
            <time>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span className="mx-2">•</span>
            <div className="flex flex-wrap gap-2">
              {post.categories?.map((category, index) => (
                <span
                  key={category._id || category.title || index}
                  className="px-2 py-1 bg-[#3b6178]/10 text-[#234555] border border-[#3b6178]/30 text-xs rounded-full"
                >
                  {category.title || category}
                </span>
              ))}
            </div>
          </div>

          {post.mainImage && (
            <div className="relative h-64 md:h-96 w-full mb-6">
              <Image
                src={urlFor(post.mainImage).width(800).height(400).url()}
                alt={post.mainImage.alt || post.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}

          {post.excerpt && (
            <p className="text-lg text-gray-700 italic mb-6">{post.excerpt}</p>
          )}
        </header>

        <div className="prose prose-lg max-w-none">
          <PortableText value={post.body} />
        </div>
      </article>
    </div>
  );
}
