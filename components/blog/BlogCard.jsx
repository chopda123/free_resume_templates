

// import Link from 'next/link';
// import { urlFor } from '@/lib/imageUrl';
// import Image from 'next/image';

// export default function BlogCard({ post }) {
//   return (
//     <article className="bg-[#122c39] rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl border border-[#234555]/30">
//       <Link href={`/blog/${post.slug.current}`}>
//         <div className="relative h-48 w-full">
//           {post.mainImage ? (
//             <Image
//               src={urlFor(post.mainImage).width(400).height(240).url()}
//               alt={post.mainImage.alt || post.title}
//               fill
//               className="object-cover"
//             />
//           ) : (
//             <div className="w-full h-full bg-[#234555]/30 flex items-center justify-center">
//               <span className="text-[#b1b1af]">No image</span>
//             </div>
//           )}
//         </div>

//         <div className="p-4">
//           <h2 className="text-lg font-semibold mb-2 line-clamp-2 text-[#f5f5dc]">
//             {post.title}
//           </h2>
//           <p className="text-[#b1b1af] text-sm mb-3 line-clamp-2">
//             {post.excerpt}
//           </p>

//           <div className="flex justify-between items-center">
//             <time className="text-sm text-[#b1b1af]/70">
//               {new Date(post.publishedAt).toLocaleDateString('en-US', {
//                 year: 'numeric',
//                 month: 'long',
//                 day: 'numeric'
//               })}
//             </time>

//             <div className="flex flex-wrap gap-1">
//               {post.categories?.map((category, index) => (
//                 <span
//                   key={category._id || category.title || index}
//                   className="px-2 py-1 bg-[#234555]/20 text-[#b1b1af] text-xs rounded-full border border-[#234555]/40"
//                 >
//                   {category.title || category}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>
//       </Link>
//     </article>
//   );
// }

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
            />
          ) : (
            <div className="w-full h-full bg-gray-700 flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2 line-clamp-2 text-white">
            {post.title}
          </h2>
          <p className="text-gray-300 text-sm mb-3 line-clamp-2">
            {post.excerpt}
          </p>

          <div className="flex justify-between items-center">
            <time className="text-sm text-gray-400">
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>

            <div className="flex flex-wrap gap-1">
              {post.categories?.map((category, index) => (
                <span
                  key={category._id || category.title || index}
                  className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full border border-gray-600"
                >
                  {category.title || category}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}