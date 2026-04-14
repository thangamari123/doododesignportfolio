import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft } from 'lucide-react';


gsap.registerPlugin(ScrollTrigger);

export default function TermsConditions() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    });
    return () => ctx.revert();
  }, []);

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-white py-24 px-6" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-4xl mx-auto">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Home
        </button>

        <div ref={containerRef} className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-black text-black mb-8" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Terms & Conditions
          </h1>

          <p className="text-gray-600 mb-8">
            <strong>Last Updated:</strong> April 8, 2026
          </p>

          <p className="text-gray-700 mb-8">
            Welcome to <strong>Doodo Designs</strong>. These Terms and Conditions outline the rules and regulations for the use of our website and services.
          </p>

          <p className="text-gray-700 mb-8">
            By accessing this website or purchasing our services, you agree to comply with these Terms and Conditions. If you do not agree with any part of these terms, please do not use this website or our services.
          </p>

          <hr className="my-12 border-gray-200" />

          <h2 className="text-2xl font-bold text-black mb-6">1. Services</h2>
          <p className="text-gray-700 mb-4">
            Doodo Designs provides digital media services including but not limited to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-8">
            <li>Video Production</li>
            <li>Video Editing</li>
            <li>Promotional Videos</li>
            <li>Social Media Content Creation</li>
            <li>Graphic Design and Digital Media Services</li>
          </ul>
          <p className="text-gray-700 mb-8">
            All services are provided based on project agreements between the client and the company.
          </p>

          <h2 className="text-2xl font-bold text-black mb-6">2. Payments</h2>
          <p className="text-gray-700 mb-4">
            All projects require payment before work begins unless otherwise agreed.
          </p>
          <p className="text-gray-700 mb-4">
            Payment terms may include:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-8">
            <li>Advance payment before starting the project</li>
            <li>Milestone payments for large projects</li>
            <li>Final payment before delivery of final files</li>
          </ul>
          <p className="text-gray-700 mb-8">
            Failure to complete payments may result in project delays or suspension of services.
          </p>

          <h2 className="text-2xl font-bold text-black mb-6">3. Revisions</h2>
          <p className="text-gray-700 mb-8">
            Projects may include a limited number of revisions depending on the agreed service package.
          </p>
          <p className="text-gray-700 mb-8">
            Additional revisions beyond the agreed number may require extra charges.
          </p>
          <p className="text-gray-700 mb-8">
            Major changes that alter the original project scope may be treated as a new project.
          </p>

          <h2 className="text-2xl font-bold text-black mb-6">4. Project Timeline</h2>
          <p className="text-gray-700 mb-4">
            Estimated timelines will be provided before the project begins. However, delivery times may change due to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-8">
            <li>Delayed feedback from the client</li>
            <li>Additional revision requests</li>
            <li>Changes in project requirements</li>
          </ul>
          <p className="text-gray-700 mb-8">
            Doodo Designs is not responsible for delays caused by client-side issues.
          </p>

          <h2 className="text-2xl font-bold text-black mb-6">5. Intellectual Property Rights</h2>
          <p className="text-gray-700 mb-8">
            All content created by Doodo Designs remains the property of the company until full payment is completed.
          </p>
          <p className="text-gray-700 mb-4">
            Once full payment is received:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-8">
            <li>The client receives the right to use the final delivered content.</li>
            <li>The company reserves the right to display the work in its portfolio or promotional materials.</li>
          </ul>

          <h2 className="text-2xl font-bold text-black mb-6">6. Client Responsibilities</h2>
          <p className="text-gray-700 mb-8">
            Clients must provide all necessary materials required for the project such as logos, images, text, branding assets, and other resources.
          </p>
          <p className="text-gray-700 mb-8">
            Clients must ensure they have legal rights to use the materials they provide. Doodo Designs is not responsible for copyright issues related to client-provided content.
          </p>

          <h2 className="text-2xl font-bold text-black mb-6">7. Website Use</h2>
          <p className="text-gray-700 mb-8">
            Unless otherwise stated, Doodo Designs owns the intellectual property rights for all material on this website.
          </p>
          <p className="text-gray-700 mb-4">
            Users must not:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-8">
            <li>Republish material from this website</li>
            <li>Sell, rent, or sublicense website content</li>
            <li>Reproduce, duplicate, or copy website material</li>
            <li>Redistribute website content without permission</li>
          </ul>

          <h2 className="text-2xl font-bold text-black mb-6">8. Limitation of Liability</h2>
          <p className="text-gray-700 mb-8">
            Doodo Designs will not be held liable for any indirect or consequential loss arising from the use of our website or services.
          </p>
          <p className="text-gray-700 mb-8">
            All services are provided based on the agreed project scope.
          </p>

          <h2 className="text-2xl font-bold text-black mb-6">9. Changes to Terms</h2>
          <p className="text-gray-700 mb-8">
            We reserve the right to modify or update these Terms and Conditions at any time. Updated terms will be posted on this page.
          </p>

          <h2 className="text-2xl font-bold text-black mb-6">10. Contact Information</h2>
          <p className="text-gray-700 mb-4">
            If you have any questions regarding these Terms and Conditions, please contact us:
          </p>
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <p className="font-semibold text-black mb-2">Doodo Designs</p>
            <p className="text-gray-700 mb-1">Email: <a href="mailto:doodo.designs01@gmail.com" className="text-blue-600 hover:underline">doodo.designs01@gmail.com</a></p>
            <p className="text-gray-700 mb-1">Phone: +91 93611 81809</p>
            <p className="text-gray-700">Address: Tamil Nadu, India</p>
          </div>

          <p className="text-gray-600 text-sm">
            <strong>Effective Date:</strong> April 8, 2026
          </p>
        </div>
        
      </div>
    </div>
    
  );
}