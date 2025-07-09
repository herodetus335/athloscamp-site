import React, { useState } from 'react';
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
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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
          parent_name: formData.parentName,
          child_name: formData.childName,
          email: formData.email,
          phone: formData.phone,
          child_age: formData.childAge,
          program: formData.program,
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
    <section id="contact" className="pt-12 pb-20 sm:py-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 drop-shadow-lg">
            Ready to Get Started?
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-12">
          <div className="lg:col-span-2 bg-white/80 rounded-xl p-4 sm:p-6 lg:p-8 mb-24">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Registration Form</h3>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 form">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-4">
                <div>
                  <label htmlFor="parentName" className="block text-sm font-medium text-gray-700 mb-2">
                    Parent/Guardian Name *
                  </label>
                  <input
                    type="text"
                    id="parentName"
                    name="parentName"
                    required
                    value={formData.parentName}
                    onChange={handleChange}
                    className="w-full px-4 py-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base"
                  />
                </div>
                <div>
                  <label htmlFor="childName" className="block text-sm font-medium text-gray-700 mb-2">
                    Child's Name *
                  </label>
                  <input
                    type="text"
                    id="childName"
                    name="childName"
                    required
                    value={formData.childName}
                    onChange={handleChange}
                    className="w-full px-4 py-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-4">
                <div>
                  <label htmlFor="childAge" className="block text-sm font-medium text-gray-700 mb-2">
                    Child's Age *
                  </label>
                  <select
                    id="childAge"
                    name="childAge"
                    required
                    value={formData.childAge}
                    onChange={handleChange}
                    className="w-full px-4 py-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base"
                  >
                    <option value="">Select Age</option>
                    {[...Array(8)].map((_, i) => (
                      <option key={i} value={i + 6}>{i + 6} years old</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="program" className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Program *
                  </label>
                  <select
                    id="program"
                    name="program"
                    required
                    value={formData.program}
                    onChange={handleChange}
                    className="w-full px-4 py-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base"
                  >
                    <option value="">Select Program</option>
                    <option value="half-day">Half-Day Experience (9 AM–1 PM, $250)</option>
                    <option value="full-day">Full-Day Experience (9 AM–5 PM, $350)</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Questions or Comments
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base"
                  placeholder="Tell us about your child's interests, experience level, or any special needs..."
                />
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-orange-600 font-semibold">🎉 Early Bird Discount Available!</span>
                </div>
                <p className="text-sm text-orange-800">
                  Register by July 14th and save 10% on your selected program. Discount will be applied automatically.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-lg text-lg font-semibold transition-all duration-200 hover:scale-105 ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-orange-500 hover:bg-orange-600 text-white'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Registration'}
              </button>

              {submitStatus === 'success' && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-medium">Registration submitted successfully! We'll contact you within 24 hours.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 font-medium">There was an error submitting your registration. Please try again or contact us directly.</p>
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
                    <p className="text-gray-600 text-sm sm:text-base">703-865-1675</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Email</h4>
                    <p className="text-gray-600 text-sm sm:text-base">athlosfitnesscamp@gmail.com</p>
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