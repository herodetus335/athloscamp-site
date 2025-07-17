import React, { useState } from 'react';
import { CreditCard, Shield, Clock, CheckCircle, AlertCircle, Calendar, Users, DollarSign, Copy, ExternalLink, Smartphone, Building, Zap } from 'lucide-react';
import { paymentRouter } from '../utils/paymentRouter';

const Payment = () => {
  const [selectedProgram, setSelectedProgram] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentInstructions, setPaymentInstructions] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    parentName: '',
    childName: '',
    email: '',
    phone: '',
    childAge: '',
    emergencyContact: '',
    emergencyPhone: '',
    medicalInfo: ''
  });

  const programs = [
    {
      id: 'foundation-program',
      name: '5-Day Fitness Foundation Program',
      dates: 'Aug 04-08, 2025',
      time: '9:00 AM - 1:00 PM',
      price: 225,
      originalPrice: 250,
      discount: 10,
      features: [
        'Expert coaching with Coach Mike',
        'Small group size (max 15 participants)',
        'All equipment and materials included',
        'Healthy snacks and hydration breaks',
        'Personal fitness journal',
        'Certificate of completion',
        'Progress tracking and assessment'
      ]
    }
  ];

  const paymentMethods = [
    { id: 'ach', name: 'Bank Transfer (ACH)', icon: Building, description: 'Direct bank transfer - most secure' },
    { id: 'zelle', name: 'Zelle', icon: Zap, description: 'Quick bank-to-bank transfer' },
    { id: 'paypal', name: 'PayPal', icon: CreditCard, description: 'Send via PayPal Friends & Family' },
    { id: 'venmo', name: 'Venmo', icon: Smartphone, description: 'Mobile payment app' },
    { id: 'cashapp', name: 'Cash App', icon: DollarSign, description: 'Square Cash payment' },
    { id: 'wire', name: 'Wire Transfer', icon: Shield, description: 'Secure wire transfer' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleContinueToPayment = () => {
    if (!selectedProgram || !formData.parentName || !formData.childName || !formData.email || !formData.phone || !formData.childAge) {
      alert('Please fill in all required fields');
      return;
    }
    setCurrentStep(2);
  };

  const generatePaymentInstructions = () => {
    const selectedProgramData = programs.find(p => p.id === selectedProgram);
    if (!selectedProgramData) return;

    const instructions = paymentRouter.getPaymentInstructions(
      selectedProgramData.price,
      formData
    );

    setPaymentInstructions(instructions);
    setCurrentStep(3);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const confirmPaymentSent = () => {
    if (!paymentInstructions) return;
    
    setIsProcessing(true);
    
    // Simulate confirmation process
    setTimeout(() => {
      const result = paymentRouter.confirmPayment(
        paymentInstructions.referenceId,
        programs.find(p => p.id === selectedProgram)?.price || 0
      );
      
      if (result.success) {
        alert(`Registration confirmed! ${result.message}\n\nYou will receive a confirmation email within 24 hours.`);
        setCurrentStep(4);
      }
      setIsProcessing(false);
    }, 1000);
  };

  const getMethodIcon = (method: string) => {
    const methodData = paymentMethods.find(m => m.id === method);
    return methodData?.icon || DollarSign;
  };

  return (
    <section id="payment" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Secure Registration & Payment
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete your child's registration with our flexible payment options. 
            Limited spots available - register today to guarantee your place!
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex justify-center">
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4].map((step) => (
                <React.Fragment key={step}>
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentStep >= step ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-600'
                  }`}>
                    {step}
                  </div>
                  {step < 4 && (
                    <div className={`w-16 h-1 ${
                      currentStep > step ? 'bg-orange-500' : 'bg-gray-300'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <div className="grid grid-cols-4 gap-8 text-center text-sm">
              <span className={currentStep >= 1 ? 'text-orange-500 font-semibold' : 'text-gray-500'}>
                Registration
              </span>
              <span className={currentStep >= 2 ? 'text-orange-500 font-semibold' : 'text-gray-500'}>
                Payment Method
              </span>
              <span className={currentStep >= 3 ? 'text-orange-500 font-semibold' : 'text-gray-500'}>
                Payment Instructions
              </span>
              <span className={currentStep >= 4 ? 'text-orange-500 font-semibold' : 'text-gray-500'}>
                Confirmation
              </span>
            </div>
          </div>
        </div>

        {/* Step 1: Registration Form */}
        {currentStep === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Program Selection */}
            <div className="space-y-8">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Program Selection</h3>
                
                {programs.map((program) => (
                  <div 
                    key={program.id}
                    className={`border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 ${
                      selectedProgram === program.id 
                        ? 'border-orange-500 bg-orange-50' 
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                    onClick={() => setSelectedProgram(program.id)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-semibold text-gray-900">{program.name}</h4>
                        <p className="text-gray-600 mt-1">{program.dates} • {program.time}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-orange-500">${program.price}</div>
                        <div className="text-sm text-gray-500 line-through">${program.originalPrice}</div>
                        <div className="text-sm text-green-600 font-semibold">{program.discount}% Early Bird Discount</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-orange-500" />
                        <span className="text-sm text-gray-600">5 Days</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-orange-500" />
                        <span className="text-sm text-gray-600">4 Hours Daily</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-orange-500" />
                        <span className="text-sm text-gray-600">Ages 6-16</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h5 className="font-semibold text-gray-900">What's Included:</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                        {program.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                            <span className="text-xs text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Registration Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Participant Information</h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Parent/Guardian Name *
                    </label>
                    <input
                      type="text"
                      name="parentName"
                      required
                      value={formData.parentName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Child's Name *
                    </label>
                    <input
                      type="text"
                      name="childName"
                      required
                      value={formData.childName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Child's Age *
                    </label>
                    <select
                      name="childAge"
                      required
                      value={formData.childAge}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="">Select Age</option>
                      {[...Array(11)].map((_, i) => (
                        <option key={i} value={i + 6}>{i + 6} years old</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Contact *
                    </label>
                    <input
                      type="text"
                      name="emergencyContact"
                      required
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Phone *
                    </label>
                    <input
                      type="tel"
                      name="emergencyPhone"
                      required
                      value={formData.emergencyPhone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Medical Information / Allergies
                    </label>
                    <textarea
                      name="medicalInfo"
                      rows={3}
                      value={formData.medicalInfo}
                      onChange={handleInputChange}
                      placeholder="Please list any medical conditions, allergies, or special needs..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <button
                  onClick={handleContinueToPayment}
                  disabled={!selectedProgram}
                  className="w-full bg-orange-500 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to Payment Options
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Payment Method Selection */}
        {currentStep === 2 && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Choose Your Payment Method</h3>
              <p className="text-gray-600 text-center mb-8">
                Select your preferred payment method. All options are secure and will provide you with specific payment instructions.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paymentMethods.map((method) => {
                  const IconComponent = method.icon;
                  return (
                    <div 
                      key={method.id}
                      onClick={generatePaymentInstructions}
                      className="border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-all duration-200 hover:scale-105"
                    >
                      <div className="text-center">
                        <div className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                          <IconComponent className="h-8 w-8 text-orange-500" />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{method.name}</h4>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-orange-500 hover:text-orange-600 font-semibold"
                >
                  ← Back to Registration
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Payment Instructions */}
        {currentStep === 3 && paymentInstructions && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-center mb-8">
                <div className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  {React.createElement(getMethodIcon(paymentInstructions.account.method), {
                    className: "h-8 w-8 text-orange-500"
                  })}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Instructions</h3>
                <p className="text-gray-600">
                  Follow these steps to complete your payment via {paymentInstructions.instructions.method}
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-lg p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-sm text-gray-600">Payment Method</div>
                    <div className="font-semibold text-gray-900">{paymentInstructions.instructions.method}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Amount</div>
                    <div className="font-semibold text-orange-500 text-xl">{paymentInstructions.instructions.amount}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Recipient</div>
                    <div className="font-semibold text-gray-900">{paymentInstructions.instructions.recipient}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Step-by-Step Instructions:</h4>
                  <div className="space-y-3">
                    {paymentInstructions.instructions.steps.map((step: string, index: number) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <div className="text-gray-700">{step}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2">Important Information:</h5>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-center justify-between">
                      <span>Reference ID:</span>
                      <div className="flex items-center space-x-2">
                        <code className="bg-gray-100 px-2 py-1 rounded text-xs">{paymentInstructions.referenceId}</code>
                        <button
                          onClick={() => copyToClipboard(paymentInstructions.referenceId)}
                          className="text-orange-500 hover:text-orange-600"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Reference Note:</span>
                      <div className="flex items-center space-x-2">
                        <code className="bg-gray-100 px-2 py-1 rounded text-xs">{paymentInstructions.instructions.reference}</code>
                        <button
                          onClick={() => copyToClipboard(paymentInstructions.instructions.reference)}
                          className="text-orange-500 hover:text-orange-600"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={confirmPaymentSent}
                    disabled={isProcessing}
                    className="flex-1 bg-orange-500 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all duration-200 hover:scale-105 disabled:opacity-50"
                  >
                    {isProcessing ? 'Confirming...' : 'I Have Sent the Payment'}
                  </button>
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="flex-1 border-2 border-orange-500 text-orange-500 py-4 px-6 rounded-lg text-lg font-semibold hover:bg-orange-500 hover:text-white transition-all duration-200"
                  >
                    Choose Different Method
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {currentStep === 4 && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Registration Confirmed!</h3>
              <p className="text-gray-600 mb-6">
                Thank you for registering {formData.childName} for the Athlos Fitness Camp! 
                We have received your payment information and will confirm receipt within 24 hours.
              </p>
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h4 className="font-semibold text-gray-900 mb-4">What's Next?</h4>
                <div className="space-y-2 text-sm text-gray-700 text-left">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>You'll receive a confirmation email within 24 hours</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Camp information packet will be sent 1 week before start date</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>We'll contact you if we need any additional information</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200"
              >
                Register Another Child
              </button>
            </div>
          </div>
        )}

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="flex flex-wrap justify-center items-center space-x-8 opacity-60">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-5 w-5" />
              <span className="text-sm">Secure Processing</span>
            </div>
            <div className="flex items-center space-x-2 mb-4">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm">Multiple Payment Options</span>
            </div>
            <div className="flex items-center space-x-2 mb-4">
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm">Money Back Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payment;