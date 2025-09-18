// app/terms/page.js
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Use | FreeResume',
  description: 'Read our terms and conditions for using our resume template services.',
};

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      {/* Navigation Bar */}
      <nav className="bg-gray-900/95 py-4 px-6 border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white">
            FreeResume
          </Link>
          <div className="flex space-x-6">
            <Link href="/" className="text-gray-300 hover:text-amber-400 transition-colors">
              Home
            </Link>
          </div>
        </div>
      </nav>

      <div className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Terms of Use</h1>
          
          <div className="prose prose-invert prose-amber max-w-none">
            <p className="text-gray-300 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-300 mb-6">
              By accessing or using FreeResume, you agree to be bound by these Terms of Use 
              and all applicable laws and regulations.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">2. Use License</h2>
            <p className="text-gray-300 mb-4">
              Permission is granted to temporarily use our resume templates for personal 
              and professional use. This is the grant of a license, not a transfer of title.
            </p>
            <p className="text-gray-300 mb-6">
              Under this license you may not:
            </p>
            <ul className="text-gray-300 mb-6 list-disc pl-6">
              <li>Modify or copy the materials for commercial purposes</li>
              <li>Use the materials for any commercial purpose without permission</li>
              <li>Attempt to reverse engineer any software contained on FreeResume</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">3. Disclaimer</h2>
            <p className="text-gray-300 mb-6">
                The materials on FreeResume are provided on an &apos;as is&apos; basis. We make no warranties, 
                expressed or implied, and hereby disclaim and negate all other warranties including, 
                without limitation, implied warranties or conditions of merchantability, fitness for 
                a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
                            
            <h2 className="text-2xl font-bold mt-8 mb-4">4. Limitations</h2>
            <p className="text-gray-300 mb-6">
              In no event shall FreeResume or its suppliers be liable for any damages 
              (including, without limitation, damages for loss of data or profit, or due to business interruption) 
              arising out of the use or inability to use the materials on FreeResume.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">5. Governing Law</h2>
            <p className="text-gray-300 mb-6">
              These terms and conditions are governed by and construed in accordance with the laws 
              of India and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}