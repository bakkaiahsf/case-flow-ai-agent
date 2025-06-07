
import React, { useState } from 'react';
import AuthPage from '@/components/auth/AuthPage';
import Dashboard from '@/components/dashboard/Dashboard';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedCaseType, setSelectedCaseType] = useState('');

  const handleAuth = (caseType: string) => {
    setSelectedCaseType(caseType);
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <AuthPage onAuth={handleAuth} />;
  }

  return <Dashboard caseType={selectedCaseType} />;
};

export default Index;
