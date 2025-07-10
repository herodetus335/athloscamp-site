import React from 'react';
import { ChevronDown, Award, Users, Calendar } from 'lucide-react';

const Hero = () => {
  const scrollToGallery = () => {
    const element = document.querySelector('#gallery');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToOfferings = () => {
    const element = document.querySelector('#programs') as HTMLElement;
    if (element) {
      // Position to align with arrow detection logic - header near top, cards partially visible
      const elementTop = element.offsetTop;
      const offsetPosition = elementTop - 50; // Position header 50px from top
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Dispatch event to show arrow after navigation
      setTimeout(() => {
        console.log('Hero: Dispatching programsNavigated event');
        const event = new CustomEvent('programsNavigated');
        window.dispatchEvent(event);
      }, 500); // Delay to allow scroll to complete
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
      
      <div className="absolute bottom-0 left-0 right-0 h-20 md:h-24 bg-gradient-to-t from-blue-900/60 via-blue-800/40 via-blue-700/25 to-transparent" />
      
      <div className="relative z-10 text-white max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-20">
        <div className="animate-fade-in-up text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-center mb-6 leading-tight">
            5 Days to a Fitter, <span className="btn-orange">Happier</span> Kid
          </h1>
          <p className="w-full text-center mt-4 mb-6 text-base sm:text-xl md:text-2xl text-blue-100 leading-relaxed subhead">
            Transform your child's relationship with fitness. From building physical strength to boosting self-confidence, we create the foundation for a lifetime of healthy choices.
          </p>

          {/* Cards for all screen sizes - above CTAs - COMPACT MOBILE LIKE REFERENCE */}
          <div className="!mb-12 sm:!mb-8 !mt-6 sm:!mt-4">
            <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-3 max-w-md sm:max-w-3xl lg:max-w-2xl mx-auto px-4 sm:px-4 lg:px-0 stats-mobile">
            <div 
              onClick={scrollToOfferings}
              className="flex flex-col items-center justify-center bg-white/15 backdrop-blur-[8px] rounded-lg sm:rounded-lg p-2 sm:p-2 lg:p-3 stat w-full text-center hover:scale-105 transition-transform duration-300 cursor-pointer">
              <div className="flex items-center justify-center mb-2 sm:mb-2">
                <span className="bg-orange-200/60 p-1.5 sm:p-2 lg:p-2 rounded-full flex items-center justify-center shadow-inner">
                  <Calendar className="h-4 w-4 sm:h-4 sm:w-4 lg:h-4 lg:w-4 text-orange-500" strokeWidth={2.5} />
                </span>
              </div>
              <div className="w-full">
                <div className="text-xs sm:text-xs lg:text-base font-bold text-orange-100">3 BLOCKS</div>
                <div className="w-4 sm:w-5 lg:w-6 mx-auto border-b border-orange-100/60 my-1 sm:my-1" />
                <div className="text-xs sm:text-xs lg:text-sm text-white font-semibold sm:font-semibold leading-tight">Choose Your Dates</div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center bg-white/15 backdrop-blur-[8px] rounded-lg sm:rounded-lg p-2 sm:p-2 lg:p-3 stat w-full text-center hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-center mb-2 sm:mb-2">
                <span className="bg-orange-200/60 p-1.5 sm:p-2 lg:p-2 rounded-full flex items-center justify-center shadow-inner">
                  <Award className="h-4 w-4 sm:h-4 sm:w-4 lg:h-4 lg:w-4 text-orange-500" strokeWidth={2.5} />
                </span>
              </div>
              <div className="w-full">
                <div className="text-xs sm:text-xs lg:text-base font-bold text-orange-100">5 DAYS</div>
                <div className="w-4 sm:w-5 lg:w-6 mx-auto border-b border-orange-100/60 my-1 sm:my-1" />
                <div className="text-xs sm:text-xs lg:text-sm text-white font-semibold sm:font-semibold leading-tight">Per Block</div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center bg-white/15 backdrop-blur-[8px] rounded-lg sm:rounded-lg p-2 sm:p-2 lg:p-3 stat w-full text-center hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-center mb-2 sm:mb-2">
                <span className="bg-orange-200/60 p-1.5 sm:p-2 lg:p-2 rounded-full flex items-center justify-center shadow-inner">
                  <Users className="h-4 w-4 sm:h-4 sm:w-4 lg:h-4 lg:w-4 text-orange-500" strokeWidth={2.5} />
                </span>
              </div>
              <div className="w-full">
                <div className="text-xs sm:text-xs lg:text-base font-bold text-orange-100">9:00AM - 1:00/5:00PM</div>
                <div className="w-4 sm:w-5 lg:w-6 mx-auto border-b border-orange-100/60 my-1 sm:my-1" />
                <div className="text-xs sm:text-xs lg:text-sm text-white font-semibold sm:font-semibold leading-tight">Flexible Options</div>
              </div>
            </div>
          </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 ctas">
            <button 
              onClick={() => {
                const element = document.querySelector('#contact');
                if (element) {
                  const isMobile = window.innerWidth < 768;
                  if (isMobile) {
                    const elementTop = (element as HTMLElement).offsetTop;
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
              }}
              className="bg-orange-500 text-white px-8 py-4 lg:px-10 lg:py-5 rounded-lg text-lg lg:text-xl font-semibold hover:bg-orange-600 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Register Today - Save 10%!
            </button>
            <button 
              className="border-2 border-white text-white px-8 py-4 lg:px-10 lg:py-5 rounded-lg text-lg lg:text-xl font-semibold hover:bg-white hover:text-blue-900 transition-all duration-300 hover:scale-105"
            >
              Limited Spots Available
            </button>
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