
// import "./globals.css";
// import { Inter, Playfair_Display } from "next/font/google";
// import { Analytics } from "@vercel/analytics/react";
// import Script from "next/script"; // ✅ Import Script for GA

// const inter = Inter({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600", "700"],
//   variable: "--font-inter",
// });

// const playfair = Playfair_Display({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
//   variable: "--font-playfair",
// });

// export const metadata = {
//   title: "ResumeCraft | Premium Resume Templates",
//   description:
//     "Professionally designed resume templates to elevate your career prospects. Edit directly in Canva.",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html
//       lang="en"
//       className={`scroll-smooth ${inter.variable} ${playfair.variable}`}
//     >
//       <head>
//         {/* ✅ Google Analytics (GA4) */}
//         <Script
//           src="https://www.googletagmanager.com/gtag/js?id=G-6KX3J4SWZ7"
//           strategy="afterInteractive"
//         />
//         <Script id="google-analytics" strategy="afterInteractive">
//           {`
//             window.dataLayer = window.dataLayer || [];
//             function gtag(){dataLayer.push(arguments);}
//             gtag('js', new Date());
//             gtag('config', 'G-6KX3J4SWZ7');
//           `}
//         </Script>
//       </head>
//       <body className="bg-premium-cream text-premium-navy font-sans antialiased">
//         {children}
//         <Analytics /> {/* ✅ Vercel Analytics */}
//         <div className="fixed inset-0 -z-10 overflow-hidden">
//           <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-premium-teal/5 rounded-full blur-3xl"></div>
//           <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-premium-gold/5 rounded-full blur-3xl"></div>
//         </div>
//       </body>
//     </html>
//   );
// }

// layout.js
import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

export const metadata = {
  title: "ResumeCraft | Premium Resume Templates",
  description:
    "Professionally designed resume templates to elevate your career prospects. Edit directly in Canva.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${inter.variable} ${playfair.variable}`}
    >
      <head>
        {/* ✅ Google Analytics (GA4) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6KX3J4SWZ7"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6KX3J4SWZ7');
          `}
        </Script>
      </head>
      <body className="bg-premium-cream text-premium-navy font-sans antialiased">
        {/* Navigation - Removed sticky positioning */}
        

        {children}
        
        {/* Single Footer - Removed the duplicate */}
        

        <Analytics /> {/* ✅ Vercel Analytics */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-premium-teal/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-premium-gold/5 rounded-full blur-3xl"></div>
        </div>
      </body>
    </html>
  );
}