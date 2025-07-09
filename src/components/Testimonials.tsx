import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Emma Johnson",
      age: 12,
      role: "Athletic Achievers Program",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      rating: 5,
      text: "I was super nervous about joining because I wasn't good at sports, but the coaches made me feel so welcome! Now I love basketball and made so many new friends. I can't wait to come back next summer and try the volleyball program too!",
      highlight: "From nervous to confident"
    },
    {
      name: "Marcus Rodriguez",
      age: 14,
      role: "Championship Elite Program",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      rating: 5,
      text: "The training here is intense but so much fun! Coach Mike taught me techniques I never knew existed. I made my high school varsity soccer team because of what I learned at Athlos. The mental coaching part really helped me stay focused during tryouts.",
      highlight: "Made varsity team"
    },
    {
      name: "Sophia Chen",
      age: 10,
      role: "Multi-Sport Explorer Program",
      image: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      rating: 5,
      text: "This camp is AMAZING! I got to try so many different sports and found out I'm really good at track and field. The coaches are super nice and always cheer us on. My favorite part was when we had the mini Olympics at the end of the week!",
      highlight: "Discovered new talents"
    },
    {
      name: "Jake Thompson",
      age: 13,
      role: "Athletic Achievers Program",
      image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      rating: 5,
      text: "I used to be really shy and didn't like team sports. But at Athlos, everyone is so supportive and the coaches help you believe in yourself. Now I'm the captain of my school's basketball team! The leadership skills I learned here changed everything for me.",
      highlight: "Became team captain"
    },
    {
      name: "Chloe Martinez",
      age: 15,
      role: "Championship Elite Program",
      image: "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      rating: 5,
      text: "The coaches here actually listen to what you want to improve and create personalized training plans. I've been coming for three years and each summer I get better. The college prep sessions helped me understand what scouts look for. This place is like a second family to me!",
      highlight: "Three years running"
    }
  ];

  return (
    <section id="testimonials" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            What Parents & Campers Say
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Real stories from families who have experienced the Athlos difference.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white/80 rounded-xl p-8 shadow-lg flex flex-col h-full">
              <div className="absolute -top-3 -left-3 bg-orange-500 rounded-full p-2">
                <Quote className="h-4 w-4 text-white" />
              </div>
              
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">Age {testimonial.age} • {testimonial.role}</p>
                </div>
              </div>

              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>

              <div className="bg-orange-100 text-orange-800 text-xs font-semibold px-3 py-1 rounded-full inline-block mb-3">
                {testimonial.highlight}
              </div>

              <p className="text-gray-700 leading-relaxed text-sm">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-orange-500 rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Create Your Own Success Story?</h3>
          <p className="text-lg mb-6 opacity-90">
            Join hundreds of young athletes who have discovered their potential at Athlos Fitness Camp.
          </p>
          <button 
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 hover:scale-105"
          >
            Start Your Journey Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;