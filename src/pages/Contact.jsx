import { useState } from 'react';
import { PhoneIcon, MailIcon, MessageSquareIcon, MapPinIcon, XSquareIcon, SendIcon, ClockIcon, GlobeIcon, UserIcon, AtSignIcon, FileTextIcon, HelpCircleIcon } from 'lucide-react';

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState('guests');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your server
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setSubmitted(false);
    }, 3000);
  };

  const contactCards = [
    {
      icon: <PhoneIcon className="text-indigo-600" size={24} />,
      title: "Call Us",
      content: activeTab === 'guests' 
        ? ["+92 300 1234567 (Guest Support)", "Available 24/7"]
        : ["+92 300 7654321 (Host Support)", "Available 24/7"]
    },
    {
      icon: <MailIcon className="text-indigo-600" size={24} />,
      title: "Email Us",
      content: activeTab === 'guests'
        ? ["support@Drive Fleet.pk", "Response within 24 hours"]
        : ["hostsupport@Drive Fleet.pk", "Response within 24 hours"]
    },
    {
      icon: <MessageSquareIcon className="text-indigo-600" size={24} />,
      title: "Live Chat",
      content: ["Connect with an agent instantly", "Available 9am-10pm PKT"]
    },
    {
      icon: <ClockIcon className="text-indigo-600" size={24} />,
      title: "Office Hours",
      content: ["Monday-Friday: 9am-5pm", "Saturday: 10am-2pm", "Sunday: Closed"]
    }
  ];

  const officeLocations = [
    {
      city: "Lahore",
      address: "34 Main Boulevard, Gulberg",
      phone: "+92 42 7654321",
      email: "lahore@Drive Fleet.pk"
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-3 text-green-500">Contact Us</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">We're here to help with any questions about car sharing in Pakistan. How can we assist you today?</p>
      </div>

      <div className="mb-8  bg-[#333] rounded-t-lg shadow-sm">
        <div className="flex justify-center">
          <p 
            className={`px-8 py-4 font-medium cursor-pointer  transition-colors ${activeTab === 'guests' ? 'border-b-2 border-green-600 text-green-400 bg-[#1a1a1a]' : ' text-gray-300 hover:text-green-400'}`}
            onClick={() => setActiveTab('guests')}
          >
            GUEST SUPPORT
          </p>
          <p 
            className={`px-8 py-4 font-medium cursor-pointer ml-4 transition-colors ${activeTab === 'hosts' ? 'border-b-2 border-green-600 text-green-400 bg-[#1a1a1a]' : ' text-gray-300 hover:text-green-400'}`}
            onClick={() => setActiveTab('hosts')}
          >
            HOST SUPPORT
          </p>
        </div>
      </div>

      {/* Contact Methods Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {contactCards.map((card, index) => (
          <div key={index} className="bg-green-700 p-6 rounded-lg shadow-sm   hover:shadow-md transition-shadow text-center">
            <div className="bg-indigo-50 p-4 rounded-full inline-flex items-center justify-center mb-4">
              {card.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
            <div className="space-y-1">
              {card.content.map((line, i) => (
                <p key={i} className={i === 0 ? "text-gray-200 font-medium" : "text-gray-300 text-sm"}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Contact Form and Map Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Contact Form */}
        <div className="bg-[#333] p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-green-700">Send Us a Message</h2>
          
          {submitted ? (
            <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg mb-6">
              <p className="font-medium">Thank you for your message!</p>
              <p className="text-sm mt-1">We'll get back to you as soon as possible.</p>
            </div>
          ) : null}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-green-400 text-left text-sm font-medium mb-2" htmlFor="name">
                Your Name
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-3 text-white" size={18} />
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-0"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-green-400 text-left text-sm font-medium mb-2" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <AtSignIcon className="absolute left-3 top-3 text-white" size={18} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-0"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-green-400 text-left text-sm font-medium mb-2" htmlFor="subject">
                Subject
              </label>
              <div className="relative">
                <FileTextIcon className="absolute left-3 top-3 text-white" size={18} />
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-0"
                  placeholder="What is this regarding?"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-green-400 text-left text-sm font-medium mb-2" htmlFor="message">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-0"
                placeholder="How can we help you?"
                value={formData.message}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-green-700 text-white py-3 px-6 rounded-lg hover:bg-green-400 transition-colors flex items-center justify-center font-medium"
            >
              <SendIcon size={18} className="mr-2" />
              Send Message
            </button>
          </form>
        </div>
        
        {/* Office Locations */}
        <div className="bg-[#333] p-8 rounded-lg shadow-sm ">
          <h2 className="text-2xl font-bold mb-6 text-green-700">Our Offices</h2>
          
          <div className="bg-green-600 p-4 rounded-lg mb-6">
            <p className="text-white flex items-center">
              <GlobeIcon size={18} className="mr-2" />
              <span className="font-medium">Drive Fleet Pakistan National Support</span>
            </p>
          </div>
          
          <div className="space-y-6">
            {officeLocations.map((office, index) => (
              <div key={index} className="border-b  text-white border-gray-200 pb-6 last:border-0">
                <h3 className="font-bold text-lg mb-2">{office.city}</h3>
                <div className="space-y-2">
                  <p className="flex items-start">
                    <MapPinIcon size={18} className="mr-2 text-green-600 mt-1 flex-shrink-0" />
                    <span>{office.address}</span>
                  </p>
                  <p className="flex items-start">
                    <PhoneIcon size={18} className="mr-2 text-green-600 mt-1 flex-shrink-0" />
                    <span>{office.phone}</span>
                  </p>
                  <p className="flex items-start">
                    <MailIcon size={18} className="mr-2 text-green-600 mt-1 flex-shrink-0" />
                    <span>{office.email}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Help Center Link */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <a href="#" className="flex items-center text-gray-300 hover:text-green-800 font-medium">
              <HelpCircleIcon size={20} className="mr-2" />
              Visit our Help Center for FAQs and guides
            </a>
          </div>
        </div>
      </div>

      {/* Emergency Support */}
      <div className="bg-red-500 rounded-lg p-6 mb-16">
        <h2 className="text-xl font-bold mb-3 text-white flex items-center">
          Emergency Support
        </h2>
        <p className="mb-4 text-white">For urgent issues requiring immediate assistance during your trip:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-black p-4 rounded-lg ">
            <p className="font-medium">24/7 Emergency Hotline:</p>
            <p className="text-lg font-bold">+92 300 9876543</p>
          </div>
          <div className="bg-black p-4 rounded-lg ">
            <p className="font-medium">Roadside Assistance:</p>
            <p className="text-lg font-bold">+92 300 3456789</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-[#333] p-8 rounded-lg mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-400">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-700 p-6 rounded-lg shadow-sm">
            <h3 className="font-bold mb-2">How quickly will I receive a response?</h3>
            <p className="text-gray-300">We typically respond to emails within 24 hours and phone calls are answered immediately during business hours.</p>
          </div>
          <div className="bg-green-700 p-6 rounded-lg shadow-sm">
            <h3 className="font-bold mb-2">What information should I provide about my issue?</h3>
            <p className="text-gray-300">Please include your booking reference, relevant dates, and a detailed description of your question or concern.</p>
          </div>
          <div className="bg-green-700 p-6 rounded-lg shadow-sm">
            <h3 className="font-bold mb-2">Is there a customer support app?</h3>
            <p className="text-gray-300">Yes, you can download our mobile app which provides direct access to customer support features.</p>
          </div>
          <div className="bg-green-700 p-6 rounded-lg shadow-sm">
            <h3 className="font-bold mb-2">How do I report a problem with a vehicle?</h3>
            <p className="text-gray-300">Contact our support team immediately using any of the methods above and provide the car details and issue description.</p>
          </div>
        </div>
      </div>

      <footer className="text-center text-gray-400 text-sm pt-8 border-t border-gray-200">
        <p>© 2025 Drive Fleet Pakistan. All rights reserved.</p>
        <p className="mt-2">24/7 Support: +92 300 1234567</p>
      </footer>
    </div>
  );
}