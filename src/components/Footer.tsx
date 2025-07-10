import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-6">
              <Logo 
                textColor="text-white" 
                iconColor="text-orange-500"
                className="h-12 w-12"
                filterWhite={true}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 hover:text-orange-500 transition-colors duration-200">Home</a></li>
              <li><a href="#gallery" className="text-gray-300 hover:text-orange-500 transition-colors duration-200">Gallery</a></li>
              <li>
                <a 
                  href="#aboutme" 
                  className="text-gray-300 hover:text-orange-500 transition-colors duration-200"
                  onClick={e => {
                    e.preventDefault();
                    const el = document.querySelector('#aboutme');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="#programs" 
                  className="text-gray-300 hover:text-orange-500 transition-colors duration-200"
                  onClick={e => {
                    e.preventDefault();
                    const el = document.querySelector('#programs');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                >
                  Programs
                </a>
              </li>
              <li><a href="#contact" className="text-gray-300 hover:text-orange-500 transition-colors duration-200">Contact</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-orange-500 transition-colors duration-200">Registration</a></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-orange-500 transition-colors duration-200">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li><a href="tel:703-865-1675" className="text-gray-300 hover:text-orange-500 transition-colors duration-200">703-865-1675</a></li>
              <li>
                <a 
                  href="mailto:athlosfitnesscamp@gmail.com"
                  onClick={(e) => {
                    const email = 'athlosfitnesscamp@gmail.com';
                    
                    // Copy to clipboard with fallback methods
                    const copyToClipboard = async (text: string) => {
                      try {
                        // Method 1: Modern clipboard API
                        if (navigator.clipboard && navigator.clipboard.writeText) {
                          await navigator.clipboard.writeText(text);
                          return true;
                        }
                        
                        // Method 2: Fallback using textarea
                        const textarea = document.createElement('textarea');
                        textarea.value = text;
                        textarea.style.position = 'fixed';
                        textarea.style.opacity = '0';
                        document.body.appendChild(textarea);
                        textarea.select();
                        document.execCommand('copy');
                        document.body.removeChild(textarea);
                        return true;
                      } catch (err) {
                        console.error('Failed to copy:', err);
                        return false;
                      }
                    };
                    
                    copyToClipboard(email).then(success => {
                      if (success) {
                        // Show temporary notification
                        const notification = document.createElement('div');
                        notification.textContent = 'Email copied to clipboard!';
                        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-opacity duration-300';
                        document.body.appendChild(notification);
                        setTimeout(() => {
                          notification.style.opacity = '0';
                          setTimeout(() => notification.remove(), 300);
                        }, 2000);
                      }
                    });
                  }}
                  className="text-gray-300 hover:text-orange-500 transition-colors duration-200"
                >
                  athlosfitnesscamp@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex justify-center items-center">
            <p className="text-gray-300 text-sm">
              © 2025 Athlos Fitness Camp. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;