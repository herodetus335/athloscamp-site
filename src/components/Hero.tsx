import React from 'react';
import { ChevronDown, Award, Users, Calendar } from 'lucide-react';

const Hero = () => {
  const scrollToGallery = () => {
    const element = document.querySelector('#gallery');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden hero">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/296301/pexels-photo-296301.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-orange-600/60" />
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-blue-900/80 via-blue-800/80 via-blue-700/60 via-blue-600/50 to-transparent" />
      
      <div className="relative z-10 text-white max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold text-center mb-6 leading-tight">
            5 Days to a Fitter, <span className="btn-orange">Happier</span> Kid
          </h1>
          <p className="w-full text-center mt-4 mb-6 text-base sm:text-xl md:text-2xl text-blue-100 leading-relaxed subhead">
            Hands-on activities help kids grow stronger, more coordinated, and proud of their own progress. We keep the focus on learning through play so that healthy habits feel natural—not forced.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 ctas">
            <button 
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Register Today - Save 10%!
            </button>
            <button 
              onClick={() => document.querySelector('#programs')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-900 transition-all duration-300 hover:scale-105"
            >
              Limited Spots Available
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto stats">
            <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 stat">
              <Calendar className="h-8 w-8 text-orange-400" />
              <div className="text-left">
                <div className="text-lg font-bold">Camp Dates</div>
                <div className="text-sm text-blue-200">July 21–25, 2025</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 stat">
              <Users className="h-8 w-8 text-orange-400" />
              <div className="text-left">
                <div className="text-lg font-bold">Age Groups</div>
                <div className="text-sm text-blue-200">Ages 6–10 | 11–13</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 stat">
              <Award className="h-8 w-8 text-orange-400" />
              <div className="text-left">
                <div className="text-lg font-bold">Capacity</div>
                <div className="text-sm text-blue-200">45 (3 Groups)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <button 
          onClick={scrollToGallery}
          className="text-white hover:text-orange-400 transition-colors duration-300 animate-bounce"
        >
          <ChevronDown className="h-8 w-8" />
        </button>
      </div>
    </section>
  );
};

export default Hero;