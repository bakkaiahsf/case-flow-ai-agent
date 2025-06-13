
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import AuthPage from '@/components/auth/AuthPage';
import Dashboard from '@/components/dashboard/Dashboard';

const Index = () => {
  const { user, loading } = useAuth();
  const [selectedCaseType, setSelectedCaseType] = useState('');

  const handleAuth = (caseType: string) => {
    setSelectedCaseType(caseType);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage onAuth={handleAuth} />;
  }

  return <Dashboard caseType={selectedCaseType || 'mixed'} />;
};

export default Index;
