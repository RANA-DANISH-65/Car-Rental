import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function LegalMattersPage() {
  const [activeSection, setActiveSection] = useState('terms');
  
  const sections = [
    { id: 'terms', title: 'Terms of service', route: '/terms-of-service' },
    { id: 'cancellation', title: 'Cancellation policy', route: '/cancellation-policy' },
    { id: 'privacy', title: 'Privacy policy', route: '/privacy-policy' },
    { id: 'community', title: 'Community guidelines', route: '/community-guidelines' },
    { id: 'nondiscrimination', title: 'Nondiscrimination policy', route: '/nondiscrimination-policy' },
    { id: 'additional', title: 'Additional policies', route: '/additional-policies' },
    { id: 'turo', title: 'Turo Travels Mutual', route: '/turo-travels-mutual' },
    { id: 'gift', title: 'Gift card terms', route: '/gift-card-terms' },
  ];

  const tosLinks = [
    { id: 'intro', title: 'Introduction' },
    { id: 'eligibility', title: 'Eligibility, registration, verification' },
    { id: 'fees', title: 'Fees, taxes' },
    { id: 'commitments', title: 'Your commitments' },
    { id: 'content', title: 'Content' },
    { id: 'prohibited', title: 'Prohibited activities' },
    { id: 'legal', title: 'Other legal matters' },
    { id: 'guests', title: 'Specific terms for guests' },
  ];

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Header section */}
      <div className="bg-[#121212] text-white py-16 text-center">
        <h1 className="text-6xl text-green-400 font-serif">Legal matters</h1>
        
        {/* Navigation */}
        <div className="flex flex-wrap justify-center mt-8 max-w-4xl mx-auto px-4">
          {sections.map((section) => (
            <Link
              key={section.id}
              to={section.route}
              className={`mx-2 my-1 px-2 py-1 ${activeSection === section.id ? 'underline' : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              {section.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Terms of service content */}
      <div className="max-w-4xl bg-[#121212] mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold text-green-600 text-center mb-2">Terms of service</h2>
        <p className="text-center text-gray-300 mb-8">Last revised: March 19, 2025</p>
        
        <div className="mb-8">
          <p className=" text-white capitalize bg-green-800 p-5 rounded-2xl font-medium mb-6">
            PLEASE READ THESE TERMS OF SERVICE CAREFULLY. THEY CONTAIN IMPORTANT INFORMATION THAT AFFECTS YOUR
            RIGHTS, REMEDIES, AND OBLIGATIONS. THEY INCLUDE AN AGREEMENT TO ARBITRATE (UNLESS YOU OPT OUT). THESE
            TERMS ALSO INCLUDE A PROHIBITION OF CLASS AND REPRESENTATIVE ACTIONS AND NON-INDIVIDUALIZED RELIEF
            FOR ALL MATTERS IN EITHER COURT OR ARBITRATION, VARIOUS LIMITATIONS AND EXCLUSIONS, A CLAUSE THAT
            GOVERNS THE JURISDICTION, VENUE, AND GOVERNING LAW OF DISPUTES, EXCEPT WHERE PROHIBITED, AND
            OBLIGATIONS TO COMPLY WITH APPLICABLE LAWS AND REGULATIONS.
          </p>
          
          <ul className="space-y-4">
            {tosLinks.map((link) => (
              <li key={link.id} className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <a href={`#${link.id}`} className="text-[#cecece] hover:underline">
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
