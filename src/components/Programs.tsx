import React, { useState } from 'react';
import { Clock, Users2, CheckCircle, Calendar, DollarSign, ChevronDown, ChevronUp, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const Programs = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('half-day');
  const [showScrollArrow, setShowScrollArrow] = useState(false);

  const commonDetails = {
    title: "5-Day Fitness Foundation Program",
    dates: "July 21-25, 2025",
    ageRange: "6-13, all skill levels",
    groupSize: "15 (1 coach per group)",
    capacity: "3 Groups Max"
  };

  const programs = [
    {
      type: "Half-Day",
      schedule: "9:00 AM - 1:00 PM daily",
      price: "$225",
      description: "Focused fitness training and skill development",
      afternoonActivities: null
    },
    {
      type: "Full-Day",
      schedule: "9:00 AM - 5:00 PM daily",
      price: "$315",
      description: "Complete day experience including fitness training and afternoon arts & crafts activities",
      afternoonActivities: "1:00 PM - 5:00 PM: Arts & crafts and Non-Fitness Activities"
    }
  ];

  const dailyOverview = [
    {
      day: "Day 1",
      title: "Foundation & Body Awareness",
      description: "Basic movement patterns, understanding your body",
      icon: "🏗️"
    },
    {
      day: "Day 2", 
      title: "Strength & Stability",
      description: "Core strength, balance, functional movements",
      icon: "💪"
    },
    {
      day: "Day 3",
      title: "Cardio & Endurance", 
      description: "Heart health, making cardio fun and engaging",
      icon: "❤️"
    },
    {
      day: "Day 4",
      title: "Flexibility & Recovery",
      description: "Stretching, mobility, listening to your body", 
      icon: "🧘"
    },
    {
      day: "Day 5",
      title: "Integration & Celebration",
      description: "Combining skills, personal fitness plans",
      icon: "🎉"
    }
  ];

  const handleProgramSelection = (programType: string) => {
    // Dispatch custom event to notify Contact component
    const event = new CustomEvent('selectProgram', {
      detail: { program: programType }
    });
    window.dispatchEvent(event);
    
    // Scroll to contact section with mobile header visibility
    const element = document.querySelector('#contact') as HTMLElement;
    if (element) {
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        const elementTop = element.offsetTop;
        const headerHeight = 64;
        const extraSpace = 20;
        const offsetPosition = elementTop - headerHeight - extraSpace;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToNextSection = () => {
    const offeringsCards = document.querySelector('#offerings-cards') as HTMLElement;
    if (offeringsCards) {
      // Calculate how much to scroll down to show full cards
      const currentScrollTop = window.pageYOffset;
      const cardsRect = offeringsCards.getBoundingClientRect();
      const cardsBottom = cardsRect.bottom + currentScrollTop;
      const viewportHeight = window.innerHeight;
      const headerOffset = 100; // Space for navigation
      
      // Scroll down to position where cards are fully visible with some padding
      const targetPosition = cardsBottom - viewportHeight + headerOffset;
      
      // Only scroll down, never up
      if (targetPosition > currentScrollTop) {
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
    setShowScrollArrow(false); // Hide arrow after clicking
  };

  // Listen for navigation events to show arrow
  React.useEffect(() => {
    const handleNavigationToPrograms = () => {
      console.log('programsNavigated event received - showing arrow');
      setShowScrollArrow(true);
    };

    console.log('Adding programsNavigated event listener');
    window.addEventListener('programsNavigated', handleNavigationToPrograms as EventListener);
    
    return () => {
      console.log('Removing programsNavigated event listener');
      window.removeEventListener('programsNavigated', handleNavigationToPrograms as EventListener);
    };
  }, []);

  // Hide arrow immediately on any scroll movement
  React.useEffect(() => {
    console.log('showScrollArrow state changed to:', showScrollArrow);
    if (!showScrollArrow) return;

    const handleScroll = () => {
      console.log('User scrolled - hiding arrow');
      setShowScrollArrow(false);
    };

    // Add a small delay before attaching scroll listener to avoid immediate trigger from navigation scroll
    const timer = setTimeout(() => {
      console.log('Attaching scroll listener for arrow');
      window.addEventListener('scroll', handleScroll);
    }, 600); // Wait for navigation scroll and event dispatch to complete

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showScrollArrow]);

  console.log('Rendering Programs component, showScrollArrow:', showScrollArrow);

  return (
    <section id="programs" className="pt-4 pb-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            Our Offerings
          </h2>
          {/* Desktop-only paragraph */}
          <p className="hidden md:block text-xl text-blue-100 max-w-3xl mx-auto">
            Three exciting blocks to choose from. Select half-day or full-day options that fit your family's schedule perfectly.
          </p>
          {/* Mobile-only centering wrapper */}
          <div className="md:hidden flex justify-center">
            <p className="text-xl text-blue-100 max-w-3xl text-center">
              Three exciting blocks to choose from. Select half-day or full-day options that fit your family's schedule perfectly.
            </p>
          </div>
        </div>

        {/* 3 Camp Blocks Row - Compact, before quick facts */}
        <div className="hidden md:flex flex-row justify-center items-center gap-6 mb-8">
          <div className="flex flex-col items-center bg-gradient-to-br from-blue-800/80 to-orange-400/80 rounded-2xl shadow-2xl px-16 py-4 min-w-[200px]">
            <Calendar className="h-8 w-8 text-orange-200 mb-2" strokeWidth={2.5} />
            <span className="text-lg font-bold text-orange-100">BLOCK 1</span>
            <span className="text-base text-white font-semibold">July 21 - 25</span>
          </div>
          <div className="flex flex-col items-center bg-gradient-to-br from-blue-800/80 to-orange-400/80 rounded-2xl shadow-2xl px-16 py-4 min-w-[200px]">
            <Calendar className="h-8 w-8 text-orange-200 mb-2" strokeWidth={2.5} />
            <span className="text-lg font-bold text-orange-100">BLOCK 2</span>
            <span className="text-base text-white font-semibold">July 28 - Aug 01</span>
          </div>
          <div className="flex flex-col items-center bg-gradient-to-br from-blue-800/80 to-orange-400/80 rounded-2xl shadow-2xl px-16 py-4 min-w-[200px]">
            <Calendar className="h-8 w-8 text-orange-200 mb-2" strokeWidth={2.5} />
            <span className="text-lg font-bold text-orange-100">BLOCK 3</span>
            <span className="text-base text-white font-semibold">Aug 04 - 08</span>
          </div>
        </div>

        {/* Desktop Version - Hidden on mobile */}
        <div className="hidden md:block">
          {/* Our Offerings Gradient Quick Facts Strip - Larger */}
          <div className="flex justify-center mt-8 mb-5">
            <div className="bg-gradient-to-br from-blue-800 via-orange-400 to-orange-500 rounded-full shadow-lg px-12 py-3 flex flex-row items-center justify-center gap-12 relative text-lg text-center" style={{ minWidth: '420px', fontWeight: 600 }}>
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-900 text-white text-[10px] px-2 py-0.5 rounded-full font-semibold tracking-wide shadow-sm">Per Block</span>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-white" />
                <span className="font-semibold text-white text-sm">{commonDetails.capacity}</span>
              </div>
              <div className="flex items-center gap-3">
                <Users2 className="w-6 h-6 text-white" />
                <span className="font-semibold text-white text-sm">15/group</span>
              </div>
            </div>
          </div>
          {/* Experience Cards - Redesigned */}
          <div id="offerings-cards" className="offerings-container">
            {/* Half-Day Card */}
            <div className="offering-card half-day-card">
              <div className="card-header">
                <div>
                  <h3 className="card-title">Half-Day Experience</h3>
                  <p className="card-description">Focused fitness training & skill development</p>
                </div>
                <div className="price-badge">
                  <div className="text-sm text-red-200 line-through opacity-75">$250</div>
                  <div className="text-2xl font-bold">$225</div>
                  <div className="text-xs text-green-200 font-semibold mt-1">Save $25!</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 mb-3">
                <Users2 className="w-6 h-6 text-blue-700" />
                <span className="text-sm font-semibold text-blue-700">Ages {commonDetails.ageRange}</span>
                <span className="mx-1 text-blue-400">|</span>
                <Award className="w-5 h-5 text-blue-700" />
                <span className="text-sm font-semibold text-blue-700">All Skill Levels</span>
              </div>
              <div className="time-info">
                <svg className="time-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 9.586V6z" clipRule="evenodd"/>
                </svg>
                <span className="time-text">9:00 AM – 1:00 PM daily</span>
              </div>
              <ul className="features-list">
                <li className="feature-item">
                  <svg className="check-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="feature-text">Movement fundamentals &amp; proper form</span>
                </li>
                <li className="feature-item">
                  <svg className="check-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="feature-text">Fitness game stations</span>
                </li>
                <li className="feature-item">
                  <svg className="check-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="feature-text">Healthy habits &amp; nutrition basics</span>
                </li>
                <li className="feature-item">
                  <svg className="check-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="feature-text">...and much more!</span>
                </li>
              </ul>
              <button className="bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-orange-600 transition-all duration-300 w-full shadow-lg hover:shadow-xl" onClick={() => handleProgramSelection('half-day')}>
                Register Now - Save 10%
              </button>
            </div>
            {/* Full-Day Card */}
            <div className="offering-card full-day-card">
              <div className="card-header">
                <div>
                  <h3 className="card-title">Full-Day Experience</h3>
                  <p className="card-description">Fitness training + afternoon arts & crafts</p>
                </div>
                <div className="price-badge">
                  <div className="text-sm text-red-200 line-through opacity-75">$350</div>
                  <div className="text-2xl font-bold">$315</div>
                  <div className="text-xs text-green-200 font-semibold mt-1">Save $35!</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 mb-3">
                <Users2 className="w-6 h-6 text-blue-700" />
                <span className="text-sm font-semibold text-blue-700">Ages {commonDetails.ageRange}</span>
                <span className="mx-1 text-blue-400">|</span>
                <Award className="w-5 h-5 text-blue-700" />
                <span className="text-sm font-semibold text-blue-700">All Skill Levels</span>
              </div>
              <div className="time-info">
                <svg className="time-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 9.586V6z" clipRule="evenodd"/>
                </svg>
                <span className="time-text">9:00 AM – 5:00 PM daily</span>
              </div>
              <ul className="features-list">
                <li className="feature-item">
                  <svg className="check-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="feature-text">Morning fitness fundamentals &amp; skill drills</span>
                </li>
                <li className="feature-item">
                  <svg className="check-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="feature-text">Afternoon creative workshops (arts, STEM projects &amp; crafts)</span>
                </li>
                <li className="feature-item">
                  <svg className="check-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="feature-text">Outdoor exploration &amp; team-building challenges</span>
                </li>
                <li className="feature-item">
                  <svg className="check-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="feature-text">...and much more!</span>
                </li>
              </ul>
              <button className="bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-orange-600 transition-all duration-300 w-full shadow-lg hover:shadow-xl" onClick={() => handleProgramSelection('full-day')}>
                Register Now - Save 10%
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Version - Hidden on desktop */}
        <div className="md:hidden">
          {/* Block Dates Row - Text with Icon */}
          <div className="flex justify-center gap-3 mb-6">
            <div className="flex flex-col items-center bg-gradient-to-br from-blue-800/80 to-orange-400/80 rounded-2xl shadow-lg px-5 py-4 min-w-[100px]">
              <Calendar className="h-7 w-7 text-orange-200 mb-1.5" strokeWidth={2.5} />
              <span className="text-sm font-bold text-orange-100">BLOCK 1</span>
              <span className="text-xs text-white font-semibold">July 21 - 25</span>
            </div>
            <div className="flex flex-col items-center bg-gradient-to-br from-blue-800/80 to-orange-400/80 rounded-2xl shadow-lg px-5 py-4 min-w-[100px]">
              <Calendar className="h-7 w-7 text-orange-200 mb-1.5" strokeWidth={2.5} />
              <span className="text-sm font-bold text-orange-100">BLOCK 2</span>
              <span className="text-xs text-white font-semibold">July 28 - Aug 01</span>
            </div>
            <div className="flex flex-col items-center bg-gradient-to-br from-blue-800/80 to-orange-400/80 rounded-2xl shadow-lg px-5 py-4 min-w-[100px]">
              <Calendar className="h-7 w-7 text-orange-200 mb-1.5" strokeWidth={2.5} />
              <span className="text-sm font-bold text-orange-100">BLOCK 3</span>
              <span className="text-xs text-white font-semibold">Aug 04 - 08</span>
            </div>
          </div>

          {/* Mobile Program Tabs - Revert to previous detailed format */}
          <div className="mb-6">
            {/* Tab Buttons */}
            <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
              <button
                onClick={() => setActiveTab('half-day')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'half-day' 
                    ? 'bg-white text-orange-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Half-Day
              </button>
              <button
                onClick={() => setActiveTab('full-day')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'full-day' 
                    ? 'bg-white text-orange-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Full-Day
              </button>
            </div>
            {/* Tab Content - Detailed Cards */}
            {programs.map((program, index) => {
              const isActive = (program.type === 'Half-Day' && activeTab === 'half-day') || 
                              (program.type === 'Full-Day' && activeTab === 'full-day');
              if (!isActive) return null;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{program.type} Experience</h3>
                    <div className="flex flex-col items-center space-y-3 mb-3">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-orange-500" />
                        <span className="font-semibold text-sm text-gray-700">{program.schedule}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-sm text-red-500 line-through opacity-75">
                          {program.type === 'Half-Day' ? '$250' : '$350'}
                        </span>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-5 w-5 text-green-500" />
                          <span className="font-bold text-2xl text-green-600">{program.price}</span>
                        </div>
                        <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold mt-1">
                          Save ${program.type === 'Half-Day' ? '25' : '35'}!
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{program.description}</p>
                    <div className="flex items-center justify-center gap-1 mb-3">
                      <Users2 className="w-5 h-5 text-blue-700" />
                      <span className="text-xs font-semibold text-blue-700">Ages {commonDetails.ageRange}</span>
                      <span className="mx-1 text-blue-400">|</span>
                      <Award className="w-4 h-4 text-blue-700" />
                      <span className="text-xs font-semibold text-blue-700">All Skill Levels</span>
                    </div>
                    {program.afternoonActivities && (
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-2 mb-3">
                        <p className="text-xs text-orange-800 font-medium">{program.afternoonActivities}</p>
                      </div>
                    )}
                    <button 
                      onClick={() => {
                        handleProgramSelection(program.type === 'Half-Day' ? 'half-day' : 'full-day');
                      }}
                      className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 w-full"
                    >
                      Register Now – Save 10%
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sleek Quick Facts Panel */}
          <div className="flex justify-center mt-8 mb-5">
            <div className="bg-gradient-to-br from-blue-800/90 via-blue-600/80 to-orange-400/80 rounded-full shadow px-5 py-2 flex flex-row items-center gap-6 relative">
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-900 text-white text-[10px] px-2 py-0.5 rounded-full font-semibold tracking-wide shadow-sm">Per Block</span>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-white" />
                <span className="font-semibold text-white text-sm">{commonDetails.capacity}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users2 className="w-6 h-6 text-white" />
                <span className="font-semibold text-white text-sm">15/group</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Down Arrow - Desktop Only */}
      {showScrollArrow && (
        <div className="hidden md:block fixed bottom-8 left-1/2 -translate-x-1/2 z-20 transition-opacity duration-500">
          <button 
            onClick={scrollToNextSection}
            className="text-white hover:text-orange-400 transition-all duration-300 animate-bounce bg-black/60 backdrop-blur-sm rounded-full p-3 shadow-xl border border-white/20 flex items-center justify-center"
            title="Scroll to see more"
          >
            <ChevronDown className="h-6 w-6" />
          </button>
        </div>
      )}
      {/* Debug: {showScrollArrow ? 'Arrow should be visible' : 'Arrow should be hidden'} */}
    </section>
  );
};

export default Programs;