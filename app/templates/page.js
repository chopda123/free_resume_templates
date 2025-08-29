
// "use client";

// import { useEffect, useState, useCallback } from 'react';
// import { client } from '../../lib/sanity';
// import { templatesQuery } from '../../lib/queries';
// import TemplateCard from '../../components/TemplateCard';
// import HorizontalTemplateFilter from '../../components/HorizontalTemplateFilter';
// import PreviewModal from '../../components/PreviewModal';
// import Link from 'next/link';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaArrowLeft, FaArrowRight, FaTimes } from 'react-icons/fa';
// import Head from 'next/head';

// export default function TemplatesPage() {
//   const [templates, setTemplates] = useState([]);
//   const [filteredTemplates, setFilteredTemplates] = useState([]);
//   const [previewTemplate, setPreviewTemplate] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const fetchTemplates = useCallback(async () => {
//     try {
//       setLoading(true);
//       const data = await client.fetch(templatesQuery);
      
//       if (!data || data.length === 0) {
//         throw new Error('No templates found. Please create some in Sanity Studio.');
//       }
      
//       setTemplates(data);
//       setFilteredTemplates(data);
//       setError(null);
//     } catch (error) {
//       console.error('Error fetching templates:', error);
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchTemplates();
//   }, [fetchTemplates]);

//   const handleFilterChange = useCallback((filters) => {
//     let filtered = [...templates];
    
//     // Apply career stage filter
//     if (filters.careerStages && filters.careerStages.length > 0) {
//       filtered = filtered.filter(template => 
//         template.careerStages && template.careerStages.some(stage => 
//           filters.careerStages.includes(stage)
//         )
//       );
//     }
    
//     // Apply style filter
//     if (filters.styles && filters.styles.length > 0) {
//       filtered = filtered.filter(template => 
//         template.styles && template.styles.some(style => 
//           filters.styles.includes(style)
//         )
//       );
//     }
    
//     // Apply role filter
//     if (filters.roles && filters.roles.length > 0) {
//       filtered = filtered.filter(template => 
//         filters.roles.includes(template.role)
//       );
//     }
    
//     setFilteredTemplates(filtered);
//   }, [templates]);

//   const resetAllFilters = useCallback(() => {
//     handleFilterChange({
//       careerStages: [],
//       styles: [],
//       roles: []
//     });
//   }, [handleFilterChange]);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 overflow-hidden">
//       <Head>
//         <title>Resume Templates | ResumeCraft</title>
//         <meta name="description" content="Browse our collection of professional, ATS-friendly resume templates designed to help you land your dream job." />
//       </Head>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {mobileMenuOpen && (
//           <motion.div 
//             initial={{ opacity: 0, x: 100 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: 100 }}
//             className="fixed inset-0 bg-gray-900 z-50 p-4 md:hidden"
//           >
//             <div className="flex justify-end mb-8">
//               <button 
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="text-gray-200 p-2"
//               >
//                 <FaTimes size={24} />
//               </button>
//             </div>
            
//             <div className="flex flex-col space-y-8 items-center mt-12">
//               <Link 
//                 href="/"
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="text-gray-200 hover:text-amber-400 text-xl transition-colors"
//               >
//                 Home
//               </Link>

//               <a 
//                 href="#how-it-works" 
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="text-gray-200 hover:text-amber-400 text-xl transition-colors"
//               >
//                 How It Works
//               </a>
//               <a 
//                 href="#testimonials" 
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="text-gray-200 hover:text-amber-400 text-xl transition-colors"
//               >
//                 Testimonials
//               </a>
//               <Link 
//                 href="/templates"
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="bg-amber-500 text-gray-900 px-6 py-3 rounded-full font-bold hover:bg-amber-400 transition-colors"
//               >
//                 Browse Templates
//               </Link>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Premium Header */}
//       <header className="bg-gray-900/80 text-gray-200 py-4 px-4 md:px-8 border-b border-amber-500/20 sticky top-0 z-40 backdrop-blur-md">
//         <div className="container mx-auto max-w-7xl">
//           <div className="flex items-center justify-between">
//             <Link 
//               href="/"
//               className="flex items-center space-x-3 cursor-pointer group"
//             >
//               <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
//                 <span className="text-gray-900 font-bold text-lg">R</span>
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">ResumeCraft</h1>
//               </div>
//             </Link>
            
//             {/* Desktop Navigation */}
//             <nav className="hidden md:flex space-x-8 items-center">
//               <Link 
//                 href="/"
//                 className="text-gray-300 hover:text-amber-400 transition-colors duration-300"
//               >
//                 Home
//               </Link>
//               <a 
//                 href="#how-it-works" 
//                 className="text-gray-300 hover:text-amber-400 transition-colors duration-300"
//               >
//                 How It Works
//               </a>
//               <a 
//                 href="#testimonials" 
//                 className="text-gray-300 hover:text-amber-400 transition-colors duration-300"
//               >
//                 Testimonials
//               </a>
//               <Link 
//                 href="/templates"
//                 className="bg-amber-500 text-gray-900 px-5 py-2.5 rounded-full font-bold hover:bg-amber-400 transition-colors"
//               >
//                 Templates
//               </Link>
//             </nav>
            
//             {/* Mobile Menu Button */}
//             <button 
//               className="md:hidden text-gray-200 p-2"
//               onClick={() => setMobileMenuOpen(true)}
//               aria-label="Open menu"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </header>

//       <main className="flex-1 py-12 px-4">
//         <div className="container mx-auto max-w-7xl">
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="text-center mb-12"
//           >
//             <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
//               Professional Resume Templates
//             </h1>
//             <p className="text-gray-400 text-lg max-w-2xl mx-auto">
//               Browse our collection of expertly designed templates to find the perfect resume for your career.
//             </p>
//           </motion.div>

//           {/* Horizontal Filter Component */}
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//             className="mb-12"
//           >
//             <HorizontalTemplateFilter 
//               onFilterChange={handleFilterChange}
//               onReset={resetAllFilters}
//             />
//           </motion.div>

//           {/* Templates Grid */}
//           {loading ? (
//             <div className="flex justify-center items-center py-20">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
//             </div>
//           ) : error ? (
//             <div className="text-center py-20">
//               <p className="text-gray-400 mb-4">{error}</p>
//               <button 
//                 onClick={fetchTemplates}
//                 className="bg-amber-500 text-gray-900 px-6 py-2 rounded-full hover:bg-amber-400 transition-colors"
//               >
//                 Try Again
//               </button>
//             </div>
//           ) : filteredTemplates.length === 0 ? (
//             <div className="text-center py-20">
//               <p className="text-gray-400 mb-4">No templates match your filters.</p>
//               <button 
//                 onClick={resetAllFilters}
//                 className="bg-amber-500 text-gray-900 px-6 py-2 rounded-full hover:bg-amber-400 transition-colors"
//               >
//                 Clear Filters
//               </button>
//             </div>
//           ) : (
//             <motion.div 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//             >
//               {filteredTemplates.map((template) => (
//                 <TemplateCard
//                   key={template._id}
//                   template={template}
//                   onPreview={() => setPreviewTemplate(template)}
//                 />
//               ))}
//             </motion.div>
//           )}
//         </div>
//       </main>

//       {/* Preview Modal */}
//       <AnimatePresence>
//         {previewTemplate && (
//           <PreviewModal
//             template={previewTemplate}
//             onClose={() => setPreviewTemplate(null)}
//           />
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }














// //////////////////////////////////////////////////V2


// "use client";

// import { useEffect, useState, useCallback } from 'react';
// import { client } from '../../lib/sanity';
// import { templatesQuery } from '../../lib/queries';
// import TemplateCard from '../../components/TemplateCard';
// import HorizontalTemplateFilter from '../../components/HorizontalTemplateFilter';
// import PreviewModal from '../../components/PreviewModal';
// import Link from 'next/link';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaArrowLeft, FaArrowRight, FaTimes, FaBars } from 'react-icons/fa';
// import Head from 'next/head';

// export default function TemplatesPage() {
//   const [templates, setTemplates] = useState([]);
//   const [filteredTemplates, setFilteredTemplates] = useState([]);
//   const [previewTemplate, setPreviewTemplate] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const fetchTemplates = useCallback(async () => {
//     try {
//       setLoading(true);
//       const data = await client.fetch(templatesQuery);
      
//       if (!data || data.length === 0) {
//         throw new Error('No templates found. Please create some in Sanity Studio.');
//       }
      
//       setTemplates(data);
//       setFilteredTemplates(data);
//       setError(null);
//     } catch (error) {
//       console.error('Error fetching templates:', error);
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchTemplates();
//   }, [fetchTemplates]);

//   const handleFilterChange = useCallback((filters) => {
//     let filtered = [...templates];
    
//     // Apply career stage filter
//     if (filters.careerStages && filters.careerStages.length > 0) {
//       filtered = filtered.filter(template => 
//         template.careerStages && template.careerStages.some(stage => 
//           filters.careerStages.includes(stage)
//         )
//       );
//     }
    
//     // Apply style filter
//     if (filters.styles && filters.styles.length > 0) {
//       filtered = filtered.filter(template => 
//         template.styles && template.styles.some(style => 
//           filters.styles.includes(style)
//         )
//       );
//     }
    
//     // Apply role filter
//     if (filters.roles && filters.roles.length > 0) {
//       filtered = filtered.filter(template => 
//         filters.roles.includes(template.role)
//       );
//     }
    
//     setFilteredTemplates(filtered);
//   }, [templates]);

//   const resetAllFilters = useCallback(() => {
//     handleFilterChange({
//       careerStages: [],
//       styles: [],
//       roles: []
//     });
//   }, [handleFilterChange]);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 overflow-hidden">
//       <Head>
//         <title>Resume Templates | ResumeCraft</title>
//         <meta name="description" content="Browse our collection of professional, ATS-friendly resume templates designed to help you land your dream job." />
//         <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
//       </Head>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {mobileMenuOpen && (
//           <motion.div 
//             initial={{ opacity: 0, x: 100 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: 100 }}
//             className="fixed inset-0 bg-gray-900 z-50 p-4 md:hidden"
//           >
//             <div className="flex justify-end mb-8">
//               <button 
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="text-gray-200 p-2"
//                 aria-label="Close menu"
//               >
//                 <FaTimes size={24} />
//               </button>
//             </div>
            
//             <div className="flex flex-col space-y-6 items-center mt-12">
//               <Link 
//                 href="/"
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="text-gray-200 hover:text-amber-400 text-lg transition-colors"
//               >
//                 Home
//               </Link>

//               <a 
//                 href="#how-it-works" 
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="text-gray-200 hover:text-amber-400 text-lg transition-colors"
//               >
//                 How It Works
//               </a>
//               <a 
//                 href="#testimonials" 
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="text-gray-200 hover:text-amber-400 text-lg transition-colors"
//               >
//                 Testimonials
//               </a>
//               <Link 
//                 href="/templates"
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="bg-amber-500 text-gray-900 px-5 py-2.5 rounded-full font-bold hover:bg-amber-400 transition-colors"
//               >
//                 Browse Templates
//               </Link>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Premium Header */}
//       <header className="bg-gray-900/80 text-gray-200 py-3 md:py-4 px-4 md:px-8 border-b border-amber-500/20 sticky top-0 z-40 backdrop-blur-md">
//         <div className="container mx-auto max-w-7xl">
//           <div className="flex items-center justify-between">
//             <Link 
//               href="/"
//               className="flex items-center space-x-2 md:space-x-3 cursor-pointer group"
//             >
//               <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
//                 <span className="text-gray-900 font-bold text-sm md:text-lg">R</span>
//               </div>
//               <div>
//                 <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">ResumeCraft</h1>
//               </div>
//             </Link>
            
//             {/* Desktop Navigation */}
//             <nav className="hidden md:flex space-x-6 lg:space-x-8 items-center">
//               <Link 
//                 href="/"
//                 className="text-gray-300 hover:text-amber-400 transition-colors duration-300 text-sm lg:text-base"
//               >
//                 Home
//               </Link>
//               <a 
//                 href="#how-it-works" 
//                 className="text-gray-300 hover:text-amber-400 transition-colors duration-300 text-sm lg:text-base"
//               >
//                 How It Works
//               </a>
//               <a 
//                 href="#testimonials" 
//                 className="text-gray-300 hover:text-amber-400 transition-colors duration-300 text-sm lg:text-base"
//               >
//                 Testimonials
//               </a>
//               <Link 
//                 href="/templates"
//                 className="bg-amber-500 text-gray-900 px-4 py-2 md:px-5 md:py-2.5 rounded-full font-bold hover:bg-amber-400 transition-colors text-sm md:text-base"
//               >
//                 Templates
//               </Link>
//             </nav>
            
//             {/* Mobile Menu Button */}
//             <button 
//               className="md:hidden text-gray-200 p-1.5"
//               onClick={() => setMobileMenuOpen(true)}
//               aria-label="Open menu"
//             >
//               <FaBars size={20} />
//             </button>
//           </div>
//         </div>
//       </header>

//       <main className="flex-1 py-8 md:py-12 px-4">
//         <div className="container mx-auto max-w-7xl">
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="text-center mb-8 md:mb-12"
//           >
//             <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">
//               Professional Resume Templates
//             </h1>
//             <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
//               Browse our collection of expertly designed templates to find the perfect resume for your career.
//             </p>
//           </motion.div>

//           {/* Horizontal Filter Component */}
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//             className="mb-8 md:mb-12"
//           >
//             <HorizontalTemplateFilter 
//               onFilterChange={handleFilterChange}
//               onReset={resetAllFilters}
//             />
//           </motion.div>

//           {/* Templates Grid */}
//           {loading ? (
//             <div className="flex justify-center items-center py-12 md:py-20">
//               <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-amber-500"></div>
//             </div>
//           ) : error ? (
//             <div className="text-center py-12 md:py-20">
//               <p className="text-gray-400 mb-4 text-base md:text-lg">{error}</p>
//               <button 
//                 onClick={fetchTemplates}
//                 className="bg-amber-500 text-gray-900 px-5 py-2 md:px-6 md:py-2.5 rounded-full font-bold hover:bg-amber-400 transition-colors text-sm md:text-base"
//               >
//                 Try Again
//               </button>
//             </div>
//           ) : filteredTemplates.length === 0 ? (
//             <div className="text-center py-12 md:py-20">
//               <p className="text-gray-400 mb-4 text-base md:text-lg">No templates match your filters.</p>
//               <button 
//                 onClick={resetAllFilters}
//                 className="bg-amber-500 text-gray-900 px-5 py-2 md:px-6 md:py-2.5 rounded-full font-bold hover:bg-amber-400 transition-colors text-sm md:text-base"
//               >
//                 Clear Filters
//               </button>
//             </div>
//           ) : (
//             <motion.div 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
//             >
//               {filteredTemplates.map((template) => (
//                 <TemplateCard
//                   key={template._id}
//                   template={template}
//                   onPreview={() => setPreviewTemplate(template)}
//                 />
//               ))}
//             </motion.div>
//           )}
//         </div>
//       </main>

//       {/* Preview Modal */}
//       <AnimatePresence>
//         {previewTemplate && (
//           <PreviewModal
//             template={previewTemplate}
//             onClose={() => setPreviewTemplate(null)}
//           />
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

"use client";

import { useEffect, useState, useCallback } from 'react';
import { client } from '../../lib/sanity';
import { templatesQuery } from '../../lib/queries';
import TemplateCard from '../../components/TemplateCard';
import HorizontalTemplateFilter from '../../components/HorizontalTemplateFilter';
import PreviewModal from '../../components/PreviewModal';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaBars } from 'react-icons/fa';
import Head from 'next/head';

export default function TemplatesPage() {
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const fetchTemplates = useCallback(async () => {
    try {
      setLoading(true);
      const data = await client.fetch(templatesQuery);

      if (!data || data.length === 0) {
        throw new Error('No templates found. Please create some in Sanity Studio.');
      }

      setTemplates(data);
      setFilteredTemplates(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching templates:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  const handleFilterChange = useCallback((filters) => {
    let filtered = [...templates];

    if (filters.careerStages && filters.careerStages.length > 0) {
      filtered = filtered.filter(template =>
        template.careerStages && template.careerStages.some(stage =>
          filters.careerStages.includes(stage)
        )
      );
    }

    if (filters.styles && filters.styles.length > 0) {
      filtered = filtered.filter(template =>
        template.styles && template.styles.some(style =>
          filters.styles.includes(style)
        )
      );
    }

    if (filters.roles && filters.roles.length > 0) {
      filtered = filtered.filter(template =>
        filters.roles.includes(template.role)
      );
    }

    setFilteredTemplates(filtered);
  }, [templates]);

  const resetAllFilters = useCallback(() => {
    handleFilterChange({
      careerStages: [],
      styles: [],
      roles: []
    });
  }, [handleFilterChange]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 overflow-hidden">
      <Head>
        <title>Resume Templates | ResumeCraft</title>
        <meta name="description" content="Browse our collection of professional, ATS-friendly resume templates designed to help you land your dream job." />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-0 bg-gray-900 z-50 p-4 md:hidden"
          >
            <div className="flex justify-end mb-8">
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-200 p-2"
                aria-label="Close menu"
              >
                <FaTimes size={24} />
              </button>
            </div>
            
            <div className="flex flex-col space-y-6 items-center mt-12">
              <Link 
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-200 hover:text-amber-400 text-lg transition-colors"
              >
                Home
              </Link>

              <a 
                href="#how-it-works" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-200 hover:text-amber-400 text-lg transition-colors"
              >
                How It Works
              </a>
              <a 
                href="#testimonials" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-200 hover:text-amber-400 text-lg transition-colors"
              >
                Testimonials
              </a>
              <Link 
                href="/templates"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-amber-500 text-gray-900 px-5 py-2.5 rounded-full font-bold hover:bg-amber-400 transition-colors"
              >
                Browse Templates
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium Header */}
      <header className="bg-gray-900/80 text-gray-200 py-3 md:py-4 px-4 md:px-8 border-b border-amber-500/20 sticky top-0 z-40 backdrop-blur-md">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <Link 
              href="/"
              className="flex items-center space-x-2 md:space-x-3 cursor-pointer group"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                <span className="text-gray-900 font-bold text-sm md:text-lg">R</span>
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">ResumeCraft</h1>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6 lg:space-x-8 items-center">
              <Link 
                href="/"
                className="text-gray-300 hover:text-amber-400 transition-colors duration-300 text-sm lg:text-base"
              >
                Home
              </Link>
              <a 
                href="#how-it-works" 
                className="text-gray-300 hover:text-amber-400 transition-colors duration-300 text-sm lg:text-base"
              >
                How It Works
              </a>
              <a 
                href="#testimonials" 
                className="text-gray-300 hover:text-amber-400 transition-colors duration-300 text-sm lg:text-base"
              >
                Testimonials
              </a>
              <Link 
                href="/templates"
                className="bg-amber-500 text-gray-900 px-4 py-2 md:px-5 md:py-2.5 rounded-full font-bold hover:bg-amber-400 transition-colors text-sm md:text-base"
              >
                Templates
              </Link>
            </nav>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-200 p-1.5"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <FaBars size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 py-6 md:py-12 px-3 md:px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6 md:mb-12"
          >
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-4">
              Professional Resume Templates
            </h1>
            <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              Browse our collection of expertly designed templates to find the perfect resume for your career.
            </p>
          </motion.div>

          {/* Horizontal Filter Component */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 md:mb-12"
          >
            <HorizontalTemplateFilter 
              onFilterChange={handleFilterChange}
              onReset={resetAllFilters}
            />
          </motion.div>

          {/* Templates Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-12 md:py-20">
              <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-amber-500"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12 md:py-20">
              <p className="text-gray-400 mb-4 text-sm md:text-lg">{error}</p>
              <button 
                onClick={fetchTemplates}
                className="bg-amber-500 text-gray-900 px-4 py-2 md:px-6 md:py-2.5 rounded-full font-bold hover:bg-amber-400 transition-colors text-sm md:text-base"
              >
                Try Again
              </button>
            </div>
          ) : filteredTemplates.length === 0 ? (
            <div className="text-center py-12 md:py-20">
              <p className="text-gray-400 mb-4 text-sm md:text-lg">No templates match your filters.</p>
              <button 
                onClick={resetAllFilters}
                className="bg-amber-500 text-gray-900 px-4 py-2 md:px-6 md:py-2.5 rounded-full font-bold hover:bg-amber-400 transition-colors text-sm md:text-base"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              // 🔥 Mobile: 2 per row, smaller gaps
              className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6"
            >
              {filteredTemplates.map((template) => (
                <TemplateCard
                  key={template._id}
                  template={template}
                  onPreview={() => setPreviewTemplate(template)}
                />
              ))}
            </motion.div>
          )}
        </div>
      </main>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewTemplate && (
          <PreviewModal
            template={previewTemplate}
            onClose={() => setPreviewTemplate(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
