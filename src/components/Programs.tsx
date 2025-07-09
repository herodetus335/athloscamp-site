import React, { useState } from 'react';
import { Clock, Users2, CheckCircle, Calendar, DollarSign, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Programs = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('half-day');

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
      price: "$250",
      description: "Focused fitness training and skill development",
      afternoonActivities: null
    },
    {
      type: "Full-Day",
      schedule: "9:00 AM - 5:00 PM daily",
      price: "$350",
      description: "Complete day experience including fitness training and afternoon arts & crafts activities",
      afternoonActivities: "1:00 PM - 5:00 PM: Arts & crafts and non-fitness activities"
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

  return (
    <section id="programs" className="pt-4 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            Our Offerings
          </h2>
          {/* Desktop-only paragraph */}
          <p className="hidden md:block text-xl text-blue-100 max-w-3xl mx-auto">
            Choose from our immersive 5-day fitness foundation experiences designed to build healthy habits and athletic skills for life.
          </p>
          {/* Mobile-only centering wrapper */}
          <div className="md:hidden flex justify-center">
            <p className="text-xl text-blue-100 max-w-3xl text-center">
              Choose from our immersive 5-day fitness foundation experiences designed to build healthy habits and athletic skills for life.
            </p>
          </div>
        </div>

        {/* Desktop Version - Hidden on mobile */}
        <div className="hidden md:block">
          {/* Our Offerings Gradient Quick Facts Strip - Larger */}
          <div className="bg-gradient-to-r from-blue-600 to-orange-500 rounded-xl flex justify-center items-center max-w-6xl mx-auto shadow-lg px-6 py-6">
            <div className="flex items-center space-x-2 mx-6">
              <Calendar className="w-5 h-5 text-white" />
              <span className="font-semibold text-white text-base">{commonDetails.dates}</span>
            </div>
            <div className="flex items-center space-x-2 mx-6">
              <Users2 className="w-5 h-5 text-white" />
              <span className="font-semibold text-white text-base">Ages {commonDetails.ageRange}</span>
            </div>
            <div className="flex items-center space-x-2 mx-6">
              <Users2 className="w-5 h-5 text-white" />
              <div className="flex flex-col mt-1">
                <span className="font-semibold text-white text-base leading-tight">15 kids per group</span>
                <span className="text-xs text-white/80 leading-tight">(1 coach per group)</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 mx-6">
              <CheckCircle className="w-5 h-5 text-white" />
              <span className="font-semibold text-white text-base">{commonDetails.capacity}</span>
            </div>
          </div>
          {/* Experience Cards - Redesigned */}
          <div className="offerings-container">
            {/* Half-Day Card */}
            <div className="offering-card half-day-card">
              <div className="card-header">
                <div>
                  <h3 className="card-title">Half-Day Experience</h3>
                  <p className="card-description">Focused fitness training & skill development</p>
                </div>
                <div className="price-badge">$250</div>
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
              <button className="cta-button" onClick={() => window.location.href = '/#contact'}>Choose Half-Day</button>
            </div>
            {/* Full-Day Card */}
            <div className="offering-card full-day-card">
              <div className="card-header">
                <div>
                  <h3 className="card-title">Full-Day Experience</h3>
                  <p className="card-description">Fitness training + afternoon arts & crafts</p>
                </div>
                <div className="price-badge">$350</div>
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
              <button className="cta-button" onClick={() => window.location.href = '/#contact'}>Choose Full-Day</button>
            </div>
          </div>
        </div>

        {/* Mobile Version - Hidden on desktop */}
        <div className="md:hidden">
          {/* Centered Our Offerings Gradient Quick Facts Strip - Mobile, 4 sections */}
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-blue-600 to-orange-500 rounded-xl grid grid-cols-2 gap-y-2 max-w-sm w-full mx-auto shadow-lg px-2 py-4 mb-6">
              <div className="flex flex-col items-center justify-center py-2 border-b border-white/20 border-r">
                <Calendar className="w-6 h-6 text-white mb-1" />
                <span className="font-semibold text-white text-xs text-center">{commonDetails.dates}</span>
              </div>
              <div className="flex flex-col items-center justify-center py-2 border-b border-white/20">
                <Users2 className="w-6 h-6 text-white mb-1" />
                <span className="font-semibold text-white text-xs text-center">Ages {commonDetails.ageRange}</span>
              </div>
              <div className="flex flex-col items-center justify-center py-2 border-r">
                <Users2 className="w-6 h-6 text-white mb-1" />
                <div className="flex flex-col mt-1">
                  <span className="font-semibold text-white text-xs text-center leading-tight">15 kids per group</span>
                  <span className="text-[11px] text-white/80 text-center leading-tight">(1 coach per group)</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center py-2">
                <CheckCircle className="w-6 h-6 text-white mb-1" />
                <span className="font-semibold text-white text-xs text-center">{commonDetails.capacity}</span>
              </div>
            </div>
          </div>
          {/* Mobile Program Tabs */}
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
            {/* Tab Content */}
            {programs.map((program, index) => {
              const isActive = (program.type === 'Half-Day' && activeTab === 'half-day') || 
                              (program.type === 'Full-Day' && activeTab === 'full-day');
              if (!isActive) return null;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{program.type} Experience</h3>
                    <div className="flex items-center justify-center space-x-4 mb-3">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-orange-500" />
                        <span className="font-semibold text-sm text-gray-700">{program.schedule}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-green-500" />
                        <span className="font-bold text-xl text-green-600">{program.price}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{program.description}</p>
                    {program.afternoonActivities && (
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-2 mb-3">
                        <p className="text-xs text-orange-800 font-medium">{program.afternoonActivities}</p>
                      </div>
                    )}
                    {/* Inline Early Bird Offer */}
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-2 mb-4">
                      <p className="text-xs text-orange-800 font-medium">
                        🐦 Early Bird: Save 10% if you register by July 14th
                      </p>
                    </div>
                    <button 
                      onClick={() => {
                        const element = document.querySelector('#contact');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 w-full"
                    >
                      Register Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;