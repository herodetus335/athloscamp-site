import React, { useRef, useState } from 'react';
import { Star, Quote, ExternalLink, X, ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollIndex, setScrollIndex] = useState(0);

  // Responsive: 4 on mobile (2x2), 6 on desktop
  const getVisibleCount = () => {
    if (window.innerWidth < 640) return 4;
    return 6;
  };

  const [visibleCount, setVisibleCount] = useState(getVisibleCount());

  React.useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const photos = [
    { src: "/DSC_4641.jpg", alt: "Kids running and being active" },
    { src: "/DSC_4646.jpg", alt: "Young athlete celebrating success" },
    { src: "/DSC_4708.jpg", alt: "Children playing sports together" },
    { src: "/children-2440228_1280.jpg", alt: "Children playing and having fun" },
    { src: "/pexels-andreevaleksandar-25748904.jpg", alt: "Children with colored flag and balls" },
    { src: "/tug-of-war-2665148.jpg", alt: "Kids playing tug of war game" },
    { src: "/pexels-rdne-8035133.jpg", alt: "Soccer kids in red t-shirts playing team sports" },
    { src: "/pexels-rdne-8033860.jpg", alt: "Colored kids with flag and balls in the middle" },
    { src: "/pexels-rdne-8033870.jpg", alt: "Girl jumping over the rope" },
    { src: "/pexels-kampus-8954827.jpg", alt: "Kids next to cones exercising and staying active" },
    { src: "/pexels-karolina-grabowska-4966379.jpg", alt: "Children participating in fitness activities" }
  ];

  const maxIndex = Math.max(0, photos.length - visibleCount);

  // Scroll by visibleCount images
  const scrollBy = (dir: number) => {
    setScrollIndex((prev) => {
      let next = prev + dir * visibleCount;
      if (next < 0) next = 0;
      if (next > maxIndex) next = maxIndex;
      return next;
    });
  };

  // Touch/swipe support
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      if (delta > 0) scrollBy(-1);
      else scrollBy(1);
    }
    touchStartX.current = null;
  };

  // Lazy load: only render visible + 2 before/after
  const renderPhotos = photos.map((photo, i) => {
    // Desktop lazy loading logic only
    if (i < scrollIndex - 2 || i > scrollIndex + visibleCount + 1) return null;
    return (
      <div
        key={i}
        className="carousel-thumb cursor-pointer flex-shrink-0"
        style={{ 
          width: `calc(100%/${visibleCount} - 12px)`, 
          height: 320, 
          marginRight: 12, 
          borderRadius: 0, 
          boxShadow: 'none', 
          overflow: 'hidden' 
        }}
        onClick={() => setSelectedImage(photo)}
      >
        <img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300"
          style={{ display: 'block', borderRadius: 0 }}
        />
      </div>
    );
  });

  return (
    <section id="gallery" className="py-28 relative" style={{ background: 'none', boxShadow: 'none' }}>
      {/* Blue gradient fade at top of gallery */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-blue-900/80 via-blue-800/80 via-blue-700/60 via-blue-600/50 to-transparent z-10" />
      
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">Gallery</h2>
        </div>

        {/* Mobile 2x2 Carousel Layout */}
        <div className="md:hidden">
          <div className="w-full h-64 relative flex items-center justify-center" style={{background: '#eee'}}>
            <button 
              onClick={() => setScrollIndex(Math.max(0, scrollIndex - 1))}
              disabled={scrollIndex === 0}
              className="absolute left-0 z-10 bg-white/80 p-2 hover:bg-orange-100 border border-gray-300 disabled:opacity-40" 
              style={{ borderRadius: 0, top: '50%', transform: 'translateY(-50%)' }} 
              aria-label="Previous"
            >
              <svg width="32" height="32" fill="none" stroke="#FF6600" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
            </button>
            
            {/* 2x2 Grid Container */}
            <div className="grid grid-cols-2 gap-1 w-full h-full">
              {photos.slice(scrollIndex * 4, (scrollIndex + 1) * 4).map((photo, i) => (
                <div
                  key={scrollIndex * 4 + i}
                  className="cursor-pointer overflow-hidden p-1"
                  onClick={() => setSelectedImage(photo)}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    className="object-cover w-full h-full"
                    style={{borderRadius: 0, boxShadow: 'none'}}
                  />
                </div>
              ))}
              {/* Fill empty spaces in the last deck */}
              {scrollIndex === 2 && Array.from({length: 4 - (photos.length % 4)}).map((_, i) => (
                <div key={`empty-${i}`} className="bg-gray-100 flex items-center justify-center p-1">
                  <span className="text-gray-400 text-sm">More photos coming soon!</span>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => setScrollIndex(Math.min(2, scrollIndex + 1))}
              disabled={scrollIndex >= 2}
              className="absolute right-0 z-10 bg-white/80 p-2 hover:bg-orange-100 border border-gray-300 disabled:opacity-40" 
              style={{ borderRadius: 0, top: '50%', transform: 'translateY(-50%)' }} 
              aria-label="Next"
            >
              <svg width="32" height="32" fill="none" stroke="#FF6600" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>

        {/* Desktop Carousel Layout */}
        <div className="hidden md:block">
          {/* Carousel Controls */}
          <div className="relative flex items-center gallery" style={{background: 'none', borderRadius: 0, boxShadow: 'none', padding: 0}}>
            <button
              className="absolute left-0 z-10 bg-white/80 p-2 hover:bg-orange-100 disabled:opacity-40 border border-gray-300"
              style={{ borderRadius: 0, top: '50%', transform: 'translateY(-50%)' }}
              onClick={() => scrollBy(-1)}
              disabled={scrollIndex === 0}
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-8 w-8 text-orange-500" />
            </button>
            <div
              className="flex overflow-hidden w-full"
              ref={carouselRef}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              style={{ height: 320 }}
            >
              <div
                className="flex transition-transform duration-300"
                style={{
                  transform: `translateX(-${scrollIndex * (100 / visibleCount + 1.2)}%)`,
                  width: `${(photos.length * 100) / visibleCount}%`,
                }}
              >
                {renderPhotos}
              </div>
            </div>
            <button
              className="absolute right-0 z-10 bg-white/80 p-2 hover:bg-orange-100 disabled:opacity-40 border border-gray-300"
              style={{ borderRadius: 0, top: '50%', transform: 'translateY(-50%)' }}
              onClick={() => scrollBy(1)}
              disabled={scrollIndex >= maxIndex}
              aria-label="Scroll right"
            >
              <ChevronRight className="h-8 w-8 text-orange-500" />
            </button>
          </div>
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200 z-10"
              >
                <X className="h-8 w-8" />
              </button>
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-full object-contain rounded-none"
                onClick={e => e.stopPropagation()}
              />
            </div>
          </div>
        )}

        {/* Testimonial - now over the same background, no card */}
        <div className="mt-16 max-w-3xl mx-auto border-t border-gray-200 pt-8 testimonial" style={{background: 'none', borderRadius: 0, boxShadow: 'none'}}>
          <div className="flex items-center space-x-3 mb-3">
            <Quote className="h-5 w-5 text-orange-500" />
            <div className="flex stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
              ))}
            </div>
          </div>
          <p className="text-white leading-relaxed mb-3 italic quote" style={{fontSize: '1.1rem'}}>
            "I've been training with Mike for the past four months, and the results have been nothing short of amazing! From day one, his energy and motivation were contagious. Every session feels like a new challenge -- in the best way possible -- and he somehow always knows exactly how to push me beyond my limits without ever making it overwhelming."
          </p>
          <div className="text-sm text-white">
            <strong>Hassan A.</strong> - Satisfied Client
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;