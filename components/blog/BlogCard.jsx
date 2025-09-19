

import Link from 'next/link';
import { urlFor } from '@/lib/imageUrl';
import Image from 'next/image';

export default function BlogCard({ post }) {
  return (
    <article className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl border border-gray-700">
      <Link href={`/blog/${post.slug.current}`}>
        <div className="relative h-48 w-full">
          {post.mainImage ? (
            <Image
              src={urlFor(post.mainImage).width(400).height(240).url()}
              alt={post.mainImage.alt || post.title}
              fill
              className="object-cover"
              priority={false}
            />
          ) : (
            <div className="w-full h-full bg-gray-700 flex items-center justify-center">
              <span className="text-gray-400 text-sm">No image</span>
            </div>
          )}
        </div>

        <div className="p-5">
          <h2 className="text-lg font-semibold mb-2 line-clamp-2 text-white">
            {post.title}
          </h2>
          <p className="text-gray-300 text-sm mb-3 line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="flex justify-between items-center">
            <time className="text-sm text-gray-400">
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </time>

            <div className="flex flex-wrap gap-1">
              {post.categories?.slice(0, 2).map((category, index) => (
                <span
                  key={category._id || category.title || index}
                  className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full border border-gray-600"
                >
                  {category.title || category}
                </span>
              ))}
              {post.categories?.length > 2 && (
                <span className="px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded-full">
                  +{post.categories.length - 2}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}