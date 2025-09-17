import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Users, 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Calendar,
  Download,
  Filter,
  Search,
  Star,
  Trophy,
  Zap,
  Target
} from 'lucide-react';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const handleExport = async () => {
  const element = document.getElementById("dashboard-content");
  if (!element) return;

  const canvas = await html2canvas(element, { 
    scale: 2, 
    backgroundColor: "#0f172a" // tumhare dark bg ka color
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save("dashboard.pdf");
};


interface DashboardProps {
  onNavigate: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  const [activeTab, setActiveTab] = useState('overview');

  const stats = {
    totalResponses: 2847,
    activeUsers: 1205,
    completionRate: 87,
    avgRating: 4.2
  };

  const recentSurveys = [
    {
      id: '1',
      title: 'Campus Experience Survey',
      responses: 456,
      completionRate: 92,
      avgPoints: 285,
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Student Services Feedback',
      responses: 234,
      completionRate: 78,
      avgPoints: 190,
      status: 'active',
      createdAt: '2024-01-12'
    },
    {
      id: '3',
      title: 'Course Evaluation Form',
      responses: 789,
      completionRate: 95,
      avgPoints: 320,
      status: 'completed',
      createdAt: '2024-01-10'
    }
  ];

  const topPerformers = [
    { name: 'Alex Chen', points: 1250, surveys: 8, badge: 'Campus Champion' },
    { name: 'Maria Rodriguez', points: 1180, surveys: 7, badge: 'Feedback Master' },
    { name: 'James Wilson', points: 1050, surveys: 6, badge: 'Survey Star' }
  ];

  return (
    <div id="dashboard-content" className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
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
              <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
              <p className="text-gray-400">Track engagement and survey performance</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select 
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white text-sm focus:border-primary/50 focus:outline-none"
              >
                <option value="day">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
            <button onClick={handleExport} className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary-dark rounded-lg text-white font-medium transition-colors">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-dark-800/50 to-dark-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-primary" />
              <span className="text-2xl">📊</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stats.totalResponses.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Total Responses</div>
            <div className="flex items-center mt-2 text-green-400 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              +12% from last week
            </div>
          </div>

          <div className="bg-gradient-to-br from-dark-800/50 to-dark-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Zap className="w-8 h-8 text-yellow-400" />
              <span className="text-2xl">⚡</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stats.activeUsers.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Active Users</div>
            <div className="flex items-center mt-2 text-green-400 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              +8% from last week
            </div>
          </div>

          <div className="bg-gradient-to-br from-dark-800/50 to-dark-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Target className="w-8 h-8 text-green-400" />
              <span className="text-2xl">🎯</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stats.completionRate}%</div>
            <div className="text-sm text-gray-400">Completion Rate</div>
            <div className="flex items-center mt-2 text-green-400 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              +3% from last week
            </div>
          </div>

          <div className="bg-gradient-to-br from-dark-800/50 to-dark-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Star className="w-8 h-8 text-purple-400" />
              <span className="text-2xl">⭐</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stats.avgRating}/5</div>
            <div className="text-sm text-gray-400">Average Rating</div>
            <div className="flex items-center mt-2 text-green-400 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              +0.2 from last week
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-dark-800/50 rounded-xl p-1">
            {['overview', 'surveys', 'leaderboard'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-dark-700/50'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Chart */}
                <div className="bg-gradient-to-br from-dark-800/50 to-dark-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-white">Response Trends</h3>
                    <BarChart3 className="w-5 h-5 text-gray-400" />
                  </div>
                  
                  {/* Mock Chart */}
                  <div className="space-y-4">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                      <div key={day} className="flex items-center space-x-4">
                        <div className="w-12 text-sm text-gray-400">{day}</div>
                        <div className="flex-1 bg-dark-700 rounded-full h-6 relative overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-primary to-purple-400 h-full rounded-full transition-all duration-1000"
                            style={{ width: `${Math.random() * 80 + 20}%` }}
                          ></div>
                          <div className="absolute inset-0 flex items-center px-3 text-xs text-white font-medium">
                            {Math.floor(Math.random() * 200 + 50)} responses
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Satisfaction Distribution */}
                <div className="bg-gradient-to-br from-dark-800/50 to-dark-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-white">Satisfaction Distribution</h3>
                    <PieChart className="w-5 h-5 text-gray-400" />
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { label: 'Extremely Satisfied', value: 45, color: 'bg-green-500' },
                      { label: 'Very Satisfied', value: 30, color: 'bg-primary' },
                      { label: 'Satisfied', value: 20, color: 'bg-yellow-500' },
                      { label: 'Needs Improvement', value: 5, color: 'bg-red-500' }
                    ].map((item) => (
                      <div key={item.label} className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 w-32">
                          <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                          <span className="text-sm text-gray-400">{item.value}%</span>
                        </div>
                        <div className="flex-1 bg-dark-700 rounded-full h-2">
                          <div className={`${item.color} h-2 rounded-full transition-all duration-1000`} style={{ width: `${item.value}%` }}></div>
                        </div>
                        <div className="text-sm text-gray-300 w-32">{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'surveys' && (
              <div className="bg-gradient-to-br from-dark-800/50 to-dark-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">Survey Performance</h3>
                  <button 
                    onClick={() => onNavigate('builder')}
                    className="px-4 py-2 bg-primary hover:bg-primary-dark rounded-lg text-white text-sm font-medium transition-colors"
                  >
                    New Survey
                  </button>
                </div>

                <div className="space-y-4">
                  {recentSurveys.map((survey) => (
                    <div key={survey.id} className="bg-dark-700/30 border border-dark-600 rounded-xl p-4 hover:border-primary/30 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-white">{survey.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          survey.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                        }`}>
                          {survey.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-gray-400">Responses</div>
                          <div className="text-white font-semibold">{survey.responses}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Completion</div>
                          <div className="text-white font-semibold">{survey.completionRate}%</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Avg Points</div>
                          <div className="text-primary font-semibold">{survey.avgPoints} XP</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'leaderboard' && (
              <div className="bg-gradient-to-br from-dark-800/50 to-dark-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">Top Participants</h3>
                  <Trophy className="w-5 h-5 text-yellow-400" />
                </div>

                <div className="space-y-4">
                  {topPerformers.map((user, index) => (
                    <div key={user.name} className="flex items-center space-x-4 p-4 bg-dark-700/30 rounded-xl border border-dark-600">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        index === 0 ? 'bg-yellow-500 text-white' :
                        index === 1 ? 'bg-gray-400 text-white' :
                        index === 2 ? 'bg-orange-600 text-white' :
                        'bg-dark-600 text-gray-300'
                      }`}>
                        {index + 1}
                      </div>
                      
                      <div className="flex-1">
                        <div className="font-semibold text-white">{user.name}</div>
                        <div className="text-sm text-gray-400">{user.badge}</div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-primary font-semibold">{user.points} XP</div>
                        <div className="text-xs text-gray-400">{user.surveys} surveys</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-dark-800/50 to-dark-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => onNavigate('builder')}
                  className="w-full p-3 bg-primary/20 hover:bg-primary/30 border border-primary/30 rounded-lg text-primary font-medium transition-colors"
                >
                  Create New Survey
                </button>
                <button 
                  onClick={() => onNavigate('survey')}
                  className="w-full p-3 bg-dark-700/50 hover:bg-dark-600 border border-dark-600 rounded-lg text-white transition-colors"
                >
                  Test Survey
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gradient-to-br from-dark-800/50 to-dark-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { action: 'Survey completed', user: 'Alex Chen', time: '2 min ago' },
                  { action: 'New response', user: 'Maria Rodriguez', time: '5 min ago' },
                  { action: 'Survey shared', user: 'James Wilson', time: '10 min ago' },
                  { action: 'Achievement unlocked', user: 'Sarah Kim', time: '15 min ago' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-white">{activity.action}</div>
                      <div className="text-gray-400">{activity.user} • {activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-gradient-to-br from-dark-800/50 to-dark-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Campus Achievements</h3>
              <div className="space-y-3">
                {[
                  { name: 'Survey Master', desc: '100+ responses', icon: '🏆' },
                  { name: 'Campus Voice', desc: 'First survey completed', icon: '🎙️' },
                  { name: 'Feedback Hero', desc: '50+ quality responses', icon: '⭐' }
                ].map((achievement) => (
                  <div key={achievement.name} className="flex items-center space-x-3 p-3 bg-dark-700/30 rounded-lg">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div>
                      <div className="text-white font-medium text-sm">{achievement.name}</div>
                      <div className="text-gray-400 text-xs">{achievement.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;