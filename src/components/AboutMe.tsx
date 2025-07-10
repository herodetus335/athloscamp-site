import React, { useState } from 'react';
import { Award, Heart, Shield, CheckCircle } from 'lucide-react';

const AboutMe = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const qualifications = [
    "NASM Certified Personal Trainer",
    "CPR/AED & First Aid Certified",
    "Group Fitness Instruction",
    "5+ Years of Coaching"
  ];

  return (
    <section id="aboutme" className="py-12 -mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Us header */}
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center md:hidden">
          About Us
        </h2>
        
        <div className="bg-white/80 rounded-xl p-8 shadow-lg md:p-8 p-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start md:gap-8 gap-4 md:gap-8 gap-2">
            <div className="relative coach">
                  <div className="relative overflow-hidden rounded-xl shadow-lg md:rounded-xl rounded-lg">
                    <img 
                  src="/coachmikeprofilemobile.jpg"
                      alt="Coach Mikael Frey"
                      className="w-full h-auto transition-all duration-300"
                      style={{ 
                        maxHeight: '700px',
                        objectFit: 'contain',
                        objectPosition: 'center'
                      }}
                    />
                  </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 md:text-4xl text-xl">
                Meet Coach Mike
              </h2>
              
              <div className="space-y-3 md:space-y-4 space-y-2 bg-white/80 p-4 rounded-xl shadow-lg" style={{borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}}>
                <div className="text-base text-black leading-relaxed bio md:text-base text-sm leading-relaxed font-normal md:hidden" style={{lineHeight: '1.6'}}>
                  Hi, I'm Mikael Frey or Coach Mike. Over the past five years, I've guided kids and teens one-on-one and in groups to build strong movement foundations and discover the joy of being active. Time and again, I've seen that when young people learn proper form early and associate exercise with fun, they carry those habits into adulthood.
                  {!isExpanded && (
                    <span className="text-orange-500">...</span>
                  )}
                </div>
                
                {isExpanded && (
                  <div className="text-base text-black leading-relaxed bio md:text-base text-sm leading-relaxed font-normal" style={{lineHeight: '1.6'}}>
                    After years of success in both private and group settings, I've gained the confidence to try something new—opening my first children's camp. I created this program because I wanted to use my expertise in exercise and making fitness approachable to teach kids valuable skills they can carry forward. Through story-driven challenges, fitness scavenger hunts, partner relays, and puzzle-based movement stations, I help kids experience real gains in strength, agility, and coordination while discovering that choosing to move isn't just hard work, it's empowering and energizing. My goal is for them to embrace the sweat and want to keep moving long after camp ends.
                  </div>
                )}

                {/* Desktop version - always show both paragraphs */}
                <div className="hidden md:block">
                  <div className="text-base text-black leading-relaxed bio md:text-base text-sm leading-relaxed font-normal" style={{lineHeight: '1.6'}}>
                    Hi, I'm Mikael Frey or Coach Mike. Over the past five years, I've guided kids and teens one-on-one and in groups to build strong movement foundations and discover the joy of being active. Time and again, I've seen that when young people learn proper form early and associate exercise with fun, they carry those habits into adulthood.
                  </div>
                  
                  <div className="text-base text-black leading-relaxed bio md:text-base text-sm leading-relaxed font-normal mt-4" style={{lineHeight: '1.6'}}>
                    After years of success in both private and group settings, I've gained the confidence to try something new—opening my first children's camp. I created this program because I wanted to use my expertise in exercise and making fitness approachable to teach kids valuable skills they can carry forward. Through story-driven challenges, fitness scavenger hunts, partner relays, and puzzle-based movement stations, I help kids experience real gains in strength, agility, and coordination while discovering that choosing to move isn't just hard work, it's empowering and energizing. My goal is for them to embrace the sweat and want to keep moving long after camp ends.
                  </div>
                </div>

                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="md:hidden text-orange-500 hover:text-orange-600 text-sm font-medium underline focus:outline-none"
                >
                  {isExpanded ? 'Read less' : 'Read more'}
                </button>
              </div>

              <div className="mt-4 md:mt-6 mt-2">
                <h3 className="text-lg font-semibold text-black mb-2 md:text-lg text-xs">Qualifications & Experience</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2 gap-1">
                  {qualifications.map((qualification, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 md:h-4 h-3" />
                      <span className="text-sm text-black md:text-sm text-xs">{qualification}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;