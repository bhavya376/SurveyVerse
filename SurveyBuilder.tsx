import React, { useState } from 'react';
import { Plus, ArrowLeft, Save, Eye, Trash2, GripVertical, Type, CheckSquare, Circle, Star, Sliders as Slider, Calendar } from 'lucide-react';

interface SurveyBuilderProps {
  onNavigate: (page: string) => void;
}

interface Question {
  id: string;
  type: 'text' | 'multiple-choice' | 'rating' | 'scale' | 'date';
  title: string;
  options?: string[];
  required: boolean;
  points: number;
}

const SurveyBuilder: React.FC<SurveyBuilderProps> = ({ onNavigate }) => {
  const [surveyTitle, setSurveyTitle] = useState('Campus Experience Survey');
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      type: 'multiple-choice',
      title: 'How satisfied are you with campus facilities?',
      options: ['Extremely Satisfied', 'Very Satisfied', 'Satisfied', 'Needs Improvement'],
      required: true,
      points: 50
    }
  ]);

  const questionTypes = [
    { type: 'text', icon: Type, label: 'Text Response', color: 'from-blue-500 to-blue-600' },
    { type: 'multiple-choice', icon: CheckSquare, label: 'Multiple Choice', color: 'from-primary to-purple-600' },
    { type: 'rating', icon: Star, label: 'Rating Scale', color: 'from-yellow-500 to-orange-500' },
    { type: 'scale', icon: Slider, label: 'Scale (1-10)', color: 'from-green-500 to-green-600' },
    { type: 'date', icon: Calendar, label: 'Date Picker', color: 'from-pink-500 to-red-500' }
  ];

  const addQuestion = (type: string) => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type: type as Question['type'],
      title: 'New Question',
      options: type === 'multiple-choice' ? ['Option 1', 'Option 2'] : undefined,
      required: false,
      points: 25
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, ...updates } : q));
  };

  const deleteQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const renderQuestionEditor = (question: Question) => (
    <div key={question.id} className="bg-gradient-to-br from-dark-800/50 to-dark-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-4 group hover:border-primary/30 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
          <div className={`w-8 h-8 bg-gradient-to-br ${questionTypes.find(t => t.type === question.type)?.color} rounded-lg flex items-center justify-center`}>
            {React.createElement(questionTypes.find(t => t.type === question.type)?.icon || Type, { className: "w-4 h-4 text-white" })}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 bg-primary/20 px-3 py-1 rounded-full">
            <Star className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">{question.points} XP</span>
          </div>
          <button 
            onClick={() => deleteQuestion(question.id)}
            className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <input
        type="text"
        value={question.title}
        onChange={(e) => updateQuestion(question.id, { title: e.target.value })}
        className="w-full bg-dark-700/50 border border-dark-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-primary/50 focus:outline-none transition-colors"
        placeholder="Enter question title..."
      />

      {question.type === 'multiple-choice' && (
        <div className="space-y-2">
          <label className="text-sm text-gray-300 font-medium">Options:</label>
          {question.options?.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={option}
                onChange={(e) => {
                  const newOptions = [...(question.options || [])];
                  newOptions[index] = e.target.value;
                  updateQuestion(question.id, { options: newOptions });
                }}
                className="flex-1 bg-dark-700/30 border border-dark-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-primary/50 focus:outline-none transition-colors"
              />
              {question.options && question.options.length > 2 && (
                <button 
                  onClick={() => {
                    const newOptions = question.options?.filter((_, i) => i !== index);
                    updateQuestion(question.id, { options: newOptions });
                  }}
                  className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={() => {
              const newOptions = [...(question.options || []), `Option ${(question.options?.length || 0) + 1}`];
              updateQuestion(question.id, { options: newOptions });
            }}
            className="text-primary hover:text-primary-light text-sm font-medium flex items-center space-x-1"
          >
            <Plus className="w-4 h-4" />
            <span>Add Option</span>
          </button>
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={question.required}
            onChange={(e) => updateQuestion(question.id, { required: e.target.checked })}
            className="w-4 h-4 text-primary bg-dark-700 border-dark-600 rounded focus:ring-primary/50"
          />
          <span className="text-sm text-gray-300">Required</span>
        </label>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-300">Points:</span>
          <input
            type="number"
            value={question.points}
            onChange={(e) => updateQuestion(question.id, { points: parseInt(e.target.value) || 0 })}
            className="w-20 bg-dark-700/50 border border-dark-600 rounded-lg px-2 py-1 text-white text-sm focus:border-primary/50 focus:outline-none"
            min="0"
            max="100"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => onNavigate('landing')}
              className="p-2 text-gray-400 hover:text-white hover:bg-dark-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white">Survey Builder</h1>
              <p className="text-gray-400">Create engaging, gamified survey experiences</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => onNavigate('survey')}
              className="flex items-center space-x-2 px-4 py-2 bg-dark-800 hover:bg-dark-700 border border-dark-600 rounded-lg text-white transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </button>
            <button className="flex items-center space-x-2 px-6 py-2 bg-primary hover:bg-primary-dark rounded-lg text-white font-medium transition-colors">
              <Save className="w-4 h-4" />
              <span>Save Survey</span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Survey Settings */}
            <div className="bg-gradient-to-br from-dark-800/50 to-dark-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Survey Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Survey Title</label>
                  <input
                    type="text"
                    value={surveyTitle}
                    onChange={(e) => setSurveyTitle(e.target.value)}
                    className="w-full bg-dark-700/50 border border-dark-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-primary/50 focus:outline-none"
                  />
                </div>
                <div className="pt-4 border-t border-white/10">
                  <div className="text-sm text-gray-300">Total Questions: <span className="text-primary font-medium">{questions.length}</span></div>
                  <div className="text-sm text-gray-300">Total Points: <span className="text-primary font-medium">{questions.reduce((sum, q) => sum + q.points, 0)} XP</span></div>
                </div>
              </div>
            </div>

            {/* Question Types */}
            <div className="bg-gradient-to-br from-dark-800/50 to-dark-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Add Questions</h3>
              <div className="space-y-3">
                {questionTypes.map((type) => (
                  <button
                    key={type.type}
                    onClick={() => addQuestion(type.type)}
                    className="w-full flex items-center space-x-3 p-3 bg-dark-700/30 hover:bg-dark-700/50 border border-dark-600 hover:border-primary/50 rounded-lg transition-all duration-300 group"
                  >
                    <div className={`w-8 h-8 bg-gradient-to-br ${type.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <type.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white text-sm font-medium">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-gradient-to-br from-dark-800/30 to-dark-900/30 backdrop-blur-sm border border-white/5 rounded-xl p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">{surveyTitle}</h2>
                <p className="text-gray-400">Drag questions to reorder • Click to edit</p>
              </div>

              <div className="space-y-6">
                {questions.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-dark-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Plus className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">No questions yet</h3>
                    <p className="text-gray-400 mb-4">Add your first question using the sidebar</p>
                  </div>
                ) : (
                  questions.map(renderQuestionEditor)
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyBuilder;