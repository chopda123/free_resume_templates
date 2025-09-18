// components/blog/PortableText.jsx
import Image from 'next/image';
import { urlFor } from '@/lib/imageUrl';

const PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="my-6 relative w-full h-96">
          <Image
            src={urlFor(value).width(800).height(400).url()}
            alt={value.alt || ' '}
            fill
            className="object-contain"
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
      <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg my-6 overflow-x-auto">
        <code>{value.code}</code>
      </pre>
    ),
    quote: ({ value }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic my-6">
        "{value.text}"
        {value.author && (
          <footer className="text-sm text-gray-600 mt-2">— {value.author}</footer>
        )}
      </blockquote>
    )
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          className="text-blue-600 hover:underline"
        >
          {children}
        </a>
      );
    }
  },
  block: {
    h2: ({ children }) => <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>,
    normal: ({ children }) => <p className="mb-4">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">
        {children}
      </blockquote>
    )
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-5 mb-4">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-5 mb-4">{children}</ol>
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-1">{children}</li>
  }
};

export default function PortableText({ value }) {
  // You would need to install @portabletext/react
  // For now, we'll use a simple implementation
  return (
    <div className="prose max-w-none">
      {value.map((block, i) => {
        if (block._type === 'block') {
          const Tag = PortableTextComponents.block[block.style] || PortableTextComponents.block.normal;
          return <Tag key={i}>{block.children.map(child => child.text).join('')}</Tag>;
        }
        
        // Handle other types
        const Component = PortableTextComponents.types[block._type];
        if (Component) {
          return <Component key={i} value={block} />;
        }
        
        return null;
      })}
    </div>
  );
}