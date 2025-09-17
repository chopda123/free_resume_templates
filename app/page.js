

"use client";

import { useEffect, useState, useRef, useCallback } from 'react';
import { client } from '../lib/sanity';
import { templatesQuery } from '../lib/queries';
import TemplateCard from '../components/TemplateCard';
import PreviewModal from '../components/PreviewModal';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaTimes, FaStar, FaCheck, FaBars } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import Script from "next/script";

// Add viewport meta tag to Head component
const HeadContent = () => (
  <Head>
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
    
    <title>FreeResume | Professional ATS-Friendly Resume Templates</title>
    <meta name="description" content="Create your perfect resume in minutes with our professional, ATS-friendly templates. Customize instantly with our Canva-powered editor." />
    <meta name="keywords" content="resume, cv, templates, ATS-friendly, job application, career" />
    <meta property="og:title" content="Freeresume | Professional Resume Templates" />
    <meta property="og:description" content="Create your perfect resume in minutes with our professional, ATS-friendly templates." />
    <meta property="og:type" content="website" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <link rel="icon" href="/favicon.ico" />
  </Head>
);

// StarRating component defined inline
const StarRating = ({ rating }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-amber-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="bg-gray-800/70 border border-gray-700/30 rounded-2xl p-6 text-center"
  >
    <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </motion.div>
);

export default function Home() {
  const scrollRef = useRef(null);
  const testimonialRef = useRef(null);
  const [templates, setTemplates] = useState([]);
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  // Memoized data fetching
  const fetchTemplates = useCallback(async () => {
    try {
      setLoading(true);
      const data = await client.fetch(templatesQuery);
      
      if (!data || data.length === 0) {
        throw new Error('No templates found. Please create some in Sanity Studio.');
      }
      
      setTemplates(data);
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

  // Scroll utilities
  const scrollToSection = useCallback((sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleNavigation = useCallback((e, sectionId) => {
    e.preventDefault();
    scrollToSection(sectionId);
  }, [scrollToSection]);

  const handleResourceClick = useCallback((e) => {
    e.preventDefault();
    setShowComingSoon(true);
  }, []);

  const scrollTemplates = useCallback((direction, ref = scrollRef) => {
    if (ref.current) {
      const { current: container } = ref;
      const scrollAmount = direction === 'left' ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }, []);

  // Filter templates by category
  const filteredTemplates = activeFilter === 'all' 
    ? templates 
    : templates.filter(template => template.category === activeFilter);

  // Featured templates (first 6)
  const featuredTemplates = templates.slice(0, 6);

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-b from-gray-900 to-gray-950">
      <HeadContent />
      
      {/* Coming Soon Modal */}
      <AnimatePresence>
        {showComingSoon && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 text-center border border-amber-500/20"
            >
              <h3 className="text-2xl font-bold text-amber-400 mb-4">Coming Soon!</h3>
              <p className="text-gray-300 mb-6">
                This feature is currently under development. We&apos;re working hard to bring you an amazing experience.
              </p>
              <button 
                onClick={() => setShowComingSoon(false)}
                className="bg-amber-500 text-gray-900 px-6 py-3 rounded-full font-bold hover:bg-amber-400 transition-colors w-full sm:w-auto"
              >
                Continue Browsing
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
            
            <div className="flex flex-col space-y-8 items-center mt-12">
              <Link 
                href="/templates"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-200 hover:text-amber-400 text-xl transition-colors"
              >
                Templates
              </Link>

              <a 
                href="#how-it-works" 
                onClick={(e) => {
                  handleNavigation(e, 'how-it-works');
                  setMobileMenuOpen(false);
                }}
                className="text-gray-200 hover:text-amber-400 text-xl transition-colors"
              >
                How It Works
              </a>
              <a 
                href="#testimonials" 
                onClick={(e) => {
                  handleNavigation(e, 'testimonials');
                  setMobileMenuOpen(false);
                }}
                className="text-gray-200 hover:text-amber-400 text-xl transition-colors"
              >
                Testimonials
              </a>
              <Link 
                href="/templates"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-amber-500 text-gray-900 px-6 py-3 rounded-full font-bold hover:bg-amber-400 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium Header */}
      <header className="bg-gray-900/95 text-gray-200 py-4 px-4 md:px-8 border-b border-amber-500/20 sticky top-0 z-40">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <Link 
              href="/"
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                <span className="text-gray-900 font-bold text-lg">R</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">FreeResume</h1>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 items-center">
              <Link 
                href="/templates"
                className="text-gray-300 hover:text-amber-400 transition-colors duration-300"
              >
                Templates
              </Link>
              <a 
                href="#how-it-works" 
                onClick={(e) => handleNavigation(e, 'how-it-works')}
                className="text-gray-300 hover:text-amber-400 transition-colors duration-300"
              >
                How It Works
              </a>
              <a 
                href="#testimonials" 
                onClick={(e) => handleNavigation(e, 'testimonials')}
                className="text-gray-300 hover:text-amber-400 transition-colors duration-300"
              >
                Testimonials
              </a>
              <Link 
                href="/templates"
                className="bg-amber-500 text-gray-900 px-5 py-2.5 rounded-full font-bold hover:bg-amber-400 transition-colors"
              >
                Get Started
              </Link>
            </nav>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-200 p-2"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <FaBars size={24} />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 text-white py-8 md:py-20 px-3 sm:px-4 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/hero-resume.png')] bg-cover bg-center mix-blend-soft-light opacity-35"></div>
          <div className="container mx-auto max-w-7xl relative z-10">
            
            {/* Grid: Always 2 cols (even on mobile) */}
            <div className="grid grid-cols-2 gap-4 sm:gap-8 md:gap-12 items-center">
              
              {/* Left Section (Text) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="col-span-1 flex flex-col justify-center items-center sm:items-start text-center sm:text-left"
              >
                {/* Heading */}
                <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4 md:mb-6 leading-snug sm:leading-tight">
                  Craft Your Perfect <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">Resume</span> in Minutes
                </h1>
                
                {/* Paragraph */}
                <p className="text-[11px] sm:text-base md:text-lg text-gray-300 mb-3 sm:mb-6 md:mb-8 leading-relaxed max-w-full sm:max-w-xl">
                  Professional, ATS-friendly templates designed to get you hired. 
                  Customize instantly with our Canva-powered editor - no design skills needed.
                </p>
                
                {/* Buttons → smaller + side by side */}
                <div className="flex flex-row gap-2 sm:gap-3 md:gap-4 w-full sm:w-auto justify-center sm:justify-start">
                  <Link 
                    href="/templates"
                    className="flex-1 sm:flex-none bg-amber-500 text-gray-900 px-3 py-1.5 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full text-[11px] sm:text-base md:text-lg font-bold hover:bg-amber-400 transition-colors text-center shadow-md sm:shadow-lg shadow-amber-500/20"
                  >
                    Browse Templates
                  </Link>
                  <button 
                    onClick={(e) => handleNavigation(e, 'how-it-works')}
                    className="flex-1 sm:flex-none border-2 border-amber-500/30 text-amber-400 px-3 py-1.5 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full text-[11px] sm:text-base md:text-lg font-bold hover:bg-amber-500/10 transition-colors"
                  >
                    How It Works
                  </button>
                </div>
              </motion.div>

              {/* Right Section (Image) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative col-span-1 flex justify-center items-center"
              >
                <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/10 rounded-xl sm:rounded-3xl p-2 sm:p-4 md:p-6 border border-amber-500/20">
                  {/* Responsive container for image size */}
                  <div className="bg-gray-800 rounded-lg sm:rounded-2xl shadow-xl sm:shadow-2xl overflow-hidden transform rotate-1 md:rotate-2 
                                  h-[220px] w-[160px] sm:h-[280px] sm:w-[220px] md:h-[390px] md:w-[360px] mx-auto">
                    <Image
                      src="/hero-resume.png"
                      alt="Free Resume Preview - Excited User"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>

                  {/* Badge */}
                  <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 bg-amber-500 text-gray-900 px-2 sm:px-3 py-0.5 sm:py-1 md:px-4 md:py-1.5 rounded-full font-bold text-[10px] sm:text-xs shadow-md">
                    Most Popular
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="py-8 md:py-12 bg-gray-800/30">
          <div className="container mx-auto max-w-7xl px-4">
            <p className="text-center text-gray-400 text-sm uppercase tracking-wider mb-6 md:mb-8">Trusted by professionals at</p>
            <div className="flex flex-wrap justify-center gap-6 md:gap-16 items-center opacity-70">
              {['Google', 'Microsoft', 'Amazon', 'Netflix', 'Apple'].map((company) => (
                <div key={company} className="text-gray-400 font-medium text-base md:text-lg">
                  {company}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Templates Carousel Section */}
        <section id="templates" className="py-12 md:py-16 px-4 bg-gradient-to-b from-gray-900 to-gray-950">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-8 md:mb-12">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4"
              >
                Featured Resume Templates
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto"
              >
                Browse our collection of expertly designed templates to find the perfect resume for your career.
              </motion.p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12 md:py-20">
                <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-amber-500"></div>
              </div>
            ) : error ? (
              <div className="text-center py-12 md:py-20">
                <p className="text-gray-400 mb-4">{error}</p>
                <button 
                  onClick={fetchTemplates}
                  className="bg-amber-500 text-gray-900 px-5 py-2 rounded-full hover:bg-amber-400 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : featuredTemplates.length === 0 ? (
              <div className="text-center py-12 md:py-20">
                <p className="text-gray-400 mb-4">No templates available at the moment.</p>
              </div>
            ) : (
              <div className="relative">
                <div 
                  ref={scrollRef}
                  className="flex overflow-x-auto space-x-4 md:space-x-6 pb-6 md:pb-8 scrollbar-hide snap-x snap-mandatory"
                  style={{ scrollbarWidth: 'none' }}
                >
                  {featuredTemplates.map((template) => (
                    <div key={template._id} className="flex-shrink-0 w-64 sm:w-72 md:w-80 snap-start">
                      <TemplateCard
                        template={template}
                        onPreview={() => setPreviewTemplate(template)}
                      />
                    </div>
                  ))}
                </div>
                
                {/* Navigation Arrows - Hidden on mobile, shown on medium screens and up */}
                <button 
                  onClick={() => scrollTemplates('left')}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 md:-translate-x-4 bg-gray-800 rounded-full p-2 md:p-3 shadow-lg hover:bg-gray-700 transition-colors hidden sm:block"
                  aria-label="Scroll left"
                >
                  <FaArrowLeft className="text-amber-400 text-sm md:text-base" />
                </button>
                <button 
                  onClick={() => scrollTemplates('right')}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 md:translate-x-4 bg-gray-800 rounded-full p-2 md:p-3 shadow-lg hover:bg-gray-700 transition-colors hidden sm:block"
                  aria-label="Scroll right"
                >
                  <FaArrowRight className="text-amber-400 text-sm md:text-base" />
                </button>
              </div>
            )}

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center mt-8 md:mt-12"
            >
              <Link 
                href="/templates"
                className="bg-amber-500 text-gray-900 px-6 py-3 md:px-8 md:py-4 rounded-full text-base md:text-lg font-bold hover:bg-amber-400 transition-colors inline-block shadow-lg shadow-amber-500/20"
              >
                View All Templates
              </Link>
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-12 md:py-20 px-4 bg-gradient-to-b from-gray-900 to-gray-950">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12 md:mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4"
              >
                How It Works
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto"
              >
                Creating your perfect resume has never been easier. Follow these simple steps to get started.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg shadow-amber-500/30">
                  <span className="text-xl md:text-2xl font-bold text-gray-900">1</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">Choose a Template</h3>
                <p className="text-gray-400 text-sm md:text-base">
                  Browse our collection and select a template that matches your style and industry.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg shadow-amber-500/30">
                  <span className="text-xl md:text-2xl font-bold text-gray-900">2</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">Customize in Canva</h3>
                <p className="text-gray-400 text-sm md:text-base">
                  Edit your template with our easy-to-use Canva editor. No design experience needed.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg shadow-amber-500/30">
                  <span className="text-xl md:text-2xl font-bold text-gray-900">3</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">Download & Apply</h3>
                <p className="text-gray-400 text-sm md:text-base">
                  Download your professional resume and start applying for your dream job.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-12 md:py-20 px-4 bg-gradient-to-b from-gray-900 to-gray-950">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12 md:mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4"
              >
                Success Stories
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto"
              >
                Hear from professionals who landed their dream jobs with our resume templates.
              </motion.p>
            </div>

            <div className="relative" ref={testimonialRef}>
              <div className="flex overflow-x-auto space-x-4 md:space-x-6 pb-6 md:pb-8 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
                {[
                  { 
                    name: "Rajesh Kumar", 
                    role: "Software Engineer", 
                    rating: 5,
                    comment: "The clean, professional design helped me stand out in a competitive tech market. Got multiple interview calls within a week!"
                  },
                  { 
                    name: "Priya Sharma", 
                    role: "Marketing Manager", 
                    rating: 5,
                    comment: "As a marketing professional, I needed a resume that showcased my creativity while remaining professional. This template was perfect!"
                  },
                  { 
                    name: "Amit Patel", 
                    role: "Product Designer", 
                    rating: 5,
                    comment: "The visual appeal of this template perfectly complemented my design portfolio. Recruiters specifically mentioned my resume stood out."
                  },
                  { 
                    name: "Sneha Gupta", 
                    role: "Data Analyst", 
                    rating: 5,
                    comment: "The structured layout helped me present my technical skills and data projects clearly. Landed my dream job at a top tech company!"
                  }
                ].map((testimonial, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex-shrink-0 w-72 md:w-80 bg-gray-800/70 rounded-2xl p-5 md:p-6 border border-gray-700/30"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mr-3 md:mr-4">
                        <span className="text-gray-900 font-bold text-sm md:text-base">{testimonial.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-base md:text-lg">{testimonial.name}</h4>
                        <p className="text-gray-400 text-xs md:text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      <StarRating rating={testimonial.rating} />
                    </div>
                    <p className="text-gray-300 text-sm md:text-base">
                      &quot;{testimonial.comment}&quot;
                    </p>
                  </motion.div>
                ))}
              </div>
              
              {/* Navigation Arrows - Hidden on mobile, shown on medium screens and up */}
              <button 
                onClick={() => scrollTemplates('left', testimonialRef)}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 md:-translate-x-4 bg-gray-800 rounded-full p-2 md:p-3 shadow-lg hover:bg-gray-700 transition-colors hidden sm:block"
                aria-label="Scroll testimonials left"
              >
                <FaArrowLeft className="text-amber-400 text-sm md:text-base" />
              </button>
              <button 
                onClick={() => scrollTemplates('right', testimonialRef)}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 md:translate-x-4 bg-gray-800 rounded-full p-2 md:p-3 shadow-lg hover:bg-gray-700 transition-colors hidden sm:block"
                aria-label="Scroll testimonials right"
              >
                <FaArrowRight className="text-amber-400 text-sm md:text-base" />
              </button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-20 px-4 bg-gradient-to-br from-gray-900 to-gray-950 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=10')] bg-cover bg-center mix-blend-soft-light opacity-10"></div>
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4"
            >
              Ready to Create Your Resume?
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-gray-400 mb-6 md:mb-8 max-w-2xl mx-auto text-base md:text-lg"
            >
              Choose a template, customize it to your needs, and download your professional resume instantly.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Link 
                href="/templates"
                className="bg-amber-500 text-gray-900 px-6 py-3 md:px-8 md:py-4 rounded-full text-base md:text-lg font-bold hover:bg-amber-400 transition-colors inline-block shadow-lg shadow-amber-500/20"
              >
                Get Started Now
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 md:py-12 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
                  <span className="text-gray-900 font-bold text-sm md:text-base">R</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white">FreeResume</h3>
              </div>
              <p className="text-gray-400 text-sm md:text-base">
                Professional resume templates designed to help you land your dream job.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3 md:mb-4 text-base md:text-lg">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" onClick={handleResourceClick} className="text-gray-400 hover:text-amber-400 transition-colors text-sm md:text-base">Resume Tips</a></li>
                <li><a href="#" onClick={handleResourceClick} className="text-gray-400 hover:text-amber-400 transition-colors text-sm md:text-base">Cover Letters</a></li>
                <li><a href="#" onClick={handleResourceClick} className="text-gray-400 hover:text-amber-400 transition-colors text-sm md:text-base">Interview Prep</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3 md:mb-4 text-base md:text-lg">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" onClick={handleResourceClick} className="text-gray-400 hover:text-amber-400 transition-colors text-sm md:text-base">About Us</a></li>
                <li><a href="#" onClick={handleResourceClick} className="text-gray-400 hover:text-amber-400 transition-colors text-sm md:text-base">Contact</a></li>
                <li><a href="#" onClick={handleResourceClick} className="text-gray-400 hover:text-amber-400 transition-colors text-sm md:text-base">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3 md:mb-4 text-base md:text-lg">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" onClick={handleResourceClick} className="text-gray-400 hover:text-amber-400 transition-colors">
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
                <a href="#" onClick={handleResourceClick} className="text-gray-400 hover:text-amber-400 transition-colors">
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"/></svg>
                </a>
                <a href="#" onClick={handleResourceClick} className="text-gray-400 hover:text-amber-400 transition-colors">
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 极 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222极 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-xs md:text-sm">
            <p>© {new Date().getFullYear()} FreeResume. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Preview Modal */}
      <PreviewModal 
        template={previewTemplate} 
        isOpen={!!previewTemplate} 
        onClose={() => setPreviewTemplate(null)} 
      />
    </div>
  );
}