import React from "react";
import "../style/AboutUs.css"; // Import the CSS file for styling

const AboutUs = () => {
  return (
    <div className="about-container text-white ">
      <div className="hero-section bg">
        <h1 className="about-title text-green-400">About Us</h1>
        <p className="about-subtitle text-white">Your Journey, Our Pakistan</p>
      </div>
      
      <div className="about-content">
        <p className="text-white">
          Welcome to <strong>Pakistan Car Rental</strong>, your trusted partner for car rentals across Pakistan. We are dedicated to providing you with the best car rental experience, offering a wide range of vehicles to suit your needs while exploring the beautiful landscapes of Pakistan.
        </p>
        <p className="text-white">
          Our mission is to make car rental simple, affordable, and convenient for both locals and tourists. Whether you're traveling for business in bustling Karachi, exploring the historical sites of Lahore, or venturing to the northern areas, we have the perfect vehicle for your journey.
        </p>
        <p className="text-white">
          With years of experience in the Pakistani automotive industry, we pride ourselves on our excellent customer service and commitment to quality. Our team understands the unique road conditions and travel requirements across Pakistan's diverse regions.
        </p>
        <p className="text-white">
          Founded in 2010, Pakistan Car Rental has grown from a small local business in Islamabad to a nationwide service with locations in over 15 major cities including Karachi, Lahore, Islamabad, Peshawar, Quetta, and Multan. Our success is built on our commitment to customer satisfaction and our passion for showcasing Pakistan's beauty through reliable transportation solutions.
        </p>
      </div>

      <div className="our-values-section">
        <h2 className="text-green-500 text-4xl mt-10 font-bold">Our Values</h2>
        <div className="values-grid ">
          <div className="value-card">
            <div className="value-icon">🤝</div>
            <h3 className="text-green-400">Mehman Nawazi</h3>
            <p className="text-white">We embody Pakistani hospitality, treating each customer as an honored guest.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">✅</div>
            <h3 className="text-green-400">Quality Service</h3>
            <p className="text-white">We maintain our vehicles to the highest standards for your safety on all Pakistani roads.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">💰</div>
            <h3 className="text-green-400">Affordable Pricing</h3>
            <p className="text-white">We offer competitive rates in Pakistani Rupees without compromising on quality.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🌱</div>
            <h3 className="text-green-400">Sustainability</h3>
            <p className="text-white">We're committed to protecting Pakistan's natural beauty by reducing our environmental footprint.</p>
          </div>
        </div>
      </div>

      <div className="team-section">
        <h2 className="text-green-500 mt-15 font-bold">Our Leadership Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img src="/assets/team1.jpg" alt="Team Member 1" />
            <h3 className="text-white">Bilal Xaighum</h3>
            <p className="text-white">CEO</p>
            <p className="member-bio text-gray-300">With over 15 years of experience in the Pakistani automotive industry, Ahmed leads our company with vision and dedication to excellence.</p>
          </div>
          <div className="team-member">
            <img src="/assets/team2.jpg" alt="Team Member 2" />
            <h3 className="text-white">Tayyaba Tahira</h3>
            <p className="text-white">COO</p>
            <p className="member-bio text-gray-300">Fatima ensures our operations run smoothly across all Pakistani cities, with a focus on customer satisfaction and cultural sensitivity.</p>
          </div>
          <div className="team-member">
            <img src="/assets/team3.jpg" alt="Team Member 3" />
            <h3 className="text-white">Tariq Mahmood</h3>
            <p className="text-white">CTO</p>
            <p className="member-bio text-gray-300">Tariq leads our technological initiatives, developing systems optimized for Pakistan's unique travel conditions and connectivity challenges.</p>
          </div>
        </div>
      </div>

      <div className="history-section">
        <h2 className="text-white">Our Journey</h2>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-year text-white">2010</div>
            <div className="timeline-content">
              <h3 className="text-white">Founded</h3>
              <p className="text-white">Pakistan Car Rental was established with a small fleet of 10 vehicles in Islamabad.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-year text-white">2015</div>
            <div className="timeline-content">
              <h3 className="text-white">Expansion</h3>
              <p className="text-white">Expanded to 5 major cities including Karachi, Lahore, and Rawalpindi with a fleet of over 50 vehicles.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-year text-white">2018</div>
            <div className="timeline-content">
              <h3 className="text-white">Digital Transformation</h3>
              <p className="text-white">Launched our mobile app with Urdu language support and online booking system with local payment options.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-year text-white">2022</div>
            <div className="timeline-content">
              <h3 className="text-white">Nationwide Coverage</h3>
              <p className="text-white">Reached the milestone of 15+ locations across Pakistan, including tourist destinations in Northern Areas.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="services-section">
        <h2 className="text-white">Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3 className="text-white">City Exploration</h3>
            <p className="text-white">Comfortable vehicles for exploring Pakistan's vibrant cities with optional local drivers.</p>
          </div>
          <div className="service-card">
            <h3 className="text-white">Northern Areas Tours</h3>
            <p className="text-white">Specialized 4x4 vehicles for trips to Hunza, Swat, Kaghan, and other northern destinations.</p>
          </div>
          <div className="service-card">
            <h3 className="text-white">Corporate Accounts</h3>
            <p className="text-white">Tailored solutions for Pakistani businesses with regular transportation needs.</p>
          </div>
          <div className="service-card">
            <h3 className="text-white">Airport Transfers</h3>
            <p className="text-white">Convenient pickup and drop-off services at all major Pakistani airports.</p>
          </div>
        </div>
      </div>

      <div className="testimonials-section">
        <h2 className="text-white">What Our Customers Say</h2>
        <div className="testimonials-carousel">
          <div className="testimonial">
            <p className="testimonial-text text-white">"Pakistan Car Rental made my business trips between Karachi and Islamabad so much more convenient. Their service is professional and reliable."</p>
            <p className="testimonial-author text-white">- Usman A., Business Executive</p>
          </div>
          <div className="testimonial">
            <p className="testimonial-text text-white">"We rented a 4x4 for our family trip to Gilgit-Baltistan and were impressed with the vehicle quality and customer support throughout our journey."</p>
            <p className="testimonial-author text-white">- Ayesha H., Family Traveler</p>
          </div>
          <div className="testimonial">
            <p className="testimonial-text text-white">"As a foreign tourist exploring Pakistan, their English-speaking staff and knowledge of tourist destinations made my experience exceptional!"</p>
            <p className="testimonial-author text-white">- Daud M., International Tourist</p>
          </div>
        </div>
      </div>
      
      <div className="cta-section">
        <h2 className="text-white">Ready to Explore Pakistan?</h2>
        <p className="text-white">Join thousands of satisfied customers who trust Pakistan Car Rental for their transportation needs across the country.</p>
       </div>
    </div>
  );
};

export default AboutUs;