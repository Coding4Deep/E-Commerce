import React from 'react';
import AuthForm from '../components/AuthForm';

const AuthPage = () => {
  return (
    <div className="relative min-h-main">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-20 dark:opacity-30"></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      {/* Content */}
      <div className="relative z-10">
        <AuthForm />
      </div>
    </div>
  );
};

export default AuthPage;