
// app/privacy/page.js
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | FreeResume',
  description: 'Learn about our privacy practices and how we protect your data.',
};

export default function PrivacyPolicy() {
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
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
          
          <div className="prose prose-invert prose-amber max-w-none">
            <p className="text-gray-300 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">1. Information We Collect</h2>
            <p className="text-gray-300 mb-4">
              We collect information you provide directly to us, such as when you create an account, 
              use our services, or contact us for support. This may include:
            </p>
            <ul className="text-gray-300 mb-6 list-disc pl-6">
              <li>Name and contact information</li>
              <li>Account credentials</li>
              <li>Resume content and preferences</li>
              <li>Communication preferences</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-300 mb-4">
              We use the information we collect to:
            </p>
            <ul className="text-gray-300 mb-6 list-disc pl-6">
              <li>Provide, maintain, and improve our services</li>
              <li>Develop new products and features</li>
              <li>Personalize your experience</li>
              <li>Communicate with you about products, services, and events</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">3. Information Sharing</h2>
            <p className="text-gray-300 mb-6">
              We do not sell your personal information to third parties. We may share your information with:
            </p>
            <ul className="text-gray-300 mb-6 list-disc pl-6">
              <li>Service providers who assist in our operations</li>
              <li>Legal authorities when required by law</li>
              <li>Third parties in connection with a merger or acquisition</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">4. Your Rights</h2>
            <p className="text-gray-300 mb-6">
              You have the right to access, correct, or delete your personal information. 
              You can also object to or restrict certain processing of your data.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">5. Contact Us</h2>
            <p className="text-gray-300 mb-6">
              If you have any questions about this Privacy Policy, please contact us at 
              <a href="mailto:privacy@freeresume.com" className="text-amber-400 hover:underline ml-1">
                privacy@freeresume.com
              </a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}