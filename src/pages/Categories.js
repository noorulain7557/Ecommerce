import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/layout/Layout";

const Categories = () => {
  const categories = useCategory();
  
  // Helper to generate elegant modern circle icons using category initials
  const getInitials = (name) => {
    if (!name) return "★";
    const words = name.trim().split(" ");
    return words.length > 1 
      ? (words[0][0] + words[1][0]).toUpperCase() 
      : words[0].substring(0, 2).toUpperCase();
  };

  return (
    <Layout title={"All Categories"}>
      {/* FIXED: Reduced margin-top and top padding to bring content snugly below header */}
      <div 
        className="container-fluid" 
        style={{ 
          marginTop: "40px", 
          padding: "30px 20px 80px 20px",
          background: "radial-gradient(circle at top right, rgba(99, 102, 241, 0.05), transparent 400px), radial-gradient(circle at bottom left, rgba(6, 182, 212, 0.05), transparent 400px)",
          minHeight: "calc(100vh - 60px)",
          position: "relative"
        }}
      >
        {/* Modern Interactive Header Block */}
        <div className="text-center mb-5" style={{ position: "relative", zIndex: "2" }}>
          <span style={{
            fontSize: "12px",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "2px",
            color: "#6366f1",
            background: "rgba(99, 102, 241, 0.1)",
            padding: "6px 16px",
            borderRadius: "30px",
            display: "inline-block",
            marginBottom: "12px"
          }}>
            Our Collections
          </span>
          <h2 style={{ 
            fontWeight: "800", 
            letterSpacing: "-1px", 
            color: "#0f172a",
            fontSize: "36px",
            fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif"
          }}>
            Explore Categories
          </h2>
          <p style={{ color: "#64748b", maxWidth: "500px", margin: "10px auto 0 auto", fontSize: "15px" }}>
            Discover specialized premium items tailored strictly to your lifestyle and design preferences.
          </p>
        </div>

        {/* Categories Flex Grid Grid Row */}
        <div className="container">
          <div className="row justify-content-center">
            {categories.map((c, idx) => {
              const gradients = [
                "linear-gradient(135deg, #6366f1, #4f46e5)",
                "linear-gradient(135deg, #06b6d4, #0891b2)",
                "linear-gradient(135deg, #ec4899, #db2777)",
                "linear-gradient(135deg, #f59e0b, #d97706)"
              ];
              const activeGradient = gradients[idx % gradients.length];

              return (
                <div className="col-lg-4 col-md-6 col-sm-6 mb-4 gx-4 gy-3" key={c._id}>
                  <div 
                    className="card" 
                    style={{
                      border: "1px solid rgba(226, 232, 240, 0.8)",
                      borderRadius: "24px",
                      overflow: "visible",
                      boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.04)",
                      transition: "all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      backdropFilter: "blur(8px)",
                      padding: "10px"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-6px) scale(1.02)";
                      e.currentTarget.style.boxShadow = "0 20px 40px -15px rgba(99, 102, 241, 0.12)";
                      e.currentTarget.style.borderColor = "rgba(99, 102, 241, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0) scale(1)";
                      e.currentTarget.style.boxShadow = "0 10px 30px -10px rgba(0, 0, 0, 0.04)";
                      e.currentTarget.style.borderColor = "rgba(226, 232, 240, 0.8)";
                    }}
                  >
                    <Link 
                      to={`/category/${c.slug}`} 
                      className="btn cat-btn"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        padding: "24px 20px",
                        fontSize: "18px",
                        fontWeight: "700",
                        color: "#1e293b",
                        textDecoration: "none",
                        background: "transparent",
                        border: "none",
                        borderRadius: "20px",
                        transition: "all 0.3s ease",
                        position: "relative"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#4f46e5";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#1e293b";
                      }}
                    >
                      <div style={{
                        width: "48px",
                        height: "48px",
                        background: activeGradient,
                        borderRadius: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#ffffff",
                        fontSize: "14px",
                        fontWeight: "800",
                        marginRight: "16px",
                        boxShadow: "0 8px 16px -4px rgba(0,0,0,0.15)",
                        letterSpacing: "0.5px"
                      }}>
                        {getInitials(c.name)}
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                        <span style={{ lineHeight: "1.2" }}>{c.name}</span>
                        <span style={{ 
                          fontSize: "11px", 
                          fontWeight: "500", 
                          color: "#94a3b8", 
                          marginTop: "4px",
                          letterSpacing: "0.3px"
                        }}>
                          View Collection →
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;