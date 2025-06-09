
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle, Upload, FileText, Search, Calculator, Scale, TrendingUp, Clock, AlertTriangle } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  aiAutomated: boolean;
  estimatedTime: string;
  dependencies?: string[];
}

interface Phase {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
  aiOpportunity: string;
}

interface CaseWorkflowProps {
  caseType: 'probate' | 'divorce';
}

const CaseWorkflow = ({ caseType }: CaseWorkflowProps) => {
  const [selectedPhase, setSelectedPhase] = useState(0);
  const [tasks, setTasks] = useState(() => {
    if (caseType === 'probate') {
      return probatePhases;
    } else {
      return divorcePhases;
    }
  });

  const toggleTask = (phaseIndex: number, taskId: string) => {
    setTasks(prev => prev.map((phase, pIndex) => {
      if (pIndex === phaseIndex) {
        return {
          ...phase,
          tasks: phase.tasks.map(task => 
            task.id === taskId ? { ...task, completed: !task.completed } : task
          )
        };
      }
      return phase;
    }));
  };

  const getPhaseProgress = (phase: Phase) => {
    const completedTasks = phase.tasks.filter(task => task.completed).length;
    return (completedTasks / phase.tasks.length) * 100;
  };

  const getTotalProgress = () => {
    const totalTasks = tasks.reduce((acc, phase) => acc + phase.tasks.length, 0);
    const completedTasks = tasks.reduce((acc, phase) => 
      acc + phase.tasks.filter(task => task.completed).length, 0
    );
    return (completedTasks / totalTasks) * 100;
  };

  const getXPPoints = () => {
    return tasks.reduce((acc, phase) => 
      acc + phase.tasks.filter(task => task.completed).length * 50, 0
    );
  };

  return (
    <div className="space-y-6">
      {/* Header with Overall Progress */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {caseType === 'probate' ? 'Probate Real Estate Process' : 'Divorce Real Estate Process'}
            </h2>
            <p className="text-gray-600 mt-1">
              {caseType === 'probate' 
                ? 'AI-powered estate administration with 41% faster grant processing'
                : 'Intelligent property division with 58% fewer mediation sessions'
              }
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <span className="text-2xl font-bold text-purple-600">{getXPPoints()} XP</span>
            </div>
            <Badge variant="outline" className="bg-purple-50 text-purple-700">
              Level {Math.floor(getXPPoints() / 500) + 1}
            </Badge>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Overall Progress</span>
            <span className="font-medium">{Math.round(getTotalProgress())}% Complete</span>
          </div>
          <Progress value={getTotalProgress()} className="h-3" />
        </div>
      </div>

      {/* Phase Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tasks.map((phase, index) => (
          <button
            key={phase.id}
            onClick={() => setSelectedPhase(index)}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              selectedPhase === index
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">{phase.title}</h3>
              <div className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                {phase.tasks.filter(t => t.completed).length}/{phase.tasks.length}
              </div>
            </div>
            <p className="text-xs text-gray-600 mb-3">{phase.description}</p>
            <Progress value={getPhaseProgress(phase)} className="h-2" />
          </button>
        ))}
      </div>

      {/* Selected Phase Details */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {tasks[selectedPhase].title}
            </h3>
            <p className="text-gray-600 mb-3">{tasks[selectedPhase].description}</p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <TrendingUp className="w-4 h-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800">AI Automation Opportunity</p>
                  <p className="text-xs text-blue-700">{tasks[selectedPhase].aiOpportunity}</p>
                </div>
              </div>
            </div>
          </div>
          <Badge variant={getPhaseProgress(tasks[selectedPhase]) === 100 ? "default" : "secondary"}>
            {Math.round(getPhaseProgress(tasks[selectedPhase]))}% Complete
          </Badge>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {tasks[selectedPhase].tasks.map((task, taskIndex) => (
            <div
              key={task.id}
              className={`border rounded-lg p-4 transition-all ${
                task.completed 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-gray-50 border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => toggleTask(selectedPhase, task.id)}
                  className="mt-1"
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`font-medium ${
                      task.completed ? 'text-green-800 line-through' : 'text-gray-900'
                    }`}>
                      {task.title}
                    </h4>
                    {task.aiAutomated && (
                      <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700">
                        AI Automated
                      </Badge>
                    )}
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      {task.estimatedTime}
                    </div>
                  </div>
                  <p className={`text-sm ${
                    task.completed ? 'text-green-700' : 'text-gray-600'
                  }`}>
                    {task.description}
                  </p>
                  {task.dependencies && task.dependencies.length > 0 && (
                    <div className="mt-2 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-amber-500" />
                      <span className="text-xs text-amber-700">
                        Dependencies: {task.dependencies.join(', ')}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  {!task.completed && (
                    <>
                      <Button size="sm" variant="outline">
                        <Upload className="w-3 h-3 mr-1" />
                        Upload
                      </Button>
                      {task.aiAutomated && (
                        <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          AI Process
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Probate Process Phases
const probatePhases: Phase[] = [
  {
    id: 'estate-identification',
    title: 'Estate Identification',
    description: 'Confirm property ownership and identify all estate assets',
    aiOpportunity: 'OCR extraction from title deeds/grants, Automatic Land Registry API checks',
    tasks: [
      {
        id: 'death-cert-upload',
        title: 'Upload Death Certificate',
        description: 'Provide certified copy of death certificate for verification',
        completed: false,
        aiAutomated: true,
        estimatedTime: '5 min'
      },
      {
        id: 'will-upload',
        title: 'Upload Original Will',
        description: 'Scan and upload the last will and testament',
        completed: false,
        aiAutomated: true,
        estimatedTime: '10 min'
      },
      {
        id: 'land-registry-check',
        title: 'Land Registry Verification',
        description: 'Confirm property ownership via Land Registry API',
        completed: false,
        aiAutomated: true,
        estimatedTime: '2 min'
      },
      {
        id: 'asset-identification',
        title: 'Complete Asset Discovery',
        description: 'Identify all assets in estate including bank accounts, investments',
        completed: false,
        aiAutomated: false,
        estimatedTime: '2 hours'
      }
    ]
  },
  {
    id: 'grant-probate',
    title: 'Grant of Probate',
    description: 'Validate executor authority and file inheritance tax return',
    aiOpportunity: 'Document validation workflows, Tax calculation templates',
    tasks: [
      {
        id: 'executor-validation',
        title: 'Validate Executor Authority',
        description: 'Confirm executor is named in will and has authority',
        completed: false,
        aiAutomated: true,
        estimatedTime: '15 min'
      },
      {
        id: 'iht400-draft',
        title: 'Draft IHT400 Form',
        description: 'AI-generated inheritance tax return with property valuations',
        completed: false,
        aiAutomated: true,
        estimatedTime: '30 min',
        dependencies: ['asset-identification']
      },
      {
        id: 'pa1p-submission',
        title: 'Submit PA1P Application',
        description: 'File application for Grant of Probate with HMRC',
        completed: false,
        aiAutomated: true,
        estimatedTime: '20 min',
        dependencies: ['iht400-draft']
      },
      {
        id: 'iht-payment',
        title: 'Process IHT Payment',
        description: 'Schedule inheritance tax payment via Direct Payment Scheme',
        completed: false,
        aiAutomated: true,
        estimatedTime: '10 min'
      }
    ]
  },
  {
    id: 'valuation',
    title: 'Property Valuation',
    description: 'Obtain market appraisals and submit HMRC-compliant valuation',
    aiOpportunity: 'Comparable sales analysis, Automated surveyor brief generation',
    tasks: [
      {
        id: 'market-analysis',
        title: 'AI Market Analysis',
        description: 'Generate comparable sales report using Land Registry data',
        completed: false,
        aiAutomated: true,
        estimatedTime: '5 min'
      },
      {
        id: 'surveyor-brief',
        title: 'Generate Surveyor Brief',
        description: 'AI-generated instructions for professional surveyor',
        completed: false,
        aiAutomated: true,
        estimatedTime: '10 min'
      },
      {
        id: 'obtain-valuations',
        title: 'Obtain 3 Professional Valuations',
        description: 'Commission independent valuations from RICS surveyors',
        completed: false,
        aiAutomated: false,
        estimatedTime: '1 week'
      },
      {
        id: 'hmrc-valuation',
        title: 'Submit HMRC Valuation',
        description: 'File compliant property valuation with tax authority',
        completed: false,
        aiAutomated: true,
        estimatedTime: '15 min',
        dependencies: ['obtain-valuations']
      }
    ]
  },
  {
    id: 'sale-management',
    title: 'Sale Management',
    description: 'Market property with probate disclaimer and manage delays',
    aiOpportunity: 'Delay prediction algorithms, Automated buyer updates',
    tasks: [
      {
        id: 'property-listing',
        title: 'List Property for Sale',
        description: 'Create listings on Rightmove/Zoopla with probate disclaimer',
        completed: false,
        aiAutomated: true,
        estimatedTime: '30 min'
      },
      {
        id: 'buyer-inquiries',
        title: 'Manage Buyer Inquiries',
        description: 'AI-powered responses to initial buyer questions',
        completed: false,
        aiAutomated: true,
        estimatedTime: 'Ongoing'
      },
      {
        id: 'viewing-schedule',
        title: 'Schedule Property Viewings',
        description: 'Coordinate viewings with estate agent and buyers',
        completed: false,
        aiAutomated: true,
        estimatedTime: '2 weeks'
      },
      {
        id: 'offer-negotiation',
        title: 'Negotiate and Accept Offers',
        description: 'Review offers and negotiate terms with buyers',
        completed: false,
        aiAutomated: false,
        estimatedTime: '1 week'
      }
    ]
  }
];

// Divorce Process Phases
const divorcePhases: Phase[] = [
  {
    id: 'initial-disclosure',
    title: 'Initial Disclosure',
    description: 'Identify matrimonial home rights and property interests',
    aiOpportunity: 'Rights verification checklists, Asset discovery from bank statements',
    tasks: [
      {
        id: 'matrimonial-rights',
        title: 'Verify Matrimonial Home Rights',
        description: 'Check Land Registry for spousal rights and restrictions',
        completed: false,
        aiAutomated: true,
        estimatedTime: '10 min'
      },
      {
        id: 'property-interests',
        title: 'Disclose All Property Interests',
        description: 'Complete Form E with all real estate holdings',
        completed: false,
        aiAutomated: true,
        estimatedTime: '45 min'
      },
      {
        id: 'mortgage-analysis',
        title: 'Analyze Mortgage Statements',
        description: 'AI extraction of outstanding balances and payment history',
        completed: false,
        aiAutomated: true,
        estimatedTime: '15 min'
      },
      {
        id: 'income-verification',
        title: 'Verify Income Documentation',
        description: 'Process P60s, payslips, and self-employment records',
        completed: false,
        aiAutomated: true,
        estimatedTime: '30 min'
      }
    ]
  },
  {
    id: 'valuation',
    title: 'Property Valuation',
    description: 'Obtain Form E valuations considering development potential',
    aiOpportunity: 'Automated market trend reports, Development yield calculators',
    tasks: [
      {
        id: 'market-trends',
        title: 'Generate Market Trend Report',
        description: 'AI analysis of local property market conditions',
        completed: false,
        aiAutomated: true,
        estimatedTime: '5 min'
      },
      {
        id: 'development-potential',
        title: 'Assess Development Potential',
        description: 'Calculate potential yields from property improvements',
        completed: false,
        aiAutomated: true,
        estimatedTime: '20 min'
      },
      {
        id: 'professional-valuation',
        title: 'Commission Professional Valuation',
        description: 'Obtain RICS valuation for court proceedings',
        completed: false,
        aiAutomated: false,
        estimatedTime: '1 week'
      },
      {
        id: 'equity-calculation',
        title: 'Calculate Available Equity',
        description: 'Determine net equity after mortgage and costs',
        completed: false,
        aiAutomated: true,
        estimatedTime: '10 min'
      }
    ]
  },
  {
    id: 'settlement',
    title: 'Settlement Negotiation',
    description: 'Draft consent orders and handle clean break provisions',
    aiOpportunity: 'Document comparison tools, Precedent clause libraries',
    tasks: [
      {
        id: 'buyout-calculator',
        title: 'Generate Buyout Calculation',
        description: 'AI-powered calculation for property buyout scenarios',
        completed: false,
        aiAutomated: true,
        estimatedTime: '5 min'
      },
      {
        id: 'consent-order-draft',
        title: 'Draft Consent Order',
        description: 'Generate draft consent order with clean break provisions',
        completed: false,
        aiAutomated: true,
        estimatedTime: '30 min'
      },
      {
        id: 'mediation-support',
        title: 'AI-Assisted Mediation',
        description: 'Use sentiment analysis and settlement options',
        completed: false,
        aiAutomated: true,
        estimatedTime: '2 hours'
      },
      {
        id: 'final-agreement',
        title: 'Finalize Settlement Agreement',
        description: 'Complete final consent order for court approval',
        completed: false,
        aiAutomated: false,
        estimatedTime: '1 hour'
      }
    ]
  },
  {
    id: 'implementation',
    title: 'Implementation',
    description: 'Manage transfer/sale timelines and handle tax implications',
    aiOpportunity: 'Deadline tracking systems, Tax liability estimators',
    tasks: [
      {
        id: 'transfer-documents',
        title: 'Prepare Transfer Documents',
        description: 'Complete TR1 forms for property transfer',
        completed: false,
        aiAutomated: true,
        estimatedTime: '20 min'
      },
      {
        id: 'cgt-calculation',
        title: 'Calculate CGT Liability',
        description: 'Determine capital gains tax implications',
        completed: false,
        aiAutomated: true,
        estimatedTime: '15 min'
      },
      {
        id: 'land-registry-filing',
        title: 'File with Land Registry',
        description: 'Submit transfer documents to HM Land Registry',
        completed: false,
        aiAutomated: true,
        estimatedTime: '10 min'
      },
      {
        id: 'completion',
        title: 'Complete Transaction',
        description: 'Finalize property transfer and fund distribution',
        completed: false,
        aiAutomated: false,
        estimatedTime: '1 day'
      }
    ]
  }
];

export default CaseWorkflow;
