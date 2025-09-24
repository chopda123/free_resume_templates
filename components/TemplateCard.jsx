

"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useCallback } from 'react';

// StarRating import is no longer needed

export default function TemplateCard({ template, onPreview }) {
  const [isPressed, setIsPressed] = useState(false);

  const imageUrl = template?.mainImage?.asset?.url;
  const altText = template?.mainImage?.alt || template?.title || 'Template preview';

  // Delay preview slightly on touch so the press animation is visible
  const handlePreview = useCallback(() => {
    // GA Event: Track template preview click
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'view_template_preview', {
        'template_name': template?.title,
        'template_id': template?._id,
        'location': 'Template Card'
      });
    }

    setIsPressed(true);
    const t = setTimeout(() => {
      onPreview?.();
      setIsPressed(false);
    }, 120);
    return () => clearTimeout(t);
  }, [onPreview, template]);

  // GA Event Handler for Canva click
  const handleCanvaClick = () => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'edit_in_canva_click', {
        'template_name': template?.title,
        'template_id': template?._id,
        'location': 'Template Card'
      });
    }
  };

  return (
    <motion.div
      className="w-full"
      whileHover={{ y: -8, scale: 1.02 }}        // desktop hover
      animate={{ scale: isPressed ? 0.98 : 1 }}    // mobile tap feedback
      transition={{ duration: 0.2 }}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onTouchCancel={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
    >
      <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col border border-gray-200 relative overflow-visible">
        
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
              whileHover={{ scale: 1.05 }}        // desktop hover
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
              <div className="bg-amber-100 border-2 border-dashed border-amber-300 rounded-xl w-16 h-16 flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-gray-500 text-center text-sm">No preview available</p>
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className="p-3 sm:p-4 flex flex-col gap-2">
          {/* Title + Stars in one row */}
          <div className="flex items-center justify-between gap-2">
            <h3
              className="text-sm sm:text-base font-semibold text-gray-800 truncate"
              title={template?.title}
            >
              {template?.title || 'Premium Template'}
            </h3>
            
            {/* ✨ NEW: Star Rating Badge */}
            {template?.rating && (
              <div className="flex-shrink-0 flex items-center gap-1 bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full">
                <span className="text-xs sm:text-sm font-bold leading-none">{template.rating}</span>
                {/* Star Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-row gap-2 mt-2 w-full">
            {/* Preview Button */}
            <motion.button
              onClick={handlePreview}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 text-[11px] sm:text-sm border border-teal-500 text-teal-600 rounded-full py-1.5 sm:py-2 hover:bg-teal-50 active:scale-95 transition"
            >
              Preview
            </motion.button>

            {/* Edit in Canva Button */}
            <motion.a
              href={template?.canvaLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleCanvaClick} // GA event added here
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 text-[11px] sm:text-sm 
                           bg-amber-500 text-gray-900 font-medium 
                           rounded-full py-1.5 sm:py-2 text-center 
                           shadow-sm hover:bg-amber-400 
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