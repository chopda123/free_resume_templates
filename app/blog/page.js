

// app/blog/page.js
import { client } from '@/lib/sanity';
import {
  blogPostsQuery,
  categoriesQuery,
  blogPostsByCategoryQuery
} from '@/lib/queries';
import BlogCard from '@/components/blog/BlogCard';
import CategoryFilter from '@/components/blog/CategoryFilter';
import Link from 'next/link';

export const metadata = {
  title: 'Blog | FreeResume',
  description: 'Read our latest articles on resume building, career advice, and professional development.'
};

export default async function BlogPage({ searchParams }) {
  // ✅ await searchParams (Next.js 15+)
  const { category = '' } = await searchParams;

  let posts = [];
  let categories = [];
  
  try {
    if (category) {
      posts = await client.fetch(blogPostsByCategoryQuery, { category });
    } else {
      posts = await client.fetch(blogPostsQuery);
    }
    
    categories = await client.fetch(categoriesQuery);
  } catch (error) {
    console.error("Error fetching data:", error);
    posts = [];
    categories = [];
  }

  // Handle case where posts might be null or undefined
  const safePosts = Array.isArray(posts) ? posts : [];
  const safeCategories = Array.isArray(categories) ? categories : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation Bar */}
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

      <div className="px-4 py-8">
        {/* Header Section */}
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            FreeResume <span className="text-blue-600">Blog</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Expert advice, tips, and insights to help you build better resumes and advance your career.
          </p>
        </div>

        {/* Category Filter - Single Line */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex justify-center flex-wrap gap-2 px-4">
            <CategoryFilter
              categories={safeCategories}
              currentCategory={category}
            />
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="max-w-6xl mx-auto">
          {safePosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {safePosts.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md mx-auto">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts yet</h3>
                <p className="text-gray-600">Check back soon for new articles!</p>
              </div>
            </div>
          )}
        </div>

        {/* Newsletter CTA */}
        {safePosts.length > 0 && (
          <div className="max-w-2xl mx-auto mt-16 bg-white rounded-2xl p-8 shadow-lg text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Stay Updated</h3>
            <p className="text-gray-600 mb-6">Get the latest career tips and resume advice delivered to your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                Subscribe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}