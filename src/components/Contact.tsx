import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Star, Calendar, Users2, DollarSign } from 'lucide-react';
import emailjs from 'emailjs-com';
import axios from 'axios';

const airtableToken = 'patZlSlrhYl6q2k58.a78d54da99d86b7b57f0c429c0f1b2f2b8f9c97d56cde432e8704a858113e324';

const Contact = () => {
  const [formData, setFormData] = useState({
    parentName: '',
    childName: '',
    email: '',
    phone: '',
    childAge: '',
    program: '',
    blocks: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Listen for program selection from other components
  useEffect(() => {
    const handleProgramSelection = (event: CustomEvent) => {
      setFormData(prev => ({
        ...prev,
        program: event.detail.program
      }));
    };

    window.addEventListener('selectProgram', handleProgramSelection as EventListener);
    
    return () => {
      window.removeEventListener('selectProgram', handleProgramSelection as EventListener);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("handleSubmit called");
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Send email notification
      await emailjs.send(
        'service_cx4h752', // Your EmailJS service ID
        'template_kcdqpoy', // Your EmailJS template ID
        {
          to_email: 'athlosfitnesscamp@gmail.com',
          parentName: formData.parentName,
          childName: formData.childName,
          email: formData.email,
          phone: formData.phone,
          childAge: formData.childAge,
          program: formData.program,
          blocks: formData.blocks,
          message: formData.message,
          timestamp: new Date().toLocaleString()
        },
        'o5dNBYhlD9FTjUhVc' // Your EmailJS user ID
      );

      console.log("Submitting to Airtable...", formData);

      // Send to Airtable
      await axios.post(
        'https://api.airtable.com/v0/appnqfRTCvJj7RNLo/Table%201',
        {
          fields: {
            "Parent Name": formData.parentName,
            "Child Name": formData.childName,
            "Email": formData.email,
            "Phone": formData.phone,
            "Child Age": formData.childAge,
            "Program": formData.program,
            "Blocks": formData.blocks,
            "Message": formData.message,
            "Timestamp": new Date().toLocaleString()
          }
        },
        {
          headers: {
            Authorization: `Bearer ${airtableToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setSubmitStatus('success');
      setFormData({
        parentName: '',
        childName: '',
        email: '',
        phone: '',
        childAge: '',
        program: '',
        blocks: '',
        message: ''
      });
    } catch (error: any) {
      console.error('Submission error:', error.response?.data || error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="pt-4 sm:pt-12 pb-20 sm:py-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 drop-shadow-lg">
            Ready to Get Started?
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-12">
          <div className="lg:col-span-2 bg-white/80 rounded-lg sm:rounded-xl p-2 sm:p-6 lg:p-8 mb-8 sm:mb-24">
            <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-6">Registration Form</h3>
            <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-6 form">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
                <div>
                  <label htmlFor="parentName" className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5 sm:mb-2">
                    Parent/Guardian Name *
                  </label>
                  <input
                    type="text"
                    id="parentName"
                    name="parentName"
                    required
                    value={formData.parentName}
                    onChange={handleChange}
                    className="w-full px-2 py-2 sm:px-4 sm:py-4 border border-gray-300 rounded-md sm:rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label htmlFor="childName" className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5 sm:mb-2">
                    Child's Name *
                  </label>
                  <input
                    type="text"
                    id="childName"
                    name="childName"
                    required
                    value={formData.childName}
                    onChange={handleChange}
                    className="w-full px-2 py-2 sm:px-4 sm:py-4 border border-gray-300 rounded-md sm:rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5 sm:mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-2 py-2 sm:px-4 sm:py-4 border border-gray-300 rounded-md sm:rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5 sm:mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-2 py-2 sm:px-4 sm:py-4 border border-gray-300 rounded-md sm:rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-2 gap-2 sm:gap-4">
                <div>
                  <label htmlFor="childAge" className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5 sm:mb-2">
                    Child's Age *
                  </label>
                  <select
                    id="childAge"
                    name="childAge"
                    required
                    value={formData.childAge}
                    onChange={handleChange}
                    className="w-full px-2 py-2 sm:px-4 sm:py-4 border border-gray-300 rounded-md sm:rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-xs sm:text-base"
                  >
                    <option value="">Age</option>
                    {[...Array(8)].map((_, i) => (
                      <option key={i} value={i + 6}>{i + 6} yrs</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="program" className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5 sm:mb-2">
                    Preferred Program *
                  </label>
                  <select
                    id="program"
                    name="program"
                    required
                    value={formData.program}
                    onChange={handleChange}
                    className="w-full px-2 py-2 sm:px-4 sm:py-4 border border-gray-300 rounded-md sm:rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-xs sm:text-base"
                  >
                    <option value="">Select Program</option>
                    <option value="half-day">Half-Day Experience (9 AM–1 PM, $225)</option>
                    <option value="full-day">Full-Day Experience (9 AM–5 PM, $315)</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="blocks" className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5 sm:mb-2">
                  Camp Block Selection *
                </label>
                <select
                  id="blocks"
                  name="blocks"
                  required
                  value={formData.blocks}
                  onChange={handleChange}
                  className="w-full px-2 py-2 sm:px-4 sm:py-4 border border-gray-300 rounded-md sm:rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-xs sm:text-base"
                >
                  <option value="">Select Camp Block(s)</option>
                  <option value="block-1">Block 1 Only (July 21-25, 2025)</option>
                  <option value="block-2">Block 2 Only (July 28 - Aug 01, 2025)</option>
                  <option value="block-3">Block 3 Only (Aug 04-08, 2025)</option>
                  <option value="all-blocks">All 3 Blocks (July 21 - Aug 08, 2025)</option>
                </select>
                <p className="text-xs text-gray-500 mt-0.5 sm:mt-1 hidden sm:block">
                  Choose individual blocks or save with all three!
                </p>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5 sm:mb-2">
                  Additional Questions or Comments
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={2}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-2 py-2 sm:px-4 sm:py-4 border border-gray-300 rounded-md sm:rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-xs sm:text-base resize-none"
                  placeholder="Tell us about your child's interests, experience level, or any special needs..."
                />
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-md sm:rounded-lg p-2 sm:p-4">
                <div className="flex items-center space-x-1 sm:space-x-2 mb-0.5 sm:mb-2">
                  <span className="text-orange-600 font-semibold text-xs sm:text-base">🎉 Early Bird Discount Available!</span>
                </div>
                <p className="text-xs sm:text-sm text-orange-800 leading-tight">
                  Register by July 14th and save 10% on your selected program. Discount will be applied automatically.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2.5 sm:py-4 px-4 sm:px-6 rounded-md sm:rounded-lg text-sm sm:text-lg font-semibold transition-all duration-200 hover:scale-105 ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-orange-500 hover:bg-orange-600 text-white'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Registration'}
              </button>

              {submitStatus === 'success' && (
                <div className="p-2 sm:p-4 bg-green-50 border border-green-200 rounded-md sm:rounded-lg">
                  <p className="text-green-800 font-medium text-xs sm:text-base">Registration submitted successfully! We'll contact you within 24 hours.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-2 sm:p-4 bg-red-50 border border-red-200 rounded-md sm:rounded-lg">
                  <p className="text-red-800 font-medium text-xs sm:text-base">There was an error submitting your registration. Please try again or contact us directly.</p>
                </div>
              )}
            </form>
          </div>

          <div className="space-y-1 sm:space-y-8 info">
            <div className="bg-white/80 rounded-xl pt-2 pb-4 px-4 sm:p-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Contact Information</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Phone</h4>
                    <a href="tel:703-865-1675" className="text-gray-600 text-sm sm:text-base hover:text-orange-500 transition-colors duration-200">
                      703-865-1675
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Email</h4>
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
                      className="text-gray-600 text-sm sm:text-base hover:text-orange-500 transition-colors duration-200"
                    >
                      athlosfitnesscamp@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Office Hours</h4>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Monday - Friday: 8:00 AM - 6:00 PM<br />
                      Saturday: 9:00 AM - 3:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;