import React from 'react';

const TermsOfServicePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Terms of Service</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="mb-4">Last updated: May 29, 2025</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">By accessing or using our service, you agree to be bound by these Terms of Service.</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">2. User Accounts</h2>
          <p className="mb-4">You are responsible for maintaining the confidentiality of your account and password.</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">3. Products and Pricing</h2>
          <p className="mb-4">We reserve the right to modify prices and availability of products at any time.</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">4. Orders and Payments</h2>
          <p className="mb-4">All orders are subject to acceptance and availability. Payment must be received prior to shipment.</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">5. Shipping and Delivery</h2>
          <p className="mb-4">Delivery times are estimates and not guaranteed. Risk of loss passes to you upon delivery.</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">6. Returns and Refunds</h2>
          <p className="mb-4">Products may be returned within 30 days of delivery for a full refund.</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">7. Limitation of Liability</h2>
          <p className="mb-4">We shall not be liable for any indirect, incidental, special, consequential or punitive damages.</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">8. Changes to Terms</h2>
          <p className="mb-4">We reserve the right to modify these terms at any time. Your continued use of the service constitutes acceptance of the modified terms.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;