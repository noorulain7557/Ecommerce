import React from "react";
import Layout from "./../components/layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  // Container wrapper style to vertically center elements neatly
  const pageContainerStyle = {
    minHeight: "75vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem 0"
  };

  const imgStyle = {
    width: "100%",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    objectFit: "cover"
  };

  const titleStyle = {
    fontSize: "2.2rem",
    fontWeight: "700",
    letterSpacing: "0.5px",
    color: "#1a1a1a",
    marginBottom: "1rem"
  };

  // Modern styled interactive list entries
  const listItemStyle = {
    display: "flex",
    alignItems: "center",
    padding: "1rem",
    borderRadius: "12px",
    backgroundColor: "#f8fafc",
    border: "1px solid #e2e8f0",
    marginBottom: "12px",
    transition: "all 0.3s ease"
  };

  const iconContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eff6ff",
    color: "#3b82f6",
    fontSize: "1.5rem",
    padding: "0.75rem",
    borderRadius: "10px",
    marginRight: "1rem"
  };

  // Hover animations handled smoothly inline
  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = "translateY(-2px)";
    e.currentTarget.style.boxShadow = "0 4px 12px rgba(59, 130, 246, 0.08)";
    e.currentTarget.style.borderColor = "#bfdbfe";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "none";
    e.currentTarget.style.borderColor = "#e2e8f0";
  };

  return (
    <Layout title={"Contact us"}>
      <div className="container" style={pageContainerStyle}>
        <div className="row align-items-center g-5 w-100">
          
          {/* Left Side: Modern Labeled Media Column */}
          <div className="col-md-6">
            <img
              src="/images/contactus.jpeg"
              alt="contactus"
              style={imgStyle}
            />
          </div>
          
          {/* Right Side: Refreshed Copywriting & Content Deck */}
          <div className="col-md-5 offset-md-1">
            <h1 style={titleStyle}>Get in Touch</h1>
            
            <p className="text-muted mb-4" style={{ fontSize: "1.05rem", lineHeight: "1.6" }}>
              Have a question about our products, billing, or deliveries? Feel free to call anytime. Our dedicated support network operates 24/7.
            </p>

            <div className="mt-4">
              {/* Email Block */}
              <div 
                style={listItemStyle} 
                onMouseEnter={handleMouseEnter} 
                onMouseLeave={handleMouseLeave}
              >
                <div style={iconContainerStyle}>
                  <BiMailSend />
                </div>
                <div>
                  <small className="text-muted d-block font-weight-bold">Email Us</small>
                  <a href="mailto:www.AMarketing@ecommerceapp.com" className="text-dark font-weight-normal text-decoration-none">
                    www.AMarketing@ecommerceapp.com
                  </a>
                </div>
              </div>

              {/* Phone Block */}
              <div 
                style={listItemStyle} 
                onMouseEnter={handleMouseEnter} 
                onMouseLeave={handleMouseLeave}
              >
                <div style={iconContainerStyle}>
                  <BiPhoneCall />
                </div>
                <div>
                  <small className="text-muted d-block font-weight-bold">Call Anytime</small>
                  <span className="text-dark font-weight-normal">+92 322 9895835</span>
                </div>
              </div>

              {/* Toll-Free Support Block */}
              <div 
                style={listItemStyle} 
                onMouseEnter={handleMouseEnter} 
                onMouseLeave={handleMouseLeave}
              >
                <div style={{...iconContainerStyle, backgroundColor: "#f0fdf4", color: "#22c55e"}}>
                  <BiSupport />
                </div>
                <div>
                  <small className="text-muted d-block font-weight-bold">Toll Free Support</small>
                  <span className="text-dark font-weight-normal">+92 320 5405027</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;