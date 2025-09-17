import React, { useState } from "react";
import LandingPage from "./components/LandingPage";
import SurveyBuilder from "./components/SurveyBuilder";
import SurveyTaker from "./components/SurveyTaker";
import Dashboard from "./components/Dashboard";
import AnimatedBackground from './components/AnimatedBackground';

type Page = "landing" | "builder" | "survey" | "dashboard";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("landing");

  const renderPage = () => {
    switch (currentPage) {
      case "landing":
        return <LandingPage onNavigate={setCurrentPage} />;
      case "builder":
        return <SurveyBuilder onNavigate={setCurrentPage} />;
      case "survey":
        return <SurveyTaker onNavigate={setCurrentPage} />;
      case "dashboard":
        return <Dashboard onNavigate={setCurrentPage} />;
      default:
        return <LandingPage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-dark-900 text-white">
      {/* Background Layer */}
      <div className="absolute inset-0 -z-10">
        <AnimatedBackground />
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
