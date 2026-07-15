import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
  // Shared structural layout parameters for navigation link components
  const linkStyle = ({ isActive }) => ({
    padding: "14px 20px",
    fontSize: "14px",
    fontWeight: "600",
    color: isActive ? "#ffffff" : "#475569",
    backgroundColor: isActive ? "#4f46e5" : "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    marginBottom: "8px",
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    transition: "all 0.2s ease-in-out",
    textDecoration: "none",
    boxShadow: isActive ? "0 4px 12px rgba(79, 70, 229, 0.15)" : "none"
  });

  return (
    <div className="w-100" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Menu Header Title Accent block */}
      <div 
        className="px-4 py-3 rounded-t-4 text-center border-bottom bg-white"
        style={{ 
          borderTopLeftRadius: "16px", 
          borderTopRightRadius: "16px",
          border: "1px solid #e2e8f0",
          borderBottom: "none"
        }}
      >
        <h5 className="m-0 fw-bold text-dark" style={{ letterSpacing: "-0.3px" }}>
          👤 User Settings
        </h5>
      </div>

      {/* Navigation Ledger Links Canvas */}
      <div 
        className="p-3 bg-white"
        style={{ 
          borderBottomLeftRadius: "16px", 
          borderBottomRightRadius: "16px",
          border: "1px solid #e2e8f0",
          borderTop: "none"
        }}
      >
        <div className="list-group border-0">
          
          {/* Profile Route Navigation Link */}
          <NavLink 
            to='/dashboard/user/profile' 
            style={linkStyle}
            onMouseOver={(e) => {
              if (!e.currentTarget.style.backgroundColor.includes("rgb(79, 70, 229)")) {
                e.currentTarget.style.backgroundColor = "#f8fafc";
                e.currentTarget.style.color = "#4f46e5";
              }
            }}
            onMouseOut={(e) => {
              if (!e.currentTarget.style.backgroundColor.includes("rgb(79, 70, 229)")) {
                e.currentTarget.style.backgroundColor = "#ffffff";
                e.currentTarget.style.color = "#475569";
              }
            }}
          >
            <span>My Profile Details</span>
            <span>➔</span>
          </NavLink>

          {/* Orders Route Navigation Link */}
          <NavLink 
            to='/dashboard/user/order' 
            style={linkStyle}
            onMouseOver={(e) => {
              if (!e.currentTarget.style.backgroundColor.includes("rgb(79, 70, 229)")) {
                e.currentTarget.style.backgroundColor = "#f8fafc";
                e.currentTarget.style.color = "#4f46e5";
              }
            }}
            onMouseOut={(e) => {
              if (!e.currentTarget.style.backgroundColor.includes("rgb(79, 70, 229)")) {
                e.currentTarget.style.backgroundColor = "#ffffff";
                e.currentTarget.style.color = "#475569";
              }
            }}
          >
            <span>Purchase History</span>
            <span>➔</span>
          </NavLink>

        </div>
      </div>
    </div>
  )
}

export default UserMenu