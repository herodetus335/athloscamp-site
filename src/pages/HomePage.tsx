import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Gallery from '../components/Gallery';
import AboutMe from '../components/AboutMe';
import About from '../components/About';
import Programs from '../components/Programs';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <>
      <Navigation />
      <div className="relative min-h-screen">
        {/* Global gradient and SVG pattern background */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-900 via-blue-600 to-orange-400 opacity-90" />
        <div className="fixed inset-0 -z-10 bg-[url('data:image/svg+xml;utf8,<svg width=\'100%\' height=\'100%\' xmlns=\'http://www.w3.org/2000/svg\'><circle cx=\'40\' cy=\'40\' r=\'30\' fill=\'%23ffffff11\'/><circle cx=\'140\' cy=\'120\' r=\'50\' fill=\'%23ffffff09\'/><rect x=\'200\' y=\'60\' width=\'80\' height=\'80\' rx=\'20\' fill=\'%23ffffff08\'/></svg>')] bg-repeat opacity-40" />
        <Hero />
        <Gallery />
        <AboutMe />
        <About />
        <Programs />
        <Contact />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;