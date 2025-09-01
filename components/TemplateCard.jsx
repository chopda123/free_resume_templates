
// "use client";

// import Image from 'next/image';
// import { motion } from 'framer-motion';
// import { useState, useCallback } from 'react';
// import StarRating from './StarRating';

// export default function TemplateCard({ template, onPreview }) {
//   const [isPressed, setIsPressed] = useState(false);

//   const imageUrl = template?.mainImage?.asset?.url;
//   const altText = template?.mainImage?.alt || template?.title || 'Template preview';

//   // Delay preview slightly on touch so the press animation is visible
//   const handlePreview = useCallback(() => {
//     setIsPressed(true);
//     const t = setTimeout(() => {
//       onPreview?.();
//       setIsPressed(false);
//     }, 120);
//     return () => clearTimeout(t);
//   }, [onPreview]);

//   return (
//     <motion.div
//       className="w-full"
//       whileHover={{ y: -8, scale: 1.02 }}          // desktop hover
//       animate={{ scale: isPressed ? 0.98 : 1 }}    // mobile tap feedback
//       transition={{ duration: 0.2 }}
//       onTouchStart={() => setIsPressed(true)}
//       onTouchEnd={() => setIsPressed(false)}
//       onTouchCancel={() => setIsPressed(false)}
//       onMouseLeave={() => setIsPressed(false)}
//     >
//       <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col border border-premium-cream relative">
        
//         {/* Image Section */}
//         <div
//           className="relative h-[220px] sm:h-[280px] md:h-[360px] bg-gray-100 cursor-pointer overflow-hidden"
//           onClick={handlePreview}
//           role="button"
//           aria-label="Preview template"
//         >
//           {imageUrl ? (
//             <motion.div
//               className="w-full h-full"
//               whileHover={{ scale: 1.05 }}         // desktop hover
//               whileTap={{ scale: 0.97 }}           // mobile tap
//               transition={{ duration: 0.35 }}
//             >
//               <Image
//                 src={imageUrl}
//                 alt={altText}
//                 fill
//                 className="object-cover object-top select-none"
//                 priority={false}
//                 draggable={false}
//               />
//             </motion.div>
//           ) : (
//             <div className="w-full h-full flex flex-col items-center justify-center p-4">
//               <div className="bg-premium-gold/10 border-2 border-dashed border-premium-gold/30 rounded-xl w-16 h-16 flex items-center justify-center mb-2">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-premium-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                 </svg>
//               </div>
//               <p className="text-premium-charcoal/70 text-center text-sm">No preview available</p>
//             </div>
//           )}
//         </div>

//         {/* Bottom Section */}
//         <div className="p-3 sm:p-4 flex flex-col gap-2">
//           {/* Title + Stars in one row */}
//           <div className="flex items-center justify-between gap-2">
//             <h3
//               className="text-sm sm:text-base font-semibold text-premium-navy truncate"
//               title={template?.title}
//             >
//               {template?.title || 'Premium Template'}
//             </h3>
//             {/* Stars → smaller on mobile */}
//             <div className="scale-90 sm:scale-100 flex-shrink-0">
//               <StarRating rating={template?.rating} />
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="flex flex-row gap-2 mt-2 w-full">
//             {/* Preview Button */}
//             <motion.button
//               onClick={handlePreview}
//               whileHover={{ scale: 1.04 }}
//               whileTap={{ scale: 0.95 }}
//               className="flex-1 text-[11px] sm:text-sm border border-premium-teal text-premium-teal rounded-full py-1.5 sm:py-2 hover:bg-premium-teal/5 active:scale-95 transition"
//             >
//               Preview
//             </motion.button>

//             {/* Edit in Canva Button (premium but subtle) */}
//             <motion.a
//               href={template?.canvaLink}
//               target="_blank"
//               rel="noopener noreferrer"
//               whileHover={{ scale: 1.04 }}
//               whileTap={{ scale: 0.95 }}
//               className="flex-1 text-[11px] sm:text-sm 
//                          bg-premium-gold text-premium-navy font-medium 
//                          rounded-full py-1.5 sm:py-2 text-center 
//                          shadow-sm hover:bg-premium-gold/90 
//                          active:scale-95 transition"
//             >
//               Edit in Canva
//             </motion.a>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }


"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useCallback } from 'react';
import StarRating from './StarRating';

export default function TemplateCard({ template, onPreview }) {
  const [isPressed, setIsPressed] = useState(false);

  const imageUrl = template?.mainImage?.asset?.url;
  const altText = template?.mainImage?.alt || template?.title || 'Template preview';

  // Delay preview slightly on touch so the press animation is visible
  const handlePreview = useCallback(() => {
    setIsPressed(true);
    const t = setTimeout(() => {
      onPreview?.();
      setIsPressed(false);
    }, 120);
    return () => clearTimeout(t);
  }, [onPreview]);

  return (
    <motion.div
      className="w-full"
      whileHover={{ y: -8, scale: 1.02 }}          // desktop hover
      animate={{ scale: isPressed ? 0.98 : 1 }}    // mobile tap feedback
      transition={{ duration: 0.2 }}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onTouchCancel={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
    >
      <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col border border-premium-cream relative overflow-visible">
        
        {/* Image Section */}
        <div
          className="relative h-[220px] sm:h-[280px] md:h-[360px] bg-gray-100 cursor-pointer overflow-hidden rounded-t-2xl"
          onClick={handlePreview}
          role="button"
          aria-label="Preview template"
        >
          {imageUrl ? (
            <motion.div
              className="w-full h-full"
              whileHover={{ scale: 1.05 }}         // desktop hover
              whileTap={{ scale: 0.97 }}           // mobile tap
              transition={{ duration: 0.35 }}
            >
              <Image
                src={imageUrl}
                alt={altText}
                fill
                className="object-cover object-top select-none rounded-t-2xl"
                priority={false}
                draggable={false}
              />
            </motion.div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 rounded-t-2xl">
              <div className="bg-premium-gold/10 border-2 border-dashed border-premium-gold/30 rounded-xl w-16 h-16 flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-premium-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-premium-charcoal/70 text-center text-sm">No preview available</p>
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className="p-3 sm:p-4 flex flex-col gap-2">
          {/* Title + Stars in one row */}
          <div className="flex items-center justify-between gap-2">
            <h3
              className="text-sm sm:text-base font-semibold text-premium-navy truncate"
              title={template?.title}
            >
              {template?.title || 'Premium Template'}
            </h3>
            {/* Stars → smaller on mobile */}
            <div className="scale-90 sm:scale-100 flex-shrink-0">
              <StarRating rating={template?.rating} />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-row gap-2 mt-2 w-full">
            {/* Preview Button */}
            <motion.button
              onClick={handlePreview}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 text-[11px] sm:text-sm border border-premium-teal text-premium-teal rounded-full py-1.5 sm:py-2 hover:bg-premium-teal/5 active:scale-95 transition"
            >
              Preview
            </motion.button>

            {/* Edit in Canva Button */}
            <motion.a
              href={template?.canvaLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 text-[11px] sm:text-sm 
                         bg-premium-gold text-premium-navy font-medium 
                         rounded-full py-1.5 sm:py-2 text-center 
                         shadow-sm hover:bg-premium-gold/90 
                         active:scale-95 transition"
            >
              Edit in Canva
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
