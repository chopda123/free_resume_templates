

// components/blog/CategoryFilter.jsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function CategoryFilter({ categories, currentCategory }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryChange = (categorySlug) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (categorySlug) {
      params.set('category', categorySlug);
    } else {
      params.delete('category');
    }
    
    router.push(`/blog?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-gray-700 mr-2">Show:</span>
      
      <button
        onClick={() => handleCategoryChange('')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
          !currentCategory
            ? 'bg-blue-600 text-white shadow-md'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All Posts
      </button>
      
      {categories.map((category) => (
        <button
          key={category._id}
          onClick={() => handleCategoryChange(category.slug.current)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            currentCategory === category.slug.current
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        >
          {category.title}
        </button>
      ))}
    </div>
  );
}


