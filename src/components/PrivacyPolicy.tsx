import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function PrivacyPolicy() {
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
            Privacy Policy
          </h1>

          <p className="text-gray-600 mb-8">
            <strong>Last Updated:</strong> April 8, 2026
          </p>

          <p className="text-gray-700 mb-8">
            At <strong>Doodo Designs</strong>, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and protect your information when you visit our website or use our services.
          </p>

          <p className="text-gray-700 mb-8">
            By accessing or using our website, you agree to the practices described in this Privacy Policy.
          </p>

          <hr className="my-12 border-gray-200" />

          <h2 className="text-2xl font-bold text-black mb-6">1. Information We Collect</h2>
          <p className="text-gray-700 mb-4">
            We may collect the following types of information when you interact with our website or services.
          </p>

          <h3 className="text-xl font-semibold text-black mb-4">Personal Information</h3>
          <p className="text-gray-700 mb-4">
            Personal information is data that can identify you. This may include:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-8">
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Project or business details you provide when contacting us</li>
          </ul>

          <h3 className="text-xl font-semibold text-black mb-4">Non-Personal Information</h3>
          <p className="text-gray-700 mb-4">
            We may automatically collect technical information such as:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-8">
            <li>IP address</li>
            <li>Browser type</li>
            <li>Device type</li>
            <li>Pages visited on our website</li>
            <li>Website usage data</li>
          </ul>
          <p className="text-gray-700 mb-8">
            This information helps us improve our services and website performance.
          </p>

          <h2 className="text-2xl font-bold text-black mb-6">2. How We Use Your Information</h2>
          <p className="text-gray-700 mb-4">
            We use the information we collect for the following purposes:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-8">
            <li><strong>Service Delivery</strong> — To provide video production, editing, and other digital media services.</li>
            <li><strong>Communication</strong> — To respond to your inquiries and provide updates about your projects.</li>
            <li><strong>Marketing</strong> — With your permission, we may send updates, offers, or information about our services.</li>
            <li><strong>Analytics</strong> — To analyze website usage and improve our website experience.</li>
          </ul>

          <h2 className="text-2xl font-bold text-black mb-6">3. Sharing of Information</h2>
          <p className="text-gray-700 mb-4">
            We do <strong>not sell or rent your personal information</strong>.
          </p>
          <p className="text-gray-700 mb-8">
            However, we may share information with:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-8">
            <li>Team members involved in delivering your project</li>
            <li>Trusted service providers who assist in operating our business</li>
            <li>Legal authorities when required by law</li>
          </ul>

          <h2 className="text-2xl font-bold text-black mb-6">4. Cookies</h2>
          <p className="text-gray-700 mb-8">
            Our website may use cookies and similar technologies to improve user experience and analyze website traffic.
          </p>
          <p className="text-gray-700 mb-8">
            You can choose to disable cookies through your browser settings.
          </p>

          <h2 className="text-2xl font-bold text-black mb-6">5. Data Security</h2>
          <p className="text-gray-700 mb-8">
            We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.
          </p>
          <p className="text-gray-700 mb-8">
            However, no online platform can guarantee complete security.
          </p>

          <h2 className="text-2xl font-bold text-black mb-6">6. Third-Party Links</h2>
          <p className="text-gray-700 mb-8">
            Our website may contain links to external websites. We are not responsible for the privacy policies or practices of third-party websites.
          </p>

          <h2 className="text-2xl font-bold text-black mb-6">7. Your Rights</h2>
          <p className="text-gray-700 mb-8">
            You may have the right to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-8">
            <li>Request access to your personal data</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your personal information</li>
            <li>Opt out of marketing communications</li>
          </ul>
          <p className="text-gray-700 mb-8">
            You may contact us to exercise these rights.
          </p>

          <h2 className="text-2xl font-bold text-black mb-6">8. Children's Privacy</h2>
          <p className="text-gray-700 mb-8">
            Our services are not intended for individuals under the age of <strong>13</strong>, and we do not knowingly collect personal information from children.
          </p>

          <h2 className="text-2xl font-bold text-black mb-6">9. Updates to This Privacy Policy</h2>
          <p className="text-gray-700 mb-8">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated <strong>Last Updated</strong> date.
          </p>

          <h2 className="text-2xl font-bold text-black mb-6">10. Contact Information</h2>
          <p className="text-gray-700 mb-4">
            If you have any questions regarding this Privacy Policy, please contact us:
          </p>
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <p className="font-semibold text-black mb-2">Doodo Designs</p>
            <p className="text-gray-700 mb-1">Email: <a href="mailto:doodo.designs01@gmail.com" className="text-blue-600 hover:underline">doodo.designs01@gmail.com</a></p>
            <p className="text-gray-700 mb-1">Phone: +91 93611 81809</p>
            <p className="text-gray-700">Location: Tamil Nadu, India</p>
          </div>

          <p className="text-gray-600 text-sm">
            <strong>Effective Date:</strong> April 8, 2026
          </p>
        </div>
      </div>
    </div>
  );
}
