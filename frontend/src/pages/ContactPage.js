import React, { useEffect } from 'react';

const ContactPage = () => {
  // Get portfolio URL from environment variable
  const portfolioUrl = process.env.REACT_APP_PORTFOLIO_URL || 'https://example.com';
  
  useEffect(() => {
    // Redirect to portfolio website
    window.location.href = portfolioUrl;
  }, [portfolioUrl]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Contact</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">Redirecting to portfolio website...</p>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          If you are not redirected automatically, please{' '}
          <a 
            href={portfolioUrl} 
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            click here
          </a>
        </p>
      </div>
    </div>
  );
};

export default ContactPage;