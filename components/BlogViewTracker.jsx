'use client';

import { useEffect } from 'react';
import { trackEvent } from '../lib/analytics';

export default function BlogViewTracker({ slug }) {
  useEffect(() => {
    if (!slug) return;

    trackEvent('blog_view', {
      blog_slug: slug,
    });
  }, [slug]);

  return null; // 👈 renders nothing
}
