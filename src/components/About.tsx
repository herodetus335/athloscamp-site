import React, { useState } from 'react';
import { Search, Handshake, Building, Shield, Star } from 'lucide-react';

const locationImages = [
  { src: "/pavilion.jpg", alt: "Pavilion at Potomac Green Neighborhood Park" },
  { src: "/field-purple-circles.jpg", alt: "Aerial field with purple circles" },
  { src: "/eastgate-park-sign.jpg", alt: "Eastgate Park sign and playground" },
  { src: "/field-parking-lot.jpg", alt: "Aerial field and parking lot" },
];

const LocationCarousel = () => {
  const [index, setIndex] = useState(0);
  const prev = () => setIndex(i => (i === 0 ? locationImages.length - 1 : i - 1));
  const next = () => setIndex(i => (i === locationImages.length - 1 ? 0 : i + 1));
  return (
    <div className="relative flex items-center justify-center mb-8" style={{height: 320}}>
      <button onClick={prev} className="absolute left-0 z-10 bg-white/80 p-2 hover:bg-orange-100 border border-gray-300" style={{ borderRadius: 0, top: '50%', transform: 'translateY(-50%)' }} aria-label="Previous">
        <svg width="32" height="32" fill="none" stroke="#FF6600" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
      </button>
      <img src={locationImages[index].src} alt={locationImages[index].alt} className="object-cover w-full max-w-3xl h-80 mx-auto" style={{borderRadius: 0, boxShadow: 'none'}} />
      <button onClick={next} className="absolute right-0 z-10 bg-white/80 p-2 hover:bg-orange-100 border border-gray-300" style={{ borderRadius: 0, top: '50%', transform: 'translateY(-50%)' }} aria-label="Next">
        <svg width="32" height="32" fill="none" stroke="#FF6600" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
      </button>
    </div>
  );
};

const locationCardImages = [
  { src: "/Pavilion 2 Potomac Green.jpg", alt: "Pavilion 2 Potomac Green" },
  { src: "/sittingareapg.jpg", alt: "Pavilion Sitting Area" },
  { src: "/pgonmap1.jpg", alt: "Potomac Green on Map" },
  { src: "/pgsign.jpg", alt: "Potomac Green Park Sign" },
];

const LocationCardCarousel = () => {
  const [index, setIndex] = useState(0);
  const [enlarged, setEnlarged] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  const prev = () => setIndex(i => (i === 0 ? locationCardImages.length - 1 : i - 1));
  const next = () => setIndex(i => (i === locationCardImages.length - 1 ? 0 : i + 1));
  const img = locationCardImages[index];
  
  return (
    <div className="md:w-1/2 w-full h-64 md:h-auto relative" style={{background: '#eee'}}>
      {/* Main image container */}
      <div className="relative w-full h-full md:h-auto flex items-center justify-center">
        {/* Subtle edge indicators - mobile only */}
        <div className="md:hidden">
          {index > 0 && (
            <div className="absolute left-1 top-1/2 transform -translate-y-1/2 z-20 bg-gradient-to-r from-black/30 to-transparent w-6 h-12 rounded-r-lg flex items-center justify-start pl-1">
              <div className="w-1 h-6 bg-white/80 rounded-full"></div>
            </div>
          )}
          {index < locationCardImages.length - 1 && (
            <div className="absolute right-1 top-1/2 transform -translate-y-1/2 z-20 bg-gradient-to-l from-black/30 to-transparent w-6 h-12 rounded-l-lg flex items-center justify-end pr-1">
              <div className="w-1 h-6 bg-white/80 rounded-full"></div>
            </div>
          )}
        </div>

        {/* Desktop arrows - hidden on mobile */}
        <button onClick={prev} className="hidden md:block absolute left-0 z-10 bg-white/80 p-2 hover:bg-orange-100 border border-gray-300" style={{ borderRadius: 0, top: '50%', transform: 'translateY(-50%)' }} aria-label="Previous">
          <svg width="32" height="32" fill="none" stroke="#FF6600" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
        </button>
        
        {/* Touch-enabled image container */}
        <div 
          className="w-full h-full md:touch-pan-y touch-pan-x"
          onTouchStart={(e) => {
            if (window.innerWidth < 768) {
              const touch = e.touches[0];
              setTouchStart(touch.clientX);
            }
          }}
          onTouchMove={(e) => {
            if (window.innerWidth < 768 && touchStart) {
              const touch = e.touches[0];
              setTouchEnd(touch.clientX);
            }
          }}
          onTouchEnd={() => {
            if (window.innerWidth < 768 && touchStart && touchEnd) {
              const distance = touchStart - touchEnd;
              const isSignificantSwipe = Math.abs(distance) > 50;
              
              if (isSignificantSwipe) {
                if (distance > 0) {
                  // Swiped left - go to next
                  next();
                } else {
                  // Swiped right - go to previous  
                  prev();
                }
              }
              setTouchStart(null);
              setTouchEnd(null);
            }
          }}
        >
          {/* On mobile, make image clickable to enlarge */}
          <img 
            src={img.src} 
            alt={img.alt} 
            className="object-cover w-full h-full md:cursor-default cursor-pointer" 
            style={{borderRadius: 0, boxShadow: 'none'}} 
            onClick={() => {
              if (window.innerWidth < 768) setEnlarged(true);
            }}
          />
        </div>

        <button onClick={next} className="hidden md:block absolute right-0 z-10 bg-white/80 p-2 hover:bg-orange-100 border border-gray-300" style={{ borderRadius: 0, top: '50%', transform: 'translateY(-50%)' }} aria-label="Next">
          <svg width="32" height="32" fill="none" stroke="#FF6600" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>

      {/* Mobile dot indicators - positioned absolutely */}
      <div className="md:hidden absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
        {locationCardImages.map((_, imgIndex) => (
          <button
            key={imgIndex}
            onClick={() => setIndex(imgIndex)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              imgIndex === index 
                ? 'bg-orange-400 w-6' 
                : 'bg-white/70 hover:bg-white/90'
            }`}
            aria-label={`Go to image ${imgIndex + 1}`}
          />
        ))}
      </div>

      {/* Modal for enlarged image on mobile */}
      {enlarged && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center md:hidden" onClick={() => setEnlarged(false)}>
          <div className="relative max-w-full max-h-full flex items-center justify-center" onClick={e => e.stopPropagation()}>
            <button onClick={() => setEnlarged(false)} className="absolute top-2 right-2 text-white bg-black bg-opacity-40 rounded-full p-2 z-10">
              <svg width="32" height="32" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            <img src={img.src} alt={img.alt} className="max-w-[90vw] max-h-[80vh] rounded-xl shadow-lg" />
          </div>
        </div>
      )}
    </div>
  );
};

const About = () => {
  const benefits = [
    {
      icon: Search,
      title: "Foundations First",
      description: "Each day introduces a new core movement skill with targeted drills that build progressively."
    },
    {
      icon: Building,
      title: "Structured Daily Format",
      description: "Three cycles daily: energizing games → healthy snack break → focused skill work."
    },
    {
      icon: Handshake,
      title: "Personalized Coaching",
      description: "Small groups ensure one-on-one feedback and goal-setting for individual growth."
    },
    {
      icon: Shield,
      title: "Expert Safety Oversight",
      description: "Certified trainers lead every activity with chaperone support during breaks."
    },
    {
      icon: Star,
      title: "Leadership & Camaraderie",
      description: "Collaborative quests build leadership skills and lasting peer networks."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === benefits.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? benefits.length - 1 : prevIndex - 1
    );
  };

  return (
    <section id="about" className="pt-16 md:pt-24 pb-12 md:pb-20 relative overflow-hidden">
      {/* Cool background gradient and pattern (now handled globally) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Header */}
        <div className="hidden md:block text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            Why Choose Athlos Camp?
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed drop-shadow">
            Expert coaching, proven methodology, and personalized attention in a safe, supportive environment that creates lasting results.
          </p>
        </div>

        {/* Mobile Header */}
        <div className="text-center mb-16 md:hidden">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            Why Choose Athlos Fitness Camp?
          </h2>
          <div className="flex justify-center">
                         <p className="text-xl text-blue-100 max-w-3xl leading-relaxed drop-shadow text-center">
               Expert coaching, proven methodology, and personalized attention in a safe, supportive environment that creates lasting results.
             </p>
          </div>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative">
          {/* Subtle edge indicators */}
          {currentIndex > 0 && (
            <div className="absolute left-1 top-1/2 transform -translate-y-1/2 z-20 bg-gradient-to-r from-black/20 to-transparent w-8 h-16 rounded-r-lg flex items-center justify-start pl-1">
              <div className="w-1 h-8 bg-white/60 rounded-full"></div>
            </div>
          )}
          {currentIndex < benefits.length - 1 && (
            <div className="absolute right-1 top-1/2 transform -translate-y-1/2 z-20 bg-gradient-to-l from-black/20 to-transparent w-8 h-16 rounded-l-lg flex items-center justify-end pr-1">
              <div className="w-1 h-8 bg-white/60 rounded-full"></div>
            </div>
          )}
          
          {/* Touch-enabled carousel container */}
          <div 
            className="overflow-hidden touch-pan-x"
            onTouchStart={(e) => {
              const touch = e.touches[0];
              setTouchStart(touch.clientX);
            }}
            onTouchMove={(e) => {
              if (!touchStart) return;
              const touch = e.touches[0];
              setTouchEnd(touch.clientX);
            }}
            onTouchEnd={() => {
              if (!touchStart || !touchEnd) return;
              const distance = touchStart - touchEnd;
              const isSignificantSwipe = Math.abs(distance) > 50;
              
              if (isSignificantSwipe) {
                if (distance > 0) {
                  // Swiped left - go to next
                  nextSlide();
                } else {
                  // Swiped right - go to previous  
                  prevSlide();
                }
              }
              setTouchStart(null);
              setTouchEnd(null);
            }}
          >
            <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {benefits.map((benefit, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-gradient-to-br from-blue-50 to-orange-50 p-6 rounded-xl shadow-lg border border-blue-100">
                    <div className="flex items-start space-x-4">
                      <div className="bg-gradient-to-r from-blue-500 to-orange-500 p-3 rounded-lg">
                        <benefit.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                        <p className="text-gray-600 leading-relaxed text-sm">{benefit.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Dot indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {benefits.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex 
                    ? 'bg-orange-400 w-6' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="flex justify-center space-x-8 mb-8">
            {benefits.slice(0, 3).map((benefit, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-blue-50 to-orange-50 p-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 border border-blue-100 h-full w-full max-w-md"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-blue-500 to-orange-500 p-3 rounded-lg">
                    <benefit.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom two items centered */}
          <div className="flex justify-center space-x-8">
            {benefits.slice(3, 5).map((benefit, index) => (
              <div 
                key={index + 3}
                className="bg-gradient-to-br from-blue-50 to-orange-50 p-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 border border-blue-100 h-full w-full max-w-md"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-blue-500 to-orange-500 p-3 rounded-lg">
                    <benefit.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Location Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-0 pt-20 md:pt-32 pb-6">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-6 mt-4 md:mt-0">Camp Location</h2>
        <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Left: Pavilion Image Carousel */}
          <LocationCardCarousel />
          {/* Right: Location and Capacity */}
          <div className="md:w-1/2 w-full flex flex-col justify-center p-8 bg-gradient-to-br from-blue-50 to-orange-50">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Potomac Green Neighborhood Park</h3>
              <p className="text-lg text-gray-700 mb-2">20750 Marblehead Dr, Ashburn, VA 20147</p>
              <p className="text-md text-gray-600">Sheltered Pavilion • Restrooms • Ample Parking</p>
            </div>
            <div className="flex items-center space-x-3 mt-4">
              <span className="inline-block bg-orange-500 text-white rounded-full px-4 py-2 text-sm font-semibold">Capacity: 60+ people</span>
            </div>
          </div>
        </div>
      </section>

      {/* End Location Section */}

      {/* Reduce padding above Our Offerings */}
     
    </section>
  );
};

export default About;