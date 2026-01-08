


"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useCallback } from 'react';
import { trackEvent } from '../lib/analytics';

export default function TemplateCard({ template, onPreview }) {
  const [isPressed, setIsPressed] = useState(false);

  const imageUrl = template?.mainImage?.asset?.url;
  const altText =
    template?.mainImage?.alt || template?.title || 'Template preview';

  const templateSlug = template?.slug;

  // 🔹 Preview handler (image + preview button)
  const handlePreview = useCallback(() => {
    if (templateSlug) {
      trackEvent('template_preview_click', {
        template_slug: templateSlug,
      });
    }

    setIsPressed(true);
    const t = setTimeout(() => {
      onPreview?.();
      setIsPressed(false);
    }, 120);

    return () => clearTimeout(t);
  }, [onPreview, templateSlug]);

  // 🔹 Direct Canva click on card
  const handleCanvaClick = () => {
    if (!templateSlug) return;

    trackEvent('template_edit_click', {
      template_slug: templateSlug,
    });
  };

  return (
    <motion.div
      className="w-full"
      whileHover={{ y: -8, scale: 1.02 }}
      animate={{ scale: isPressed ? 0.98 : 1 }}
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.35 }}
            >
              <Image
                src={imageUrl}
                alt={altText}
                fill
                className="object-cover object-top select-none rounded-t-2xl"
                draggable={false}
              />
            </motion.div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 rounded-t-2xl">
              <p className="text-gray-500 text-sm">No preview available</p>
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className="p-3 sm:p-4 flex flex-col gap-2">
          {/* Title + Rating */}
          <div className="flex items-center justify-between gap-2">
            <h3
              className="text-sm sm:text-base font-semibold text-gray-800 truncate"
              title={template?.title}
            >
              {template?.title || 'Premium Template'}
            </h3>

            {template?.rating && (
              <div className="flex-shrink-0 flex items-center gap-1 bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full">
                <span className="text-xs sm:text-sm font-bold leading-none">
                  {template.rating}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5 text-amber-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-row gap-2 mt-2 w-full">
            {/* Preview */}
            <motion.button
              onClick={handlePreview}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 text-[11px] sm:text-sm border border-teal-500 text-teal-600 rounded-full py-1.5 sm:py-2 hover:bg-teal-50 transition"
            >
              Preview
            </motion.button>

            {/* Edit in Canva */}
            <motion.a
              href={template?.canvaLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleCanvaClick}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 text-[11px] sm:text-sm
                         bg-amber-500 text-gray-900 font-medium
                         rounded-full py-1.5 sm:py-2 text-center
                         shadow-sm hover:bg-amber-400 transition"
            >
              Edit in Canva
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
