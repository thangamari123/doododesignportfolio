import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function RefundPolicy() {
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
            Refund Policy
          </h1>

          <p className="text-gray-600 mb-8">
            <strong>Last Updated:</strong> April 8, 2026
          </p>

          <p className="text-gray-700 mb-8">
            At <strong>Doodo Designs</strong>, we are committed to providing high-quality video production and digital media services. This Refund Policy outlines the conditions under which refunds may be requested and processed.
          </p>

          <p className="text-gray-700 mb-8">
            By purchasing or using our services, you agree to the terms described in this policy.
          </p>

          <hr className="my-12 border-gray-200" />

          <h2 className="text-2xl font-bold text-black mb-6">1. Service-Based Refunds</h2>
          <p className="text-gray-700 mb-8">
            Since our services involve time, planning, and creative work, refunds depend on the stage of the project.
          </p>

          <h3 className="text-xl font-semibold text-black mb-4">Before Project Work Begins</h3>
          <p className="text-gray-700 mb-8">
            If a refund is requested <strong>before the project has started</strong>, you may be eligible for a <strong>full or partial refund</strong>, depending on the agreement and any administrative costs involved.
          </p>

          <h3 className="text-xl font-semibold text-black mb-4">After Project Work Has Started</h3>
          <p className="text-gray-700 mb-8">
            If work has already begun, refunds may be <strong>partially granted</strong> depending on the amount of work completed at the time of the request.
          </p>

          <h3 className="text-xl font-semibold text-black mb-4">After Project Completion</h3>
          <p className="text-gray-700 mb-8">
            Once the project has been completed and final files have been delivered, <strong>refunds will not be issued</strong>.
          </p>

          <h2 className="text-2xl font-bold text-black mb-6">2. Non-Refundable Services</h2>
          <p className="text-gray-700 mb-8">
            The following services are <strong>non-refundable</strong>:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-8">
            <li>Completed video production or editing projects</li>
            <li>Customized or personalized video content</li>
            <li>Digital files that have already been delivered</li>
            <li>Projects canceled after significant work has been completed</li>
          </ul>

          <h2 className="text-2xl font-bold text-black mb-6">3. Revision Policy</h2>
          <p className="text-gray-700 mb-8">
            Our services include a limited number of revisions as agreed in the project scope.
          </p>
          <p className="text-gray-700 mb-8">
            If a client is not satisfied with the initial delivery, we encourage using the <strong>revision process</strong> before requesting a refund.
          </p>
          <p className="text-gray-700 mb-8">
            Additional revisions beyond the agreed limit may require extra charges.
          </p>

          <h2 className="text-2xl font-bold text-black mb-6">4. Refund Request Process</h2>
          <p className="text-gray-700 mb-8">
            To request a refund, please contact us with the following information:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-8">
            <li>Your name and contact details</li>
            <li>Project or order details</li>
            <li>Reason for the refund request</li>
          </ul>
          <p className="text-gray-700 mb-8">
            Refund requests can be submitted through the following contact details:
          </p>
          <p className="text-gray-700 mb-8">
            <strong>Email:</strong> <a href="mailto:doodo.designs01@gmail.com" className="text-blue-600 hover:underline">doodo.designs01@gmail.com</a><br />
            <strong>Phone:</strong> +91 93611 81809
          </p>
          <p className="text-gray-700 mb-8">
            Our team will review your request and respond within a reasonable timeframe.
          </p>

          <h2 className="text-2xl font-bold text-black mb-6">5. Refund Processing</h2>
          <p className="text-gray-700 mb-8">
            If a refund request is approved, the refund will be processed using the original payment method. The time required for the refund to appear in your account may vary depending on your payment provider.
          </p>

          <h2 className="text-2xl font-bold text-black mb-6">6. Policy Updates</h2>
          <p className="text-gray-700 mb-8">
            Doodo Designs reserves the right to update or modify this Refund Policy at any time. Any changes will be posted on this page with the updated date.
          </p>

          <h2 className="text-2xl font-bold text-black mb-6">Contact Information</h2>
          <p className="text-gray-700 mb-4">
            If you have any questions about this Refund Policy, please contact us:
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
