import React from 'react';
import { Globe, Facebook, Twitter, Instagram, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Footer = () => {
  const footerSections = [
    {
      title: "Company",
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Contact Us', path: '/contact' },
        { name: 'Service', path: '/service' }
      ]
    },
    {
      title: "Locations",
      links: ['Lahore', 'Islamabad', 'Karachi']
    },
    {
      title: "Help",
      links: ['FAQs', 'How It Works', 'Terms']
    }
  ];

  return (
    <footer className="bg-[#1a1a1a] p-10">
      <div className="container mt-10 mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6 items-center">
          {/* Wider About Section */}
          <div className="md:col-span-2">
            <h1 className="text-[#179510] font-semibold text-lg mb-2">About Drive Fleet</h1>
            <p className="text-gray-400 text-sm">
              Where quality meets affordability. We understand the importance of a smooth and enjoyable journey without the burden of excessive costs. That's why we have meticulously crafted our offerings to provide you with top-notch vehicles at minimum expense.
            </p>
          </div>

          {/* Footer Mapped Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="text-center flex flex-col items-center justify-center">
              <h4 className="font-bold text-[#1ecb15] mb-2">{section.title}</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {section.links.map((link) => (
                  // Check if the link is an object (for Company links with paths)
                  <li key={link.name}>
                    {link.path ? (
                      <Link 
                        to={link.path} 
                        className="hover:text-white cursor-pointer transition-colors"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <span>{link}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center border-t pt-4">
          <div className="text-sm text-gray-500">
            ©2025 Rental Fleet
          </div>
          
          <div className="flex space-x-4">
            <Facebook size={16} className="text-gray-600" />
            <Twitter size={16} className="text-gray-600" />
            <Instagram size={16} className="text-gray-600" />
            <span className="flex items-center text-sm text-gray-600">
              <Globe size={14} className="mr-1" />English
              <ChevronDown size={12} className="ml-1" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
