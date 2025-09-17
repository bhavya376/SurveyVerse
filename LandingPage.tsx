import React from 'react';
import { 
  Zap, 
  Target, 
  Users, 
  Trophy, 
  ArrowRight, 
  Star,
  Play,
  BarChart3,
  Sparkles
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Navigation */}
          <nav className="mb-16 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">SurveyVerse</span>
            </div>
            <button 
              onClick={() => onNavigate('dashboard')}
              className="px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300"
            >
              Dashboard
            </button>
          </nav>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30">
                  <Star className="w-4 h-4 text-primary" />
                  <span className="text-primary font-medium">Next-Gen Survey Experience</span>
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                  Gamified
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-pink-400 animate-gradient">
                    Survey Forms
                  </span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Transform boring surveys into engaging interactive experiences. 
                  Boost response rates by 300% with our gamified approach designed for modern college campuses.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => onNavigate('builder')}
                  className="group px-8 py-4 bg-primary hover:bg-primary-dark rounded-xl text-white font-semibold flex items-center space-x-2 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/25"
                >
                  <span>Create Survey</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => onNavigate('survey')}
                  className="group px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 rounded-xl text-white font-semibold flex items-center space-x-2 transition-all duration-300"
                >
                  <Play className="w-5 h-5" />
                  <span>Try Demo</span>
                </button>
              </div>

              
            </div>

            {/* Right Content - Interactive Preview */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-dark-800/50 to-dark-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-400">Campus Feedback Survey</div>
                    <div className="flex items-center space-x-2 text-primary">
                      <Trophy className="w-4 h-4" />
                      <span className="text-sm font-medium">850 XP</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white">How satisfied are you with campus facilities?</h3>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-dark-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-primary to-purple-400 h-2 rounded-full w-3/4 animate-pulse"></div>
                    </div>
                    
                    {/* Interactive Options */}
                    <div className="space-y-3">
                      {['Extremely Satisfied', 'Very Satisfied', 'Satisfied', 'Needs Improvement'].map((option, index) => (
                        <button key={option} className="w-full p-4 bg-dark-700/50 hover:bg-primary/20 border border-dark-600 hover:border-primary/50 rounded-xl text-left text-white transition-all duration-300 group">
                          <div className="flex items-center justify-between">
                            <span>{option}</span>
                            <div className="opacity-0 group-hover:opacity-100 text-primary text-sm font-medium transition-opacity">
                              +{(4-index) * 25} XP
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center animate-bounce-slow">
                  <Zap className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose SurveyVerse?</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Revolutionary features that transform how students interact with surveys on campus
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: 'Gamified Experience',
                description: 'Points, badges, and leaderboards make surveys fun and engaging for students.',
                color: 'from-primary to-purple-600'
              },
              {
                icon: Users,
                title: 'Social Integration',
                description: 'Compare responses with peers and see real-time campus sentiment.',
                color: 'from-purple-600 to-pink-600'
              },
              {
                icon: BarChart3,
                title: 'Real-time Analytics',
                description: 'Beautiful dashboards with insights that help improve campus life.',
                color: 'from-pink-600 to-red-500'
              }
            ].map((feature) => (
              <div key={feature.title} className="group relative">
                <div className="bg-gradient-to-br from-dark-800/50 to-dark-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full hover:border-primary/30 transition-all duration-300">
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="bg-gradient-to-br from-primary/20 to-purple-600/20 backdrop-blur-sm border border-primary/30 rounded-3xl p-12">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Campus Surveys?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of universities already using SurveyVerse to boost student engagement and gather meaningful insights.
            </p>
            <button 
              onClick={() => onNavigate('builder')}
              className="px-12 py-4 bg-primary hover:bg-primary-dark rounded-xl text-white text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/25"
            >
              Start Building Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;