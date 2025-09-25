
"use client";

import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { urlFor } from "../../lib/imageUrl";

const components = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      return (
        <div className="my-8 relative w-full h-96">
          <Image
            src={urlFor(value).width(800).height(400).url()}
            alt={value.alt || " "}
            fill
            className="object-cover rounded-lg"
            priority={false}
          />
          {value.caption && (
            <div className="text-center text-sm text-gray-500 mt-3">
              {value.caption}
            </div>
          )}
        </div>
      );
    },
    code: ({ value }) => (
      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg my-6 overflow-x-auto text-sm border border-gray-200 font-mono">
        <code>{value?.code || ""}</code>
      </pre>
    ),
    quote: ({ value }) => (
      <blockquote className="border-l-4 border-blue-500 pl-6 italic my-6 bg-blue-50 p-4 rounded-r-lg">
        <p className="text-gray-700 text-lg">"{value?.text || ""}"</p>
        {value?.author && (
          <footer className="text-sm text-gray-600 mt-3">— {value.author}</footer>
        )}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href || "";
      const rel = !href.startsWith("/") ? "noreferrer noopener" : undefined;
      return (
        <a
          href={href}
          rel={rel}
          target={!href.startsWith("/") ? "_blank" : undefined}
          className="text-blue-600 hover:underline font-medium"
        >
          {children}
        </a>
      );
    },
    internalLink: ({ children, value }) => {
      const slug = value?.reference?.slug?.current || "";
      return (
        <a href={`/blog/${slug}`} className="text-blue-600 hover:underline font-medium">
          {children}
        </a>
      );
    },
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mt-10 mb-6 text-gray-900 border-b border-gray-200 pb-2">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold mt-6 mb-3 text-gray-900">{children}</h3>
    ),
    normal: ({ children }) => <p className="mb-5 leading-relaxed text-gray-700 text-lg">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-6 italic my-6 bg-gray-50 p-4 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 space-y-2 mb-5 text-gray-700">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 space-y-2 mb-5 text-gray-700">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-2">{children}</li>,
    number: ({ children }) => <li className="mb-2">{children}</li>,
  },
};

export default function PortableTextComponent({ value }) {
  return (
    <div className="text-content">
      <PortableText value={value} components={components} />
    </div>
  );
}