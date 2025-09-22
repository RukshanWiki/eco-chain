import React from 'react';
import '../CSS/AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>About Us</h1>
          <p>Committed to promoting sustainable agriculture in collaboration with the Government of Sri Lanka</p>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="vision-mission-section">
        <div className="section-content">
          <h2>Our Vision</h2>
          <p>To enhance Sri Lanka’s agricultural productivity through sustainable practices and modern solutions.</p>
          
          <h2>Our Mission</h2>
          <p>To support farmers nationwide, provide accurate agricultural information, and promote eco-friendly farming techniques.</p>
        </div>
      </section>

      {/* Contact Details Section */}
      <section className="contact-section">
        <div className="section-content">
          <h2>Contact Us</h2>
          <p>Department of Agriculture, Peradeniya, Sri Lanka</p>
          <p>Email: info@agri.gov.lk | Phone: +94 81 238 9000</p>
        </div>
      </section>

      {/* Authorized by Government */}
      <section className="authorization-section">
        <div className="section-content">
          <h2>Authorized By</h2>
          <p>The Government of Sri Lanka - Department of Agriculture</p>
        </div>
      </section>

      {/* Useful Links */}
      <section className="links-section">
        <div className="section-content">
          <h2>Useful Links</h2>
          <ul>
            <li><a href="http://www.doa.gov.lk/" target="_blank" rel="noopener noreferrer">Department of Agriculture</a></li>
            <li><a href="http://www.agriinfo.gov.lk/" target="_blank" rel="noopener noreferrer">Agriculture Information Portal</a></li>
            <li><a href="http://www.fao.org/sri-lanka/en/" target="_blank" rel="noopener noreferrer">FAO Sri Lanka</a></li>
          </ul>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;
