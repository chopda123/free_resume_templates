

// components/blog/PortableText.jsx
"use client";

import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/lib/imageUrl";

const components = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      return (
        <div className="my-6 relative w-full h-96">
          <Image
            src={urlFor(value).width(800).height(400).url()}
            alt={value.alt || " "}
            fill
            className="object-contain rounded-lg"
          />
          {value.caption && (
            <div className="text-center text-sm text-gray-500 mt-2">
              {value.caption}
            </div>
          )}
        </div>
      );
    },
    code: ({ value }) => (
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg my-6 overflow-x-auto text-sm">
        <code>{value?.code || ""}</code>
      </pre>
    ),
    quote: ({ value }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic my-6">
        "{value?.text || ""}"
        {value?.author && (
          <footer className="text-sm text-gray-600 mt-2">— {value.author}</footer>
        )}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      // Add safety check for undefined href
      const href = value?.href || "";
      const rel = !href.startsWith("/") ? "noreferrer noopener" : undefined;
      return (
        <a
          href={href}
          rel={rel}
          target={!href.startsWith("/") ? "_blank" : undefined}
          className="text-blue-600 hover:underline"
        >
          {children}
        </a>
      );
    },
    // Add internalLink handler if you're using it in your schema
    internalLink: ({ children, value }) => {
      const slug = value?.reference?.slug?.current || "";
      return (
        <a href={`/blog/${slug}`} className="text-blue-600 hover:underline">
          {children}
        </a>
      );
    },
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>
    ),
    normal: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 space-y-2 mb-4">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 space-y-2 mb-4">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-1">{children}</li>,
  },
};

export default function PortableTextComponent({ value }) {
  return (
    <div className="prose prose-lg max-w-none">
      <PortableText value={value} components={components} />
    </div>
  );
}