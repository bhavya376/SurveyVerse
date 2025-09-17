import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Star, 
  Trophy, 
  CheckCircle, 
  Target,
  Zap,
  Award,
  Users
} from 'lucide-react';

interface SurveyTakerProps {
  survey?: any;
  onNavigate: (page: string) => void;
}

const SurveyTaker: React.FC<SurveyTakerProps> = ({ onNavigate }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [points, setPoints] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [streak, setStreak] = useState(1);

  const demoSurvey = {
    title: 'Campus Experience Survey',
    questions: [
      {
        id: '1',
        type: 'multiple-choice',
        title: 'How satisfied are you with campus facilities?',
        options: ['Extremely Satisfied', 'Very Satisfied', 'Satisfied', 'Needs Improvement'],
        points: 50
      },
      {
        id: '2',
        type: 'rating',
        title: 'Rate the quality of campus dining services',
        points: 75
      },
      {
        id: '3',
        type: 'scale',
        title: 'How likely are you to recommend our university to others? (1-10)',
        points: 100
      },
      {
        id: '4',
        type: 'multiple-choice',
        title: 'Which campus improvement would you prioritize?',
        options: ['Better WiFi', 'More Study Spaces', 'Updated Equipment', 'Recreational Facilities'],
        points: 60
      },
      {
        id: '5',
        type: 'text',
        title: 'Share one thing you love most about campus life',
        points: 40
      }
    ]
  };

  const progress = ((currentQuestion + 1) / demoSurvey.questions.length) * 100;
  const currentQ = demoSurvey.questions[currentQuestion];

  const handleAnswer = (value: any) => {
    setAnswers({ ...answers, [currentQ.id]: value });
    
    // Add points with animation
    const earnedPoints = currentQ.points * (streak / 2 + 0.5);
    setPoints(prev => prev + earnedPoints);
    setStreak(prev => prev + 1);
  };

  const nextQuestion = () => {
    if (currentQuestion < demoSurvey.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const renderQuestion = () => {
    const question = currentQ;
    const answer = answers[question.id];

    switch (question.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-4">
            {question.options.map((option: string, index: number) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className={`w-full p-4 rounded-xl text-left transition-all duration-300 border-2 group ${
                  answer === option
                    ? 'bg-primary/20 border-primary text-white shadow-lg shadow-primary/20'
                    : 'bg-dark-700/50 border-dark-600 hover:border-primary/50 text-gray-300 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{option}</span>
                  <div className="flex items-center space-x-2">
                    {answer === option && <CheckCircle className="w-5 h-5 text-primary" />}
                    <div className="text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      +{question.points} XP
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        );

      case 'rating':
        return (
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => handleAnswer(rating)}
                className={`p-3 transition-all duration-300 ${
                  answer >= rating ? 'text-yellow-400 scale-125' : 'text-gray-500 hover:text-yellow-300'
                }`}
              >
                <Star className="w-8 h-8 fill-current" />
              </button>
            ))}
          </div>
        );

      case 'scale':
        return (
          <div className="space-y-6">
            <input
              type="range"
              min="1"
              max="10"
              value={answer || 5}
              onChange={(e) => handleAnswer(parseInt(e.target.value))}
              className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{answer || 5}</div>
              <div className="text-gray-400">Slide to rate</div>
            </div>
          </div>
        );

      case 'text':
        return (
          <textarea
            value={answer || ''}
            onChange={(e) => handleAnswer(e.target.value)}
            placeholder="Share your thoughts..."
            className="w-full h-32 bg-dark-700/50 border border-dark-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 resize-none focus:border-primary/50 focus:outline-none transition-colors"
          />
        );

      default:
        return null;
    }
  };

  if (showResults) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-gradient-to-br from-dark-800/50 to-dark-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-12 relative overflow-hidden">
            {/* Celebration effects */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-10 left-10 w-4 h-4 bg-primary rounded-full animate-bounce"></div>
              <div className="absolute top-20 right-16 w-3 h-3 bg-yellow-400 rounded-full animate-bounce delay-100"></div>
              <div className="absolute bottom-20 left-16 w-5 h-5 bg-pink-400 rounded-full animate-bounce delay-200"></div>
            </div>

            <div className="relative z-10">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-slow">
                <Trophy className="w-12 h-12 text-white" />
              </div>

              <h1 className="text-4xl font-bold text-white mb-4">Survey Complete!</h1>
              <p className="text-gray-300 text-lg mb-8">Thank you for sharing your valuable feedback</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="bg-dark-700/50 rounded-xl p-4">
                  <Zap className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-primary">{Math.round(points)}</div>
                  <div className="text-sm text-gray-400">XP Earned</div>
                </div>
                <div className="bg-dark-700/50 rounded-xl p-4">
                  <Target className="w-6 h-6 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-400">{streak}x</div>
                  <div className="text-sm text-gray-400">Streak</div>
                </div>
                <div className="bg-dark-700/50 rounded-xl p-4">
                  <Award className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-yellow-400">A+</div>
                  <div className="text-sm text-gray-400">Grade</div>
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-gradient-to-r from-primary/20 to-purple-600/20 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center justify-center space-x-2">
                  <Star className="w-5 h-5 text-primary" />
                  <span>Achievement Unlocked</span>
                </h3>
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-white">Campus Voice</div>
                    <div className="text-sm text-gray-400">Completed your first survey</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => onNavigate('dashboard')}
                  className="px-8 py-3 bg-primary hover:bg-primary-dark rounded-xl text-white font-semibold transition-colors"
                >
                  View Dashboard
                </button>
                <button 
                  onClick={() => onNavigate('landing')}
                  className="px-8 py-3 bg-dark-700 hover:bg-dark-600 border border-dark-600 rounded-xl text-white font-semibold transition-colors"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => onNavigate('landing')}
            className="p-2 text-gray-400 hover:text-white hover:bg-dark-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-primary/20 px-4 py-2 rounded-full">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-primary font-semibold">{Math.round(points)} XP</span>
            </div>
            <div className="flex items-center space-x-2 bg-yellow-500/20 px-4 py-2 rounded-full">
              <Target className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 font-semibold">{streak}x Streak</span>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-white">{demoSurvey.title}</h2>
            <span className="text-gray-400">
              {currentQuestion + 1} of {demoSurvey.questions.length}
            </span>
          </div>
          <div className="w-full bg-dark-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-purple-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-gradient-to-br from-dark-800/50 to-dark-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <h3 className="text-2xl font-semibold text-white leading-tight pr-4">
              {currentQ.title}
            </h3>
            <div className="flex items-center space-x-2 bg-primary/20 px-3 py-1 rounded-full flex-shrink-0">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium text-sm">+{currentQ.points} XP</span>
            </div>
          </div>

          {renderQuestion()}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="flex items-center space-x-2 px-6 py-3 bg-dark-700 hover:bg-dark-600 disabled:bg-dark-800 disabled:opacity-50 rounded-xl text-white transition-colors disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={nextQuestion}
            disabled={!answers[currentQ.id]}
            className="flex items-center space-x-2 px-6 py-3 bg-primary hover:bg-primary-dark disabled:bg-primary/50 disabled:opacity-50 rounded-xl text-white font-semibold transition-colors disabled:cursor-not-allowed"
          >
            <span>{currentQuestion === demoSurvey.questions.length - 1 ? 'Complete' : 'Next'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurveyTaker;