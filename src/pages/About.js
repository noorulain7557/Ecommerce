import React from "react";
import Layout from "./../components/layout/Layout";
import '../styles/about.css'; // Importing the premium stylesheet

const About = () => {
  return (
    <Layout title={"About Us - Premium Timepieces"}>
      <div className="container about-page-container">
        <div className="row align-items-center about-hero-section">
          {/* Left Column: Image Canvas wrapper */}
          <div className="col-md-6 text-center">
            <div className="about-img-frame">
              <img
                src="/images/about.jpeg"
                alt="Our Luxury Watch Showroom"
                className="img-fluid about-display-image"
              />
            </div>
          </div>
          
          {/* Right Column: Copywriting & Value Props */}
          <div className="col-md-6 about-content-section">
            <span className="brand-subtitle">About Us</span>
            <div className="accent-bar"></div>
            
            <p className="about-text-lead">
              Explore our curated collection of premium watches designed for style, precision, and durability. 
              Whether you're looking for a sleek modern piece, a classic luxury timepiece, or a sporty everyday 
              companion, we offer something exceptional for every wrist and every unforgettable occasion.
            </p>
          
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;