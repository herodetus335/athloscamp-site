import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Detect scroll past hero section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const hero = document.getElementById('home');
      if (hero) {
        const heroBottom = hero.getBoundingClientRect().bottom + window.scrollY;
        setPastHero(window.scrollY >= heroBottom - 80); // 80px buffer for nav height
      } else {
        setPastHero(window.scrollY > 400); // fallback
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home', isSection: true },
    { name: 'Gallery', href: '#gallery', isSection: true },
    { name: 'About', href: '#aboutme', isSection: true },
    { name: 'Programs', href: '#programs', isSection: true },
    { name: 'Contact', href: '#contact', isSection: true },
    { name: 'FAQ', href: '/faq', isSection: false },
  ];

  const scrollToSection = (href: string) => {
    if (isHomePage) {
      const element = document.querySelector(href);
      if (element) {
        if (href === '#programs') {
          // Position to align with arrow detection logic - header near top, cards partially visible
          const elementTop = (element as HTMLElement).offsetTop;
          const offsetPosition = elementTop - 50; // Position header 50px from top
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          // Dispatch event to show arrow after navigation
          setTimeout(() => {
            console.log('Navigation: Dispatching programsNavigated event');
            const event = new CustomEvent('programsNavigated');
            window.dispatchEvent(event);
          }, 500); // Delay to allow scroll to complete
        } else if (href === '#aboutme') {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (href === '#contact') {
          // Mobile-specific contact navigation with header visibility
          const isMobile = window.innerWidth < 768;
          if (isMobile) {
            const elementTop = (element as HTMLElement).offsetTop;
            const headerHeight = 64; // Navigation header height
            const extraSpace = 20; // Additional spacing
            const offsetPosition = elementTop - headerHeight - extraSpace;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          } else {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      // If not on home page, navigate to home page with hash
      window.location.href = `/${href}`;
    }
    setIsOpen(false);
  };

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.isSection) {
      scrollToSection(item.href);
    } else {
      setIsOpen(false);
    }
  };

  // Color logic
  const navBg = pastHero ? 'bg-[#FF6600] shadow-lg' : 'bg-blue-900/40 backdrop-blur-md';
  const navText = 'text-white hover:text-white';
  const logoText = pastHero ? 'text-white' : 'text-white';
  const logoIcon = pastHero ? 'text-white' : 'text-orange-400';
  const registerBtn = pastHero ? 'bg-[#2563eb] text-white' : 'bg-orange-500 text-white';
  const registerBtnHover = pastHero ? 'hover:bg-blue-700' : 'hover:bg-orange-600';

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={e => {
              e.preventDefault();
              if (isHomePage) {
                const el = document.querySelector('#home');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              } else {
                window.location.href = '/#home';
              }
            }}
            className="flex items-center space-x-3 focus:outline-none bg-transparent border-none p-0 m-0"
            style={{ background: 'none' }}
            aria-label="Go to hero section"
          >
            <Logo 
              textColor={logoText}
              iconColor={logoIcon}
              filterWhite={true}
            />
          </button>

          <div className="hidden md:block primary">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                item.isSection ? (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item)}
                    className={`px-3 py-2 text-sm font-medium transition-colors duration-200 hover:scale-105 ${navText}`}
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => handleNavClick(item)}
                    className={`px-3 py-2 text-sm font-medium transition-colors duration-200 hover:scale-105 ${navText}`}
                  >
                    {item.name}
                  </Link>
                )
              ))}
              <button 
                onClick={() => scrollToSection('#contact')}
                className={`${registerBtn} px-4 py-2 rounded-lg ${registerBtnHover} transition-colors duration-200 hover:scale-105 cta-register`}
              >
                Register Now
              </button>
            </div>
          </div>

          <div className="md:hidden hamburger">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 ${pastHero ? 'text-white' : (isScrolled || !isHomePage ? 'text-gray-900' : 'text-white')}`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className={`md:hidden ${pastHero ? 'bg-[#FF6600]' : 'bg-blue-900/40 backdrop-blur-md'} shadow-lg`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              item.isSection ? (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className={`block px-3 py-2 text-base font-medium w-full text-left ${pastHero ? 'text-white hover:text-white' : 'text-white hover:text-white'}`}
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => handleNavClick(item)}
                  className={`block px-3 py-2 text-base font-medium ${pastHero ? 'text-white hover:text-white' : 'text-white hover:text-white'}`}
                >
                  {item.name}
                </Link>
              )
            ))}
            <button 
              onClick={() => scrollToSection('#contact')}
              className={`block w-full text-left px-3 py-2 rounded-lg ${pastHero ? 'bg-[#2563eb] text-white hover:bg-blue-700' : 'bg-orange-500 text-white hover:bg-orange-600'} transition-colors duration-200`}
            >
              Register Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;