
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText, 
  Users, 
  Home, 
  Trophy, 
  Clock, 
  CheckCircle, 
  Upload, 
  MapPin, 
  PoundSterling,
  Star,
  Zap,
  Target,
  Award,
  TrendingUp,
  Calendar,
  AlertCircle,
  Briefcase,
  Scale,
  Heart,
  Building,
  CreditCard,
  Shield,
  BookOpen,
  Plus
} from 'lucide-react';

const Index = () => {
  const [activeCase, setActiveCase] = useState('smith-probate');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [newCaseModal, setNewCaseModal] = useState(false);

  // Mock data for demonstration
  const cases = [
    {
      id: 'smith-probate',
      title: 'Smith Estate Probate',
      type: 'Probate',
      progress: 75,
      stage: 'Property Valuation',
      urgency: 'Medium',
      points: 850,
      level: 3,
      documents: 12,
      nextDeadline: '2024-06-15',
      property: '123 Victoria Road, Bristol BS8 4HG',
      estateValue: '£485,000'
    },
    {
      id: 'johnson-divorce',
      title: 'Johnson v Johnson Divorce',
      type: 'Divorce',
      progress: 45,
      stage: 'Asset Division',
      urgency: 'High',
      points: 620,
      level: 2,
      documents: 8,
      nextDeadline: '2024-06-12',
      property: '67 Park Avenue, Bath BA1 2LM',
      estateValue: '£320,000'
    },
    {
      id: 'williams-probate',
      title: 'Williams Family Trust',
      type: 'Probate',
      progress: 90,
      stage: 'Final Distribution',
      urgency: 'Low',
      points: 1240,
      level: 4,
      documents: 18,
      nextDeadline: '2024-06-20',
      property: '45 Royal Crescent, Bath BA1 2LR',
      estateValue: '£750,000'
    }
  ];

  const currentCase = cases.find(c => c.id === activeCase) || cases[0];

  const stages = [
    { name: 'Case Setup', completed: true, points: 100, icon: FileText },
    { name: 'Document Collection', completed: true, points: 150, icon: Upload },
    { name: 'Property Verification', completed: true, points: 200, icon: Home },
    { name: 'Valuation & Analysis', completed: false, points: 250, icon: PoundSterling },
    { name: 'Legal Processing', completed: false, points: 200, icon: Scale },
    { name: 'Final Settlement', completed: false, points: 300, icon: Trophy }
  ];

  const achievements = [
    { name: 'Speed Demon', description: 'Complete 5 cases in record time', earned: true, icon: Zap },
    { name: 'Document Master', description: 'Process 100 documents', earned: true, icon: FileText },
    { name: 'Valuation Expert', description: 'Achieve 99% accuracy in valuations', earned: false, icon: Target },
    { name: 'Client Champion', description: 'Receive 10 five-star reviews', earned: false, icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="legal-gradient w-10 h-10 rounded-lg flex items-center justify-center">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">LegalFlow Pro</h1>
                <p className="text-sm text-gray-600">Gamified Case Management</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full">
                <Trophy className="w-4 h-4" />
                <span className="font-semibold">{currentCase.points} XP</span>
              </div>
              <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full">
                <Star className="w-4 h-4" />
                <span className="font-semibold">Level {currentCase.level}</span>
              </div>
              <Button onClick={() => setNewCaseModal(true)} className="legal-gradient text-white">
                <Plus className="w-4 h-4 mr-2" />
                New Case
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar - Case Selection */}
          <div className="col-span-3">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Briefcase className="w-5 h-5" />
                  <span>Active Cases</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {cases.map((case_) => (
                  <div
                    key={case_.id}
                    onClick={() => setActiveCase(case_.id)}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                      activeCase === case_.id 
                        ? 'legal-gradient text-white shadow-lg' 
                        : 'bg-white/50 hover:bg-white/70'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-sm">{case_.title}</h3>
                      <Badge variant={case_.urgency === 'High' ? 'destructive' : case_.urgency === 'Medium' ? 'default' : 'secondary'}>
                        {case_.urgency}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        {case_.type === 'Probate' ? <Heart className="w-4 h-4" /> : <Users className="w-4 h-4" />}
                        <span className="text-xs">{case_.type}</span>
                      </div>
                      <Progress value={case_.progress} className="h-2" />
                      <div className="flex justify-between text-xs">
                        <span>{case_.progress}% Complete</span>
                        <span>{case_.points} XP</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="glass-effect mt-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5" />
                  <span>Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className={`p-3 rounded-lg ${achievement.earned ? 'bg-gradient-to-r from-yellow-100 to-orange-100' : 'bg-gray-100'}`}>
                    <div className="flex items-center space-x-3">
                      <achievement.icon className={`w-5 h-5 ${achievement.earned ? 'text-yellow-600' : 'text-gray-400'}`} />
                      <div>
                        <h4 className="font-semibold text-sm">{achievement.name}</h4>
                        <p className="text-xs text-gray-600">{achievement.description}</p>
                      </div>
                      {achievement.earned && <CheckCircle className="w-4 h-4 text-green-500" />}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="col-span-9">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="property">Property</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="completion">Completion</TabsTrigger>
              </TabsList>

              {/* Dashboard Tab */}
              <TabsContent value="dashboard" className="space-y-6">
                {/* Case Overview */}
                <Card className="legal-gradient text-white">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl">{currentCase.title}</CardTitle>
                        <p className="text-blue-100">Current Stage: {currentCase.stage}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold">{currentCase.progress}%</div>
                        <p className="text-blue-100">Complete</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-6">
                      <div className="text-center">
                        <Building className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm text-blue-100">Property</p>
                        <p className="font-semibold">{currentCase.property}</p>
                      </div>
                      <div className="text-center">
                        <PoundSterling className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm text-blue-100">Estate Value</p>
                        <p className="font-semibold">{currentCase.estateValue}</p>
                      </div>
                      <div className="text-center">
                        <Calendar className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm text-blue-100">Next Deadline</p>
                        <p className="font-semibold">{currentCase.nextDeadline}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Progress Stages */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5" />
                      <span>Case Progress & Gamification</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {stages.map((stage, index) => (
                        <div key={index} className={`flex items-center space-x-4 p-4 rounded-lg ${stage.completed ? 'bg-green-50' : 'bg-gray-50'}`}>
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${stage.completed ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                            {stage.completed ? <CheckCircle className="w-5 h-5" /> : <stage.icon className="w-5 h-5" />}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{stage.name}</h3>
                            <p className="text-sm text-gray-600">
                              {stage.completed ? 'Completed' : 'In Progress'}
                            </p>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-sm font-semibold ${stage.completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            +{stage.points} XP
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Documents Tab */}
              <TabsContent value="documents" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Upload className="w-5 h-5" />
                      <span>Document Management & AI Extraction</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-lg font-semibold mb-2">Upload Case Documents</h3>
                      <p className="text-gray-600 mb-4">Drag and drop or click to upload wills, death certificates, and property documents</p>
                      <Button className="legal-gradient text-white">
                        <Upload className="w-4 h-4 mr-2" />
                        Choose Files
                      </Button>
                    </div>

                    <div className="mt-6 space-y-3">
                      <h4 className="font-semibold">Uploaded Documents ({currentCase.documents})</h4>
                      {[
                        { name: 'Last Will & Testament.pdf', status: 'Processed', confidence: 98 },
                        { name: 'Death Certificate.pdf', status: 'Processed', confidence: 100 },
                        { name: 'Property Deeds.pdf', status: 'Processing', confidence: null },
                        { name: 'Bank Statements.pdf', status: 'Processed', confidence: 95 }
                      ].map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                          <div className="flex items-center space-x-3">
                            <FileText className="w-5 h-5 text-blue-500" />
                            <span className="font-medium">{doc.name}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            {doc.confidence && (
                              <Badge variant="secondary">{doc.confidence}% Confidence</Badge>
                            )}
                            <Badge variant={doc.status === 'Processed' ? 'default' : 'secondary'}>
                              {doc.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Property Tab */}
              <TabsContent value="property" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Home className="w-5 h-5" />
                      <span>Property Verification & Valuation</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="property-address">Property Address</Label>
                        <Input 
                          id="property-address" 
                          value={currentCase.property}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="title-number">Land Registry Title Number</Label>
                        <Input 
                          id="title-number" 
                          placeholder="e.g., BS123456"
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <Button className="legal-gradient text-white w-full">
                      <Shield className="w-4 h-4 mr-2" />
                      Verify Property with Land Registry
                    </Button>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <h4 className="font-semibold text-green-800">Verification Complete</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Property Type:</p>
                          <p className="font-semibold">Freehold Terraced House</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Registered Owner:</p>
                          <p className="font-semibold">John Smith (Deceased)</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Market Value Estimate:</p>
                          <p className="font-semibold text-green-600">{currentCase.estateValue}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Restrictions:</p>
                          <p className="font-semibold">None Found</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Timeline Tab */}
              <TabsContent value="timeline" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="w-5 h-5" />
                      <span>Predictive Case Timeline</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { date: '2024-06-07', task: 'Case Opened', status: 'completed', points: 100 },
                        { date: '2024-06-08', task: 'Documents Uploaded & Processed', status: 'completed', points: 150 },
                        { date: '2024-06-10', task: 'Property Verification Complete', status: 'completed', points: 200 },
                        { date: '2024-06-15', task: 'Professional Valuation Ordered', status: 'current', points: 250 },
                        { date: '2024-06-22', task: 'Grant of Probate Application', status: 'pending', points: 300 },
                        { date: '2024-07-15', task: 'Grant of Probate Received', status: 'pending', points: 400 },
                        { date: '2024-08-01', task: 'Property Marketing', status: 'pending', points: 200 },
                        { date: '2024-09-15', task: 'Property Sale Completion', status: 'pending', points: 500 }
                      ].map((item, index) => (
                        <div key={index} className={`flex items-center space-x-4 p-4 rounded-lg ${
                          item.status === 'completed' ? 'bg-green-50' : 
                          item.status === 'current' ? 'bg-blue-50' : 'bg-gray-50'
                        }`}>
                          <div className={`w-3 h-3 rounded-full ${
                            item.status === 'completed' ? 'bg-green-500' : 
                            item.status === 'current' ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'
                          }`} />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold">{item.task}</h4>
                              <span className="text-sm text-gray-600">{item.date}</span>
                            </div>
                            {item.status === 'current' && (
                              <p className="text-sm text-blue-600 mt-1">In Progress - Next Action Required</p>
                            )}
                          </div>
                          <Badge variant={item.status === 'completed' ? 'default' : 'secondary'}>
                            +{item.points} XP
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Completion Tab */}
              <TabsContent value="completion" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Trophy className="w-5 h-5" />
                      <span>Case Completion & Documentation</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <div className="relative">
                        <div className="w-32 h-32 mx-auto bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse-ring">
                          <Trophy className="w-16 h-16 text-white" />
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold mt-6 mb-2">Case Nearing Completion!</h3>
                      <p className="text-gray-600 mb-6">You're {100 - currentCase.progress}% away from closing this case</p>
                      
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-blue-800">Total XP Earned</h4>
                          <p className="text-2xl font-bold text-blue-600">{currentCase.points}</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-green-800">Tasks Completed</h4>
                          <p className="text-2xl font-bold text-green-600">{Math.floor(stages.length * currentCase.progress / 100)}/{stages.length}</p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-purple-800">Time Saved</h4>
                          <p className="text-2xl font-bold text-purple-600">12 Hours</p>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
                        <h4 className="font-semibold mb-4">Final Steps Checklist</h4>
                        <div className="space-y-2 text-left max-w-md mx-auto">
                          {[
                            'Professional valuation received',
                            'Grant of Probate obtained',
                            'Property marketed and sold',
                            'Final accounts prepared',
                            'Distribution to beneficiaries'
                          ].map((step, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <CheckCircle className={`w-4 h-4 ${index < 3 ? 'text-green-500' : 'text-gray-400'}`} />
                              <span className={index < 3 ? 'text-green-700' : 'text-gray-600'}>{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button className="legal-gradient text-white mt-6 px-8 py-3 text-lg">
                        <BookOpen className="w-5 h-5 mr-2" />
                        Generate Final Case Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
