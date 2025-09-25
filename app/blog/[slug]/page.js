
import { client } from "../../../lib/sanity";
import { blogPostQuery } from "../../../lib/queries";
import { urlFor } from "../../../lib/imageUrl";
import Image from "next/image";
import PortableText from "../../../components/blog/PortableText";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await client.fetch(blogPostQuery, { slug });

  return {
    title: `${post.title} | FreeResume Blog`,
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
  const { slug } = await params;
  const post = await client.fetch(blogPostQuery, { slug });

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h1>
          <Link href="/blog" className="text-blue-600 hover:underline">
            Return to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-white shadow-sm py-4 px-6 border-b border-gray-200">
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

      <article className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center text-gray-600 text-sm mb-4 gap-2">
            <time className="bg-gray-100 px-3 py-1 rounded-full">
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            
            {post.categories?.length > 0 && (
              <>
                <span className="text-gray-400">•</span>
                <div className="flex flex-wrap gap-2">
                  {post.categories.map((category, index) => (
                    <span
                      key={category._id || category.title || index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 text-xs rounded-full border border-blue-200"
                    >
                      {category.title || category}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>

          {post.mainImage && (
            <div className="relative h-64 md:h-96 w-full mb-6 rounded-xl overflow-hidden">
              <Image
                src={urlFor(post.mainImage).width(800).height(400).url()}
                alt={post.mainImage.alt || post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {post.excerpt && (
            <p className="text-lg text-gray-700 mb-6 leading-relaxed bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
              {post.excerpt}
            </p>
          )}
        </header>

        <div className="prose prose-lg max-w-none">
          <PortableText value={post.body} />
        </div>

        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/blog" 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              ← Back to Blog
            </Link>
            <Link 
              href="/templates" 
              className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Browse Templates
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
}


