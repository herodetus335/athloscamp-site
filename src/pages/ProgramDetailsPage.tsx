import React from 'react';
import { Clock, Users, Target, Heart, Trophy, Shield, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const ProgramDetailsPage = () => {
  const dailySchedule = [
    {
      day: "Day 1",
      title: "Foundation & Body Awareness",
      theme: "Understanding Your Body",
      schedule: [
        { time: "9:00-9:15 AM", activity: "Welcome & Warm-up Circle", description: "Introduction, name games, and dynamic stretching" },
        { time: "9:15-10:00 AM", activity: "Body Awareness Workshop", description: "Learning about posture, balance, and basic movement patterns" },
        { time: "10:00-10:15 AM", activity: "Hydration Break", description: "Water break and healthy snack in the pavilion" },
        { time: "10:15-11:15 AM", activity: "Movement Fundamentals", description: "Walking, running, jumping, and coordination exercises" },
        { time: "11:15-12:00 PM", activity: "Fun Games & Activities", description: "Tag games, obstacle courses, and team building" },
        { time: "12:00-12:30 PM", activity: "Cool Down & Reflection", description: "Stretching, breathing exercises, and daily recap" },
        { time: "12:30-1:00 PM", activity: "Arts & Crafts Time", description: "Create fitness journals and goal-setting activities in pavilion" }
      ]
    },
    {
      day: "Day 2",
      title: "Strength & Stability", 
      theme: "Building Your Foundation",
      schedule: [
        { time: "9:00-9:15 AM", activity: "Energizing Warm-up", description: "Dynamic movements and activation exercises" },
        { time: "9:15-10:00 AM", activity: "Core Strength Basics", description: "Age-appropriate core exercises and stability training" },
        { time: "10:00-10:15 AM", activity: "Snack & Social Time", description: "Healthy snacks and friendship building in pavilion" },
        { time: "10:15-11:15 AM", activity: "Functional Movement Training", description: "Squats, lunges, push-ups adapted for all ages" },
        { time: "11:15-12:00 PM", activity: "Balance Challenge Games", description: "Fun balance activities and stability challenges" },
        { time: "12:00-12:30 PM", activity: "Strength Celebration", description: "Show off new skills and positive reinforcement" },
        { time: "12:30-1:00 PM", activity: "Creative Expression", description: "Design strength superhero characters in pavilion" }
      ]
    },
    {
      day: "Day 3",
      title: "Cardio & Endurance",
      theme: "Heart Health Heroes", 
      schedule: [
        { time: "9:00-9:15 AM", activity: "Heart Rate Discovery", description: "Learn about heart health and find your pulse" },
        { time: "9:15-10:00 AM", activity: "Cardio Circuit Training", description: "Fun stations with jumping jacks, mountain climbers, and more" },
        { time: "10:00-10:15 AM", activity: "Recovery & Hydration", description: "Important recovery time with healthy snacks" },
        { time: "10:15-11:15 AM", activity: "Endurance Adventures", description: "Relay races, scavenger hunts, and team challenges" },
        { time: "11:15-12:00 PM", activity: "Dance Fitness Party", description: "High-energy dance moves and cardio games" },
        { time: "12:00-12:30 PM", activity: "Cool Down Yoga", description: "Gentle stretching and breathing exercises" },
        { time: "12:30-1:00 PM", activity: "Heart Health Crafts", description: "Create heart-healthy recipe books in pavilion" }
      ]
    },
    {
      day: "Day 4", 
      title: "Flexibility & Recovery",
      theme: "Listen to Your Body",
      schedule: [
        { time: "9:00-9:15 AM", activity: "Mindful Movement", description: "Gentle wake-up stretches and body awareness" },
        { time: "9:15-10:00 AM", activity: "Flexibility Workshop", description: "Learn proper stretching techniques for all muscle groups" },
        { time: "10:00-10:15 AM", activity: "Mindful Snack Time", description: "Practice mindful eating with healthy snacks" },
        { time: "10:15-11:15 AM", activity: "Mobility Games", description: "Fun activities that improve range of motion" },
        { time: "11:15-12:00 PM", activity: "Recovery Techniques", description: "Learn about rest, sleep, and taking care of your body" },
        { time: "12:00-12:30 PM", activity: "Relaxation Session", description: "Guided meditation and stress relief techniques" },
        { time: "12:30-1:00 PM", activity: "Wellness Journals", description: "Create personal wellness plans in pavilion" }
      ]
    },
    {
      day: "Day 5",
      title: "Integration & Celebration", 
      theme: "Putting It All Together",
      schedule: [
        { time: "9:00-9:15 AM", activity: "Victory Warm-up", description: "Celebrate the week with energizing movements" },
        { time: "9:15-10:00 AM", activity: "Skills Showcase", description: "Demonstrate all the skills learned throughout the week" },
        { time: "10:00-10:15 AM", activity: "Celebration Snacks", description: "Special healthy treats to celebrate achievements" },
        { time: "10:15-11:15 AM", activity: "Personal Fitness Plans", description: "Create individualized fitness goals and plans" },
        { time: "11:15-12:00 PM", activity: "Team Challenges", description: "Group activities that combine all week's learning" },
        { time: "12:00-12:30 PM", activity: "Awards Ceremony", description: "Recognition of effort, improvement, and teamwork" },
        { time: "12:30-1:00 PM", activity: "Memory Making", description: "Create keepsake crafts and exchange contact info" }
      ]
    }
  ];

  const keyBenefits = [
    {
      icon: Target,
      title: "Personalized Attention",
      description: "With only 15 participants per group and 1 dedicated coach, every child receives individualized guidance and support."
    },
    {
      icon: Heart,
      title: "Holistic Health Approach", 
      description: "We focus on physical fitness, mental wellness, and emotional development for complete well-being."
    },
    {
      icon: Trophy,
      title: "Confidence Building",
      description: "Progressive skill development and positive reinforcement help children build lasting self-confidence."
    },
    {
      icon: Shield,
      title: "Safe Learning Environment",
      description: "Age-appropriate activities and certified staff ensure a secure, supportive atmosphere for all participants."
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 rounded-xl p-8 shadow-lg">
          <Navigation />
          
          {/* Hero Section */}
          <section className="pt-20 pb-12 bg-gradient-to-br from-blue-600 to-orange-500">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <Link 
                to="/#programs"
                className="inline-flex items-center text-white hover:text-orange-200 transition-colors duration-200 mb-6"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Programs
              </Link>
              <div className="text-center text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  5-Day Fitness Foundation Program
                </h1>
                <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                  A comprehensive daily breakdown of activities, schedules, and the key benefits 
                  your child will experience in our transformative fitness program.
                </p>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 inline-block">
                  <div className="text-2xl font-bold">July 21-25, 2025</div>
                  <div className="text-lg">9:00 AM - 1:00 PM Daily</div>
                </div>
              </div>
            </div>
          </section>

          {/* Key Benefits */}
          <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Key Program Benefits
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {keyBenefits.map((benefit, index) => (
                  <div 
                    key={index}
                    className="bg-gradient-to-br from-blue-50 to-orange-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300 border border-blue-100"
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
          </section>

          {/* Daily Schedule Breakdown */}
          <section className="py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Detailed Daily Schedule
              </h2>
              <div className="space-y-12">
                {dailySchedule.map((day, dayIndex) => (
                  <div key={dayIndex} className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-orange-500 p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">{day.day}: {day.title}</h3>
                      <p className="text-lg opacity-90">{day.theme}</p>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        {day.schedule.map((item, itemIndex) => (
                          <div 
                            key={itemIndex}
                            className="flex flex-col md:flex-row md:items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                          >
                            <div className="md:w-32 flex-shrink-0 mb-2 md:mb-0">
                              <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold text-center">
                                {item.time}
                              </div>
                            </div>
                            <div className="flex-grow md:ml-4">
                              <h4 className="font-semibold text-gray-900 mb-1">{item.activity}</h4>
                              <p className="text-gray-600 text-sm">{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* What's Included */}
          <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                What's Included in Your Program
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  "All fitness equipment and materials",
                  "Healthy snacks and hydration breaks", 
                  "Arts and crafts supplies",
                  "Personal fitness journal",
                  "Progress tracking and assessment",
                  "Certificate of completion",
                  "Access to covered pavilion",
                  "Professional coaching and guidance",
                  "Small group personalized attention"
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Registration CTA */}
          <section className="py-16 bg-gradient-to-r from-blue-600 to-orange-500">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Start Your Child's Fitness Journey?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Limited to 45 total participants across 3 groups. Secure your child's spot today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/#contact"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-200 hover:scale-105"
                >
                  Register Now - $225
                </Link>
                <Link 
                  to="/faq"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200 hover:scale-105"
                >
                  Have Questions?
                </Link>
              </div>
            </div>
          </section>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ProgramDetailsPage;