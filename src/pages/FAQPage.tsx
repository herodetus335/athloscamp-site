import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const FAQPage = () => {
  const [openItems, setOpenItems] = React.useState<number[]>([]);
  const [navOrange, setNavOrange] = React.useState(false);
  const heroRef = React.useRef<HTMLDivElement>(null);

  // Orange nav only when white FAQ content is at the top
  React.useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const heroBottom = heroRef.current.getBoundingClientRect().bottom;
      setNavOrange(heroBottom <= 0);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  React.useEffect(() => {
    const nav = document.querySelector('nav');
    if (navOrange) {
      nav?.classList.add('bg-[#FF6600]', 'shadow-lg');
      nav?.classList.remove('bg-transparent', 'bg-[#f0f6ff]', 'bg-[#E67E22]');
    } else {
      nav?.classList.remove('bg-[#FF6600]');
      nav?.classList.add('bg-transparent');
    }
  }, [navOrange]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      category: "Safety & Health",
      questions: [
        {
          question: "What safety measures do you have in place?",
          answer: "All coaches are CPR/First Aid certified, we maintain a 1:15 coach-to-child ratio (max 15 per group), and we provide shaded rest stations plus frequent water breaks."
        },
        {
          question: "What if my child gets injured?",
          answer: "Minor scrapes are treated on-site. For anything more serious, we'll contact you immediately and follow your emergency contact plan."
        },
        {
          question: "Do you accommodate children with special needs?",
          answer: "Yes—let us know in advance so we can arrange one-on-one support or adaptive equipment."
        }
      ]
    },
    {
      category: "General Information",
      questions: [
        {
          question: "What ages do you accept?",
          answer: "We welcome children ages 6–10 and 11–13, split into two age-appropriate cohorts."
        },
        {
          question: "What are your 2025 camp dates and hours?",
          answer: "The camp is divided up by 3 Blocks, each Block being 5 consecutive days (no weekends), in total, spanning from July 21st to August 8th. The hours for the Part-Time camp are 9:00am to 1:00pm daily -- and the hours for Full-Time are 9:00am to 5:00pm daily."
        },
        {
          question: "What is the maximum group size?",
          answer: "Each group holds up to 15 kids with 1 dedicated coach; we run up to 3 simultaneous groups."
        }
      ]
    },
    {
      category: "Camp Experience (Daily Operations & Activities)",
      questions: [
        {
          question: "What activities do you offer?",
          answer: "Beginner/intermediate strength, endurance, and form training; team games (soccer, kickball), obstacle courses, skill stations (agility ladders, medicine balls), arts & crafts, STEM projects, outdoor exploration, team building challenges, and relay challenges."
        },
        {
          question: "What should my child bring?",
          answer: "Athletic shoes, water bottle, sunscreen—and a packed lunch only if they're Full-Day (we do not provide lunch)."
        },
        {
          question: "What happens if it rains?",
          answer: "We relocate to our covered pavilion and multipurpose room, and continue all planned activities rain or shine."
        }
      ]
    },
    {
      category: "Registration & Pricing",
      questions: [
        {
          question: "How much does camp cost?",
          answer: "Half-Day (9:00 AM–1:00 PM): $250\nFull-Day (9:00 AM–5:00 PM): $350\nSibling discount: 10% off each additional child"
        },
        {
          question: "What's included in the fee?",
          answer: "Coaching, equipment, snacks (morning/afternoon), and all activity stations."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section ref={heroRef} className="pt-20 pb-12 bg-gradient-to-br from-blue-600 to-orange-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Find answers to common questions about Athlos Fitness Camp. 
            Can't find what you're looking for? Contact us directly!
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 rounded-xl p-8 shadow-lg">
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
                  {category.category}
                </h2>
                <div className="space-y-4">
                  {category.questions.map((faq, faqIndex) => {
                    const itemIndex = categoryIndex * 100 + faqIndex;
                    const isOpen = openItems.includes(itemIndex);
                    
                    return (
                      <div 
                        key={faqIndex}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
                      >
                        <button
                          onClick={() => toggleItem(itemIndex)}
                          className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                        >
                          <h3 className="text-lg font-semibold text-gray-900 pr-4">
                            {faq.question}
                          </h3>
                          {isOpen ? (
                            <ChevronUp className="h-5 w-5 text-orange-500 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-orange-500 flex-shrink-0" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-4">
                            <p className="text-gray-600 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Still Have Questions?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Our friendly staff is here to help! Contact us directly for personalized assistance.
          </p>
          <div className="flex flex-col items-center gap-2 justify-center">
            <div className="text-lg text-gray-900 font-semibold">Email: 
              <button 
                onClick={() => {
                  const email = 'athlosfitnesscamp@gmail.com';
                  
                  // Try mailto first
                  window.location.href = `mailto:${email}`;
                  
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
                className="text-orange-500 hover:text-orange-600 transition-colors duration-200 bg-transparent border-none p-0 m-0 font-inherit cursor-pointer"
              >
                athlosfitnesscamp@gmail.com
              </button>
            </div>
            <div className="text-lg text-gray-900 font-semibold">Phone: <a href="tel:703-865-1675" className="text-orange-500 hover:text-orange-600 transition-colors duration-200">703-865-1675</a></div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQPage;