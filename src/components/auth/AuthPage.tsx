
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LogIn, UserPlus, Scale, Shield, Zap, Award } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface AuthPageProps {
  onAuth: (caseType: string) => void;
}

const AuthPage = ({ onAuth }: AuthPageProps) => {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showCaseSelection, setShowCaseSelection] = useState(false);
  const [selectedCaseType, setSelectedCaseType] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    firmName: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        return;
      }
      
      const { error } = await signUpWithEmail(
        formData.email,
        formData.password,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          firmName: formData.firmName,
        }
      );
      
      if (!error) {
        setShowCaseSelection(true);
      }
    } else {
      const { error } = await signInWithEmail(formData.email, formData.password);
      
      if (!error) {
        setShowCaseSelection(true);
      }
    }
  };

  const handleCaseTypeSelect = (caseType: string) => {
    setSelectedCaseType(caseType);
    onAuth(caseType);
  };

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
  };

  return (
    <div className="min-h-screen legal-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex rounded-2xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-lg border border-white/20">
        {/* Left Panel - Company Introduction */}
        <div className="flex-1 p-12 text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">BRITS AI</h1>
              <p className="text-white/80">Legal Intelligence Platform</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Revolutionizing Legal Practice</h2>
              <p className="text-white/90 leading-relaxed">
                BRITS AI transforms how solicitors handle probate and divorce cases involving real estate. 
                Our intelligent platform automates complex workflows, reduces administrative burden, 
                and accelerates case resolution by up to 60%.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold">AI-Powered Automation</h3>
                  <p className="text-white/80 text-sm">Smart OCR extracts key data from legal documents with 98% accuracy</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold">Compliance Assurance</h3>
                  <p className="text-white/80 text-sm">Automated checks ensure 100% compliance with HMRC and Land Registry requirements</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold">Gamified Progress</h3>
                  <p className="text-white/80 text-sm">Track case milestones with XP points, achievements, and visual progress indicators</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <h3 className="font-semibold mb-2">Transform Your Practice</h3>
              <ul className="space-y-2 text-sm text-white/90">
                <li>• Reduce case backlogs by 40%</li>
                <li>• Accelerate Grant of Probate by 41%</li>
                <li>• Minimize property disputes to &lt;1%</li>
                <li>• Cut mediation sessions by 58%</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Panel - Authentication */}
        <div className="w-96 bg-white p-8">
          {!showCaseSelection ? (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {isSignUp ? 'Join BRITS AI' : 'Welcome Back'}
                </h2>
                <p className="text-gray-600">
                  {isSignUp 
                    ? 'Start your journey with intelligent legal automation' 
                    : 'Sign in to your legal intelligence dashboard'
                  }
                </p>
              </div>

              {/* Google Sign In Button */}
              <Button 
                onClick={handleGoogleSignIn}
                variant="outline" 
                className="w-full mb-4 bg-white hover:bg-gray-50 text-gray-900 border-gray-300"
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>

              <div className="relative mb-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with email</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignUp && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="firmName">Law Firm</Label>
                      <Input
                        id="firmName"
                        type="text"
                        value={formData.firmName}
                        onChange={(e) => setFormData({ ...formData, firmName: e.target.value })}
                        placeholder="Your law firm name"
                        required
                      />
                    </div>
                  </>
                )}

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@lawfirm.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>

                {isSignUp && (
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      required
                    />
                  </div>
                )}

                <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  {isSignUp ? (
                    <>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Create Account
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign In
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  {isSignUp 
                    ? 'Already have an account? Sign in' 
                    : "Don't have an account? Sign up"
                  }
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Case Type</h2>
                <p className="text-gray-600">Select the type of case you'll be working on to customize your experience</p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => handleCaseTypeSelect('probate')}
                  className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
                >
                  <h3 className="font-semibold text-gray-900">Probate Cases</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Estate administration, Grant of Probate, property inheritance, IHT calculations
                  </p>
                </button>

                <button
                  onClick={() => handleCaseTypeSelect('divorce')}
                  className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
                >
                  <h3 className="font-semibold text-gray-900">Divorce Cases</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Property division, financial settlements, consent orders, mediation support
                  </p>
                </button>

                <button
                  onClick={() => handleCaseTypeSelect('mixed')}
                  className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
                >
                  <h3 className="font-semibold text-gray-900">Mixed Practice</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Handle both probate and divorce cases with flexible workspace switching
                  </p>
                </button>
              </div>

              <button
                onClick={() => setShowCaseSelection(false)}
                className="w-full mt-6 text-gray-600 hover:text-gray-800"
              >
                ← Back to sign in
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
