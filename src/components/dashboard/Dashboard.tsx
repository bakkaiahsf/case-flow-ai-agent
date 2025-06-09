import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Scale, Plus, FileText, Calendar, TrendingUp, Award, LogOut, ArrowRight } from 'lucide-react';
import CaseWorkflow from '@/components/case/CaseWorkflow';

interface DashboardProps {
  caseType: string;
}

const Dashboard = ({ caseType }: DashboardProps) => {
  const [currentCaseType, setCurrentCaseType] = useState(caseType);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [selectedWorkflowType, setSelectedWorkflowType] = useState<'probate' | 'divorce'>('probate');

  const getCaseTypeTitle = (type: string) => {
    switch (type) {
      case 'probate': return 'Probate Cases';
      case 'divorce': return 'Divorce Cases';
      case 'mixed': return 'Mixed Practice';
      default: return 'Legal Cases';
    }
  };

  const getCaseTypeDescription = (type: string) => {
    switch (type) {
      case 'probate': return 'Estate administration and inheritance matters';
      case 'divorce': return 'Property division and financial settlements';
      case 'mixed': return 'Comprehensive legal case management';
      default: return 'Intelligent legal automation';
    }
  };

  const startNewCase = (workflowType: 'probate' | 'divorce') => {
    setSelectedWorkflowType(workflowType);
    setShowWorkflow(true);
  };

  if (showWorkflow) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Scale className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">BRITS AI</h1>
                  <p className="text-xs text-gray-600">Case Workflow Management</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowWorkflow(false)}
                >
                  ← Back to Dashboard
                </Button>
                <Button variant="outline" size="sm">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Case Workflow */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <CaseWorkflow caseType={selectedWorkflowType} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Scale className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">BRITS AI</h1>
                <p className="text-xs text-gray-600">{getCaseTypeDescription(currentCaseType)}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Select value={currentCaseType} onValueChange={setCurrentCaseType}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="probate">Probate Cases</SelectItem>
                  <SelectItem value="divorce">Divorce Cases</SelectItem>
                  <SelectItem value="mixed">Mixed Practice</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to {getCaseTypeTitle(currentCaseType)}
          </h2>
          <p className="text-gray-600">
            {currentCaseType === 'probate' && 'Streamline estate administration with AI-powered automation'}
            {currentCaseType === 'divorce' && 'Accelerate property settlements with intelligent case management'}
            {currentCaseType === 'mixed' && 'Manage all your legal cases with comprehensive automation tools'}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Cases</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
              <Calendar className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Efficiency</p>
                <p className="text-2xl font-bold text-gray-900">+42%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">XP Points</p>
                <p className="text-2xl font-bold text-gray-900">2,840</p>
              </div>
              <Award className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Case Type Specific Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Start New Case Workflow</h3>
          
          {(currentCaseType === 'probate' || currentCaseType === 'mixed') && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-4 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-blue-900 mb-2">Probate Real Estate Process</h4>
                  <p className="text-blue-700 text-sm mb-3">
                    AI-powered estate administration • 41% faster grant processing • 29% fewer valuation disputes
                  </p>
                  <div className="flex items-center gap-4 text-xs text-blue-600">
                    <span>• Estate Identification</span>
                    <span>• Grant of Probate</span>
                    <span>• Property Valuation</span>
                    <span>• Sale Management</span>
                  </div>
                </div>
                <Button 
                  onClick={() => startNewCase('probate')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Start Probate Case
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {(currentCaseType === 'divorce' || currentCaseType === 'mixed') && (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 mb-4 border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-purple-900 mb-2">Divorce Real Estate Process</h4>
                  <p className="text-purple-700 text-sm mb-3">
                    Intelligent property division • 58% fewer mediation sessions • 100% SDLT compliance
                  </p>
                  <div className="flex items-center gap-4 text-xs text-purple-600">
                    <span>• Initial Disclosure</span>
                    <span>• Property Valuation</span>
                    <span>• Settlement Negotiation</span>
                    <span>• Implementation</span>
                  </div>
                </div>
                <Button 
                  onClick={() => startNewCase('divorce')}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Start Divorce Case
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Additional Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Upload Documents
            </Button>
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Meeting
            </Button>
          </div>
        </div>

        {/* Recent Cases and AI Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {currentCaseType === 'probate' ? 'Recent Probate Cases' : 
               currentCaseType === 'divorce' ? 'Recent Divorce Cases' : 
               'Recent Cases'}
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Smith Estate</p>
                  <p className="text-sm text-gray-600">Grant of Probate - In Progress</p>
                </div>
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                  Active
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Johnson vs Johnson</p>
                  <p className="text-sm text-gray-600">Property Settlement - Review</p>
                </div>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  Review
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Insights</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800 font-medium">
                  🎯 Case Completion Rate: +15% this month
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Your efficiency has improved significantly with AI automation
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-800 font-medium">
                  ⚡ Average Processing Time: 2.3 weeks faster
                </p>
                <p className="text-xs text-green-600 mt-1">
                  Document automation is saving substantial time
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
