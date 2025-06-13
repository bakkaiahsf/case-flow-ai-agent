
import React, { useState } from 'react';
import Dashboard from '@/components/dashboard/Dashboard';

const Index = () => {
  const [selectedCaseType, setSelectedCaseType] = useState('mixed');

  return <Dashboard caseType={selectedCaseType} />;
};

export default Index;
