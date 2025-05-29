import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Privacy Policy</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="mb-4">Last updated: May 29, 2025</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">1. Information We Collect</h2>
          <p className="mb-4">We collect information you provide directly to us when you create an account, place an order, or contact customer service.</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">2. How We Use Your Information</h2>
          <p className="mb-4">We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">3. Sharing of Information</h2>
          <p className="mb-4">We do not sell your personal information. We may share information with service providers who perform services on our behalf.</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">4. Security</h2>
          <p className="mb-4">We implement reasonable security measures to protect your personal information.</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">5. Your Choices</h2>
          <p className="mb-4">You can access, update, or delete your account information at any time by logging into your account.</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">6. Changes to This Policy</h2>
          <p className="mb-4">We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">7. Contact Us</h2>
          <p className="mb-4">If you have any questions about this privacy policy, please contact us.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;